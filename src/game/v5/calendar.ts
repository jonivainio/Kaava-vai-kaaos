import type { Calendar, SeasonWindow, WorkOrder } from "./types";

export function newCalendar(): Calendar {
  return { now: 0, baselineNow: 0, avoidableCriticalDelayMonths: 0, orders: [], nextSequence: 1, advances: [] };
}
function finiteMonth(value: number) {
  if (!Number.isFinite(value) || value < 0) throw new Error(`Invalid calendar month: ${value}`);
}
export function seasonStart(earliest: number, season: SeasonWindow | null): number {
  finiteMonth(earliest);
  if (!season) return earliest;
  if (!(season.period > 0 && season.start >= 0 && season.end >= season.start && season.end < season.period)) throw new Error("Invalid season window");
  const cycle = Math.floor(earliest / season.period) * season.period;
  const position = earliest - cycle;
  return position < season.start ? cycle + season.start : position <= season.end ? earliest : cycle + season.period + season.start;
}
export type NewOrder = Omit<WorkOrder, "orderedAt" | "startedAt" | "dueAt" | "baselineStart" | "baselineDue" | "status" | "completedAt" | "sequence"> & { earliestStart?: number; baselineEarliestStart?: number };

/** Mutates only a transaction-local calendar, owned by the pure game reducer. */
export function orderWork(calendar: Calendar, order: NewOrder): WorkOrder {
  const existing = calendar.orders.find(item => item.id === order.id);
  if (existing) {
    // A return to the same case/revision uses its already ordered job and invoice.
    for (const key of ["caseId", "sourceId", "planRevision", "observation", "component"] as const) {
      if (existing[key] !== order[key]) throw new Error(`Conflicting work identity: ${order.id}`);
    }
    return existing;
  }
  finiteMonth(order.duration); finiteMonth(order.baselineDuration);
  const dependencies = order.dependencies.map(id => {
    const found = calendar.orders.find(item => item.id === id);
    if (!found || found.status === "cancelled") throw new Error(`Unavailable work dependency: ${id}`);
    return found;
  });
  const earliest = Math.max(calendar.now, order.earliestStart ?? 0, ...dependencies.map(item => item.dueAt));
  const baselineEarliest = Math.max(calendar.baselineNow, order.baselineEarliestStart ?? 0, ...dependencies.map(item => item.baselineDue));
  const startedAt = seasonStart(earliest, order.season);
  const baselineStart = seasonStart(baselineEarliest, order.season);
  const { earliestStart: _e, baselineEarliestStart: _b, ...input } = order;
  const result: WorkOrder = {
    ...input, dependencies: [...order.dependencies], orderedAt: calendar.now, startedAt,
    dueAt: startedAt + order.duration, baselineStart, baselineDue: baselineStart + order.baselineDuration,
    status: startedAt <= calendar.now ? "active" : "scheduled", completedAt: null,
    sequence: calendar.nextSequence++,
  };
  calendar.orders.push(result);
  return result;
}
export function extendWork(calendar: Calendar, id: string, totalDuration: number, baselineDuration?: number): void {
  const order = calendar.orders.find(item => item.id === id);
  if (!order || order.status === "cancelled" || order.status === "completed") throw new Error(`Work cannot be extended: ${id}`);
  if (totalDuration < order.duration) throw new Error("Extension cannot shorten a work order");
  finiteMonth(totalDuration);
  order.duration = totalDuration;
  order.dueAt = order.startedAt + totalDuration;
  if (baselineDuration !== undefined) {
    finiteMonth(baselineDuration);
    order.baselineDuration = baselineDuration;
    order.baselineDue = order.baselineStart + baselineDuration;
  }
  // Dependencies are a DAG in creation order: dependent tasks cannot predate parents.
  for (const dependent of calendar.orders) {
    if (!dependent.dependencies.length || dependent.status === "cancelled" || dependent.status === "completed") continue;
    const parents = dependent.dependencies.map(key => calendar.orders.find(item => item.id === key)!);
    dependent.startedAt = seasonStart(Math.max(dependent.startedAt, ...parents.map(item => item.dueAt)), dependent.season);
    dependent.baselineStart = seasonStart(Math.max(dependent.baselineStart, ...parents.map(item => item.baselineDue)), dependent.season);
    dependent.dueAt = dependent.startedAt + dependent.duration;
    dependent.baselineDue = dependent.baselineStart + dependent.baselineDuration;
  }
}
export function advanceCalendar(calendar: Calendar, to: number, reason: string, waitingFor: string[] = [], baselineTo = to): string[] {
  finiteMonth(to); finiteMonth(baselineTo);
  if (to < calendar.now || baselineTo < calendar.baselineNow) throw new Error("Clock cannot move backwards");
  const before = calendar.avoidableCriticalDelayMonths;
  // Comparison against a concurrent baseline prevents duplicate penalties on parallel waits.
  calendar.avoidableCriticalDelayMonths = Math.max(0, to - baselineTo);
  if (to !== calendar.now) calendar.advances.push({ from: calendar.now, to, baselineFrom: calendar.baselineNow,
    baselineTo, reason, waitingFor: [...waitingFor], avoidableMonths: calendar.avoidableCriticalDelayMonths - before });
  calendar.now = to;
  calendar.baselineNow = baselineTo;
  const due = calendar.orders.filter(order => !["completed", "cancelled"].includes(order.status) && order.dueAt <= to)
    .sort((a, b) => a.dueAt - b.dueAt || a.sequence - b.sequence);
  for (const order of due) { order.status = "completed"; order.completedAt = order.dueAt; }
  for (const order of calendar.orders) if (order.status === "scheduled" && order.startedAt <= to) order.status = "active";
  return due.map(order => order.id);
}
export function waitForWork(calendar: Calendar, ids: string[], reason: string): string[] {
  if (!ids.length) return [];
  const orders = ids.map(id => {
    const order = calendar.orders.find(item => item.id === id);
    if (!order || order.status === "cancelled") throw new Error(`Cannot wait for work: ${id}`);
    return order;
  });
  const to = Math.max(calendar.now, ...orders.map(order => order.dueAt));
  const baselineTo = Math.max(calendar.baselineNow, ...orders.map(order => order.baselineDue));
  return advanceCalendar(calendar, to, reason, ids, baselineTo);
}
export function cancelComponentWork(calendar: Calendar, component: "bess"): void {
  for (const order of calendar.orders) {
    if (order.component === component && order.status !== "completed") order.status = "cancelled";
  }
}
