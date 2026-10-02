// Runs the frontend data model in memory; never reads or resets browser data.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
function storage() {
  const values = new Map();
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, String(value)), removeItem: key => values.delete(key), values };
}
const window = { localStorage: storage(), sessionStorage: storage(), dispatchEvent() {} };
const cache = {};
function load(name) {
  name = name.replace('@/lib/', '').replace('./', '');
  if (cache[name]) return cache[name].exports;
  const module = { exports: {} }; cache[name] = module;
  const source = fs.readFileSync(path.join(__dirname, '../src/lib', `${name}.ts`), 'utf8');
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  vm.runInNewContext(output, { require: load, module, exports: module.exports, window, Event, crypto: require('node:crypto').webcrypto, console, TextEncoder, TextDecoder, btoa, atob }, { filename: `${name}.js` });
  return module.exports;
}
const demo = load('demo');
for (const role of ['traveler', 'provider', 'guide', 'admin']) {
  const account = demo.signIn(`${role}@travelbuddy.demo`, 'demo123');
  assert.equal(account.role, role);
  assert.equal(demo.getSession().role, role);
  assert.throws(() => demo.signIn(account.email, 'wrong'), /Incorrect demo email or password/);
  demo.signOut(); assert.equal(demo.getSession(), null);
}
const data = demo.getDemo();
assert.throws(() => demo.registerAccount('admin', 'No public admin', 'new-admin@example.test', {}), /registration is unavailable/);
for (const listing of data.listings) assert.ok(data.accounts.some(a => a.id === listing.owner));
for (const booking of data.bookings) assert.ok(data.listings.some(l => l.id === booking.experienceId));
data.listings[0].status = 'Paused';
demo.saveDemo(data, 'Listing paused', data.listings[0].id);
assert.ok(!demo.publicExperiences().some(l => l.id === data.listings[0].id));
for (const role of ['traveler', 'provider', 'guide']) {
  const account = demo.registerAccount(role, `New ${role}`, `new-${role}@example.test`, { location: 'Colombo' });
  assert.equal(account.status, 'Demo setup');
  assert.throws(() => demo.registerAccount(role, 'Duplicate', account.email, {}), /already exists/);
  demo.signIn(account.email, 'demo123');
  assert.equal(demo.getDemo().sessions.filter(s => s.guideId === account.id).length, 0);
  assert.equal(demo.getDemo().listings.filter(l => l.owner === account.id).length, 0);
  if (role === 'traveler') assert.equal(load('journey').readJourneyPlans().length, 0);
  demo.signOut();
}
demo.signIn('guide@travelbuddy.demo', 'demo123');
const updated = demo.getDemo();
updated.sessions.find(s => s.id === 'GR-103').status = 'Accepted';
demo.saveDemo(updated, 'Guide request accepted', 'GR-103');
assert.ok(demo.getDemo().sessions.some(s => s.id === 'GR-103' && s.status === 'Accepted'));
assert.ok(demo.getDemo().activity.some(a => a.action === 'Guide request accepted'));
for (const value of window.localStorage.values.values()) assert.ok(!/demo123|passwordHash|accessToken/.test(value));
window.localStorage.setItem('tb-theme', '"dark"');
demo.resetDemo();
assert.equal(demo.getSession(), null);
assert.equal(demo.getDemo().accounts.length, demo.seedData().accounts.length);
assert.equal(demo.getDemo().sessions.find(s => s.id === 'GR-103').status, 'New');
assert.equal(window.localStorage.getItem('tb-theme'), '"dark"');
assert.equal(window.localStorage.getItem('tb-traveler-storage'), null);
console.log('Passed: four logins, wrong credentials, three registrations, duplicate email, empty onboarding, coherent records, request persistence, no stored passwords, logout, and reset.');
