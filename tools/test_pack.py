#!/usr/bin/env python3
"""Mutation tests for the content validator. These do NOT execute a game engine."""
from copy import deepcopy
import unittest
from validate_content import load_bundle, validate_bundle


class ContentContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.base = load_bundle()

    def setUp(self):
        self.data = deepcopy(self.base)

    def card(self, cid):
        return next(c for c in self.data['pack']['cards'] if c['id'] == cid)

    def assertRejected(self):
        self.assertTrue(validate_bundle(self.data))

    def test_baseline_is_valid(self):
        self.assertEqual(validate_bundle(self.data), [])

    def test_duplicate_card_is_rejected(self):
        self.data['pack']['cards'][1]['id'] = 'P001'
        self.assertRejected()

    def test_real_case_register_is_rejected(self):
        self.data['sources']['sources'].append({'id': 'real-case'})
        self.assertRejected()

    def test_card_case_reference_is_rejected(self):
        self.card('P001')['sourceIds'] = ['real-case']
        self.assertRejected()

    def test_name_suffix_is_enforced(self):
        self.data['names']['names'][0]['name'] = 'Keksittyvuori'
        self.assertRejected()

    def test_duplicate_name_is_rejected(self):
        self.data['names']['names'][1]['name'] = self.data['names']['names'][0]['name']
        self.assertRejected()

    def test_missing_editorial_is_rejected(self):
        self.data['editorial']['cards'].pop()
        self.assertRejected()

    def test_editorial_version_mismatch_is_rejected(self):
        self.data['editorial']['packId'] = 'wrong-pack'
        self.assertRejected()

    def test_unknown_queued_card_is_rejected(self):
        self.card('H001')['choices']['left']['effects'][-1]['cardId'] = 'H999'
        self.assertRejected()

    def test_content_cannot_write_approval_gate(self):
        self.card('P001')['choices']['left']['effects'].append(
            {'op': 'flag', 'key': 'adoptionGatesSatisfied', 'value': True})
        self.assertRejected()

    def test_unknown_track_value_is_rejected(self):
        self.card('P001')['choices']['left']['effects'].append(
            {'op': 'track', 'key': 'grid', 'value': 'magicallyApproved'})
        self.assertRejected()

    def test_wind_removal_cannot_run_in_solar_only_mode(self):
        removing = next(c for c in self.data['pack']['cards']
                        if any(e['op'] == 'windRemove' for choice in c['choices'].values()
                               for e in choice['effects']))
        removing['modes'] = ['solar']
        self.assertRejected()

    def test_demo_phase_mismatch_is_rejected(self):
        self.data['manifest']['demo']['demoFlow'][-1]['phase'] = '03'
        self.assertRejected()

    def test_demo_queued_branch_cannot_skip_due_time(self):
        step = next(s for s in self.data['manifest']['demo']['demoFlow'] if 'queuedOneOf' in s)
        step['waitUntilDue'] = False
        self.assertRejected()

    def test_branch_cannot_be_drawn_as_ambient_card(self):
        self.card('H002')['trigger'] = 'ambient'
        self.assertRejected()

    def test_embedded_external_url_is_rejected(self):
        self.card('P001')['body'] = 'Fiktiivinen testi https://example.invalid/case'
        self.assertRejected()

    def test_humor_chain_has_two_distinct_branches(self):
        card = self.card('H001')
        targets = []
        for direction in ('left', 'right'):
            ids = [e['cardId'] for e in card['choices'][direction]['effects'] if e['op'] == 'queueCard']
            self.assertEqual(len(ids), 1)
            targets.extend(ids)
        self.assertEqual(targets, ['H002', 'H003'])


if __name__ == '__main__':
    unittest.main(verbosity=2)
