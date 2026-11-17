export const DEFAULT_BUDGET = Object.freeze({people:4,nights:6,days:5,stay:160,pass:50,rental:20,travel:180,food:25,extras:70});
export const SCENARIOS = Object.freeze({
 bansko:{stay:120,pass:35,rental:15,travel:140,food:20,extras:90},
 livigno:{stay:160,pass:50,rental:20,travel:180,food:25,extras:70},
 mayrhofen:{stay:220,pass:70,rental:25,travel:200,food:30,extras:85}
});
export function calculateBudget(input) {
 const keys=Object.keys(DEFAULT_BUDGET), v={};
 for(const key of keys){
  if(input[key] === '' || input[key] == null) return {error:'invalid'};
  v[key]=Number(input[key]);
  if(!Number.isFinite(v[key]) || v[key]<0 || v[key]>100000) return {error:'invalid'};
 }
 if(!Number.isInteger(v.people)||v.people<1||v.people>30||!Number.isInteger(v.nights)||v.nights<1||v.nights>60||!Number.isInteger(v.days)||v.days<1||v.days>60) return {error:'invalid'};
 if(v.days>v.nights+1) return {error:'days'};
 const lines={stay:v.stay*v.nights,pass:v.pass*v.days*v.people,rental:v.rental*v.days*v.people,travel:v.travel*v.people,food:v.food*(v.nights+1)*v.people,extras:v.extras*v.people};
 const group=Object.values(lines).reduce((sum,value)=>sum+value,0);
 return {v,lines,group,person:group/v.people};
}
