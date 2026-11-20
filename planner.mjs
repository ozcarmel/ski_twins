import { DEFAULT_BUDGET, SCENARIOS, calculateBudget } from './budget.mjs';
export const PROFILE = Object.freeze({adults:2,children:2,ages:'9, 13',start:'',nights:6,days:5,level:'beginner',pace:'relaxed',destination:'auto',limit:4500});
export function buildPlan(input) {
 const p={...input};
 for(const key of ['adults','children','nights','days','limit']) {
  if(p[key]===''||p[key]==null||!Number.isFinite(Number(p[key]))) return {error:'invalid'};
  p[key]=Number(p[key]);
 }
 if(!Number.isInteger(p.adults)||p.adults<1||!Number.isInteger(p.children)||p.children<0||p.adults+p.children>30||!Number.isInteger(p.nights)||p.nights<2||p.nights>30||!Number.isInteger(p.days)||p.days<1||p.limit<=0||p.limit>1000000) return {error:'invalid'};
 if(p.days>p.nights-1) return {error:'days'};
 if(!['beginner','intermediate','advanced','mixed'].includes(p.level)||!['relaxed','active'].includes(p.pace)||!['auto',...Object.keys(SCENARIOS)].includes(p.destination))return {error:'invalid'};
 p.ages=String(p.ages||'').trim()?String(p.ages).split(/[,،;\s]+/).filter(Boolean).map(Number):[];
 if(p.ages.length!==p.children||p.ages.some(a=>!Number.isInteger(a)||a<0||a>17))return {error:'ages'};
 if(!/^\d{4}-\d{2}-\d{2}$/.test(p.start))return {error:'date'};
 const date=new Date(p.start+'T12:00:00Z');
 if(!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==p.start)return {error:'date'};
 p.people=p.adults+p.children;
 const options=Object.keys(SCENARIOS).map(key=>({key,...calculateBudget({...DEFAULT_BUDGET,...SCENARIOS[key],people:p.people,nights:p.nights,days:p.days})})).sort((a,b)=>a.group-b.group);
 const selected=options.find(o=>o.key===p.destination)||options[0];
 const restCount=p.nights-1-p.days;
 const interior=Array(p.nights-1).fill('ski');
 if(p.pace==='relaxed'){
  for(let r=0;r<restCount;r++) interior[Math.floor((r+1)*interior.length/(restCount+1))]='rest';
 }else for(let r=0;r<restCount;r++)interior[interior.length-1-r]='rest';
 let ski=0;
 const itinerary=['arrival',...interior,'departure'].map((type,index)=>{const d=new Date(date);d.setUTCDate(d.getUTCDate()+index);return {date:d.toISOString().slice(0,10),type,first:type==='ski'&&++ski===1};});
 return {profile:p,options,selected,itinerary,remaining:p.limit-selected.group,youngChild:p.ages.some(a=>a<6),offSeason:date.getUTCMonth()<11&&date.getUTCMonth()>2};
}
