/*
 * Seeds the six impact stats into Sanity.
 *
 * Requires a Sanity WRITE token (the public read setup used by the app has none).
 * Create one at https://manage.sanity.io -> API -> Tokens (Editor/Write), then:
 *
 *   SANITY_WRITE_TOKEN=xxxx REACT_APP_SANITY_PROJECT_ID=ouoeyqyw node scripts/seed-stats.js
 *
 * Re-running creates duplicates, so run once (or delete existing `stats` docs in
 * the Studio first).
 */
const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID || 'ouoeyqyw',
  dataset: 'production',
  apiVersion: '2022-02-01',
  token: process.env.SANITY_WRITE_TOKEN || process.env.REACT_APP_SANITY_TOKEN,
  useCdn: false,
});

const stats = [
  { _type: 'stats', label: 'Developers Supported', value: 10000, suffix: '+', order: 1 },
  { _type: 'stats', label: 'Universities', value: 100, suffix: '+', order: 2 },
  { _type: 'stats', label: 'Projects Mentored', value: 100, suffix: '+', order: 3 },
  { _type: 'stats', label: 'National Hackathons', value: 3, suffix: '', order: 4 },
  { _type: 'stats', label: 'Startups Supported', value: 20, suffix: '+', order: 5 },
  { _type: 'stats', label: 'Technical Sessions', value: 100, suffix: '+', order: 6 },
];

(async () => {
  if (!client.config().token) {
    console.error('No write token. Set SANITY_WRITE_TOKEN and re-run.');
    process.exit(1);
  }
  for (const doc of stats) {
    // eslint-disable-next-line no-await-in-loop
    const created = await client.create(doc);
    console.log(`created stats: ${created.label} (${created._id})`);
  }
  console.log('Done. Seeded', stats.length, 'stats.');
})().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
