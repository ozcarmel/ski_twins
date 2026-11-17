import test from 'node:test';
import assert from 'node:assert/strict';
import {calculateBudget, DEFAULT_BUDGET, SCENARIOS} from '../budget.mjs';

test('original 4-person budget remains €4,060 total and €1,015 per person',()=>{
 const result=calculateBudget(DEFAULT_BUDGET);
 assert.equal(result.group,4060);
 assert.equal(result.person,1015);
});
test('shared lodging is charged once; food covers arrival through departure',()=>{
 const result=calculateBudget({...DEFAULT_BUDGET,people:5});
 assert.equal(result.lines.stay,960);
 assert.equal(result.lines.food,875);
 assert.equal(result.group,4835);
 assert.equal(result.person,967);
});
test('cost comparisons use the same people, nights and ski days',()=>{
 assert.deepEqual(Object.values(SCENARIOS).map(s=>calculateBudget({...DEFAULT_BUDGET,...s}).group),[3200,4060,5200]);
});
test('free cost categories are valid',()=>{
 const input={...DEFAULT_BUDGET};
 for(const key of Object.keys(SCENARIOS.bansko))input[key]=0;
 assert.equal(calculateBudget(input).group,0);
});
test('incomplete and nonfinite values do not produce misleading zero totals',()=>{
 for(const value of ['',undefined,NaN,Infinity,-1])assert.equal(calculateBudget({...DEFAULT_BUDGET,travel:value}).error,'invalid');
});
test('people and duration must be positive bounded integers',()=>{
 for(const [key,value] of [['people',0],['people',1.5],['people',31],['nights',0],['nights',61],['days',0],['days',61]])assert.equal(calculateBudget({...DEFAULT_BUDGET,[key]:value}).error,'invalid');
});
test('ski days cannot exceed the days available on the trip',()=>{
 assert.equal(calculateBudget({...DEFAULT_BUDGET,days:8}).error,'days');
 assert.equal(calculateBudget({...DEFAULT_BUDGET,days:7}).error,undefined);
});
test('decimal currency amounts are preserved before display rounding',()=>{
 assert.equal(calculateBudget({...DEFAULT_BUDGET,stay:160.5}).group,4063);
});
