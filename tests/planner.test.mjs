import test from 'node:test';
import assert from 'node:assert/strict';
import {PROFILE,buildPlan} from '../planner.mjs';
const input={...PROFILE,start:'2027-01-10'};
test('same family estimates preserve calculator totals and identify budget overruns',()=>{
 const p=buildPlan(input);assert.equal(p.selected.key,'bansko');assert.deepEqual(p.options.map(o=>o.group),[3200,4060,5200]);
 const expensive=buildPlan({...input,destination:'mayrhofen'});assert.equal(expensive.remaining,-700);assert.equal(expensive.selected.v.people,4);
});
test('itinerary preserves exact dates, ski days, rest days, arrival and departure',()=>{
 for(const pace of ['relaxed','active'])for(let nights=2;nights<=30;nights++)for(let days=1;days<nights;days++){
 const p=buildPlan({...input,pace,nights,days});assert.equal(p.itinerary.length,nights+1);assert.equal(p.itinerary.filter(d=>d.type==='ski').length,days);assert.equal(p.itinerary.filter(d=>d.type==='rest').length,nights-1-days);assert.equal(p.itinerary.filter(d=>d.first).length,1);assert.equal(p.itinerary[0].type,'arrival');assert.equal(p.itinerary.at(-1).type,'departure');
 }
 const p=buildPlan({...input,start:'2026-12-29'});assert.equal(p.itinerary.at(-1).date,'2027-01-04');
});
test('invalid ages, dates, durations and destinations produce no plan',()=>{
 for(const change of [{ages:'9'},{ages:'9, 18'},{ages:'x,13'},{children:0},{start:'2027-02-30'},{start:''},{days:6},{nights:1},{adults:0},{adults:1.5},{limit:''},{destination:'<script>'}])assert.ok(buildPlan({...input,...change}).error);
 assert.equal(buildPlan({...input,children:0,ages:''}).error,undefined);
 assert.equal(buildPlan({...input,ages:'2,13'}).youngChild,true);
});
