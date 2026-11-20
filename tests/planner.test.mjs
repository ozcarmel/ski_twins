import test from 'node:test';
import assert from 'node:assert/strict';
import {PROFILE,buildPlan} from '../planner.mjs';
import {catalog} from '../resorts.mjs';
const input={...PROFILE,start:'2027-01-10'};
test('large engine has three resorts per country and never includes value destinations',()=>{
 assert.equal(catalog('alpine').length,9);
 for(const country of ['italy','austria','france']){const p=buildPlan({...input,country});assert.equal(p.options.length,3);assert.ok(p.options.every(o=>o.resort.country===country&&o.resort.engine==='alpine'));}
 assert.ok(buildPlan(input,'value').options.every(o=>o.resort.engine==='value'));
 for(const [engine,destination] of [['alpine','bansko'],['value','ischgl']])assert.equal(buildPlan({...input,destination},engine).error,'destination');
 assert.equal(buildPlan({...input,country:'austria'},'value').error,'invalid');
 assert.equal(buildPlan({...input,country:'italy',destination:'ischgl'}).error,'destination');
});
test('experience preferences reorder alpine destinations; value engine remains cost first',()=>{
 const party=buildPlan({...input,apres:'party'}),quiet=buildPlan({...input,apres:'quiet'});
 assert.equal(party.selected.resort.apres,'party');assert.equal(quiet.selected.resort.apres,'quiet');
 const value=buildPlan({...input,apres:'party'},'value');assert.deepEqual(value.options.map(o=>o.group),value.options.map(o=>o.group).sort((a,b)=>a-b));
});
test('adult evening costs and accommodation units are charged exactly once',()=>{
 const profile={...input,group:'family',adults:2,children:2,ages:'9,13',destination:'livigno',nightlife:30};
 const p=buildPlan(profile),zero=buildPlan({...profile,nightlife:0});assert.equal(p.selected.group-zero.selected.group,360);assert.equal(p.selected.eveningTotal,360);
 const rooms=buildPlan({...profile,rooms:2});assert.equal(rooms.selected.group-p.selected.group,170*6);
 assert.ok(Math.abs(Object.values(p.selected.lines).reduce((a,b)=>a+b,0)-p.selected.group)<0.00001);
 assert.equal(p.selected.v.extras,160+360/4);
});
test('itinerary preserves dates and exact ski/rest counts for both paces',()=>{
 for(const pace of ['relaxed','active'])for(let nights=2;nights<=30;nights++)for(let days=1;days<nights;days++){
 const p=buildPlan({...input,pace,nights,days});assert.equal(p.itinerary.length,nights+1);assert.equal(p.itinerary.filter(d=>d.type==='ski').length,days);assert.equal(p.itinerary.filter(d=>d.type==='rest').length,nights-1-days);assert.equal(p.itinerary.filter(d=>d.first).length,1);assert.equal(p.itinerary[0].type,'arrival');assert.equal(p.itinerary.at(-1).type,'departure');
 }
 assert.equal(buildPlan({...input,start:'2026-12-29'}).itinerary.at(-1).date,'2027-01-04');
});
test('invalid profile inputs never produce a plan',()=>{
 for(const change of [{ages:'9'},{children:1,ages:'18'},{start:'2027-02-30'},{start:''},{days:6},{nights:1},{adults:0},{adults:1.5},{rooms:0},{nightlife:-1},{nightlife:''},{limit:''},{group:'solo'},{group:'couple',adults:3},{destination:'<script>'}])assert.ok(buildPlan({...input,...change}).error,JSON.stringify(change));
 assert.equal(buildPlan({...input,group:'solo',adults:1}).error,undefined);
 assert.equal(buildPlan({...input,group:'family',children:1,ages:'2'}).youngChild,true);
});
