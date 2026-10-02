import assert from 'node:assert/strict';
import { availableRoute, enabled } from '../src/lib/phases';
import { decodeJourneyPayload, encodeJourneyPlan, createDemoJourneyPlan } from '../src/lib/journey';
import { getDemo, saveDemo } from '../src/lib/demo';
import { slotsFor, liveOwner, setLive } from '../src/lib/phase-demo';

// Isolated in-memory storage: these checks never read or change browser records.
function storage() { const data=new Map<string,string>();return {getItem:(key:string)=>data.get(key)??null,setItem:(key:string,value:string)=>data.set(key,value),removeItem:(key:string)=>data.delete(key)}; }
Object.assign(globalThis,{window:{localStorage:storage(),sessionStorage:storage(),dispatchEvent:()=>true}});
assert.equal(enabled(1,'tripPlanner'),false);
assert.equal(enabled(2,'marketplace'),true);
assert.equal(enabled(2,'offlineQr'),false);
assert.equal(enabled(3,'offlineQr'),true);
assert.equal(availableRoute('/trips/test',1),'/bookings');
assert.equal(availableRoute('/scan',2),'/');
assert.equal(availableRoute('/guide-workspace/sessions',1),'/guide-workspace/profile');
assert.equal(availableRoute('/admin/journeys',2),'/admin');
assert.equal(availableRoute('/supplier/reviews',1),'/supplier');
assert.equal(availableRoute('/supplier/inbox',1),'/supplier/inbox');
assert.equal(availableRoute('/guide-workspace/inbox',2),'/guide-workspace/inbox');

const trip=createDemoJourneyPlan();const decoded=decodeJourneyPayload(encodeJourneyPlan(trip));
assert.equal(decoded?.startDate,trip.startDate);
assert.deepEqual(decoded?.events,trip.events);
assert.equal(decodeJourneyPayload('TBJ1.invalid'),null);
assert.equal(decodeJourneyPayload(encodeJourneyPlan(trip)+'a'.repeat(31000)),null);
const bad=JSON.stringify({v:1,n:'Invalid trip',d:2,e:[['colombo-food',99,1,0]]});
assert.equal(decodeJourneyPayload('TBJ1.'+Buffer.from(bad).toString('base64url')),null);

const data=getDemo();data.availability.push({owner:'provider-demo',date:'2099-10-18',available:false,start:'09:00',end:'11:00',capacity:4,area:'Colombo'},{owner:'provider-demo',date:'2099-10-19',available:true,start:'09:00',end:'11:00',capacity:4,area:'Colombo'});saveDemo(data);
assert.deepEqual(slotsFor('colombo-food','2099-10-18',['09:00']),[]);
assert.deepEqual(slotsFor('colombo-food','2099-10-19',['08:00','09:00','12:00']),['09:00']);
assert.deepEqual(slotsFor('colombo-food','2099-10-19',['09:00'],5),[]);
setLive('provider-demo',false);assert.equal(liveOwner('provider-demo'),false);
setLive('provider-demo',true);assert.equal(liveOwner('provider-demo'),true);
console.log('21 phase, route, QR validation, availability, capacity, and Live Now checks passed.');
