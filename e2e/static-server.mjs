import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, extname } from "node:path";
const root = fileURLToPath(new URL("../dist/", import.meta.url));
createServer(async (req, res) => {
  try {
    const u = new URL(req.url, "http://localhost"),
      relative =
        decodeURIComponent(u.pathname)
          .replace(/^\/Kaava-vai-kaaos\//, "")
          .replace(/^\//, "") || "index.html",
      path = resolve(root, relative);
    if (!path.startsWith(root)) throw new Error("Outside root");
    const data = await readFile(path);
    res.writeHead(200, {
      "Content-Type":
        {
          ".js": "text/javascript",
          ".html": "text/html",
          ".css": "text/css",
          ".svg": "image/svg+xml",
          ".png": "image/png",
          ".webmanifest": "application/manifest+json",
        }[extname(path)] ?? "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}).listen(4173, "127.0.0.1");
