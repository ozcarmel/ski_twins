import {DEFAULT_BUDGET,calculateBudget} from './budget.mjs';
import {catalog} from './resorts.mjs';
export const PROFILE=Object.freeze({adults:2,children:0,ages:'',start:'',nights:6,days:5,rooms:1,level:'intermediate',pace:'active',destination:'auto',country:'all',group:'couple',apres:'social',nightlife:30,limit:4000});
export function buildPlan(input,engine='alpine'){
 if(!['alpine','value'].includes(engine))return {error:'invalid'};
 const p={...input};
 for(const key of ['adults','children','nights','days','rooms','nightlife','limit']){if(p[key]===''||p[key]==null||!Number.isFinite(Number(p[key])))return {error:'invalid'};p[key]=Number(p[key]);}
 if(!Number.isInteger(p.adults)||p.adults<1||!Number.isInteger(p.children)||p.children<0||p.adults+p.children>30||!Number.isInteger(p.nights)||p.nights<2||p.nights>30||!Number.isInteger(p.days)||p.days<1||!Number.isInteger(p.rooms)||p.rooms<1||p.rooms>30||p.nightlife<0||p.nightlife>1000||p.limit<=0||p.limit>1000000)return {error:'invalid'};
 if(p.days>p.nights-1)return {error:'days'};
 if(!['beginner','intermediate','advanced','mixed'].includes(p.level)||!['relaxed','active'].includes(p.pace)||!['couple','friends','family','solo'].includes(p.group)||!['party','social','quiet'].includes(p.apres))return {error:'invalid'};
 p.ages=String(p.ages||'').trim()?String(p.ages).split(/[,،;\s]+/).filter(Boolean).map(Number):[];
 if(p.ages.length!==p.children||p.ages.some(a=>!Number.isInteger(a)||a<0||a>17))return {error:'ages'};
 if((p.group==='couple'&&(p.adults!==2||p.children!==0))||(p.group==='solo'&&(p.adults!==1||p.children!==0)))return {error:'group'};
 if(!/^\d{4}-\d{2}-\d{2}$/.test(p.start))return {error:'date'};
 const date=new Date(p.start+'T12:00:00Z');if(!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==p.start)return {error:'date'};
 const all=catalog(engine);if(p.country!=='all'&&!all.some(r=>r.country===p.country))return {error:'invalid'};
 const available=all.filter(r=>p.country==='all'||r.country===p.country);
 if(p.destination!=='auto'&&!available.some(r=>r.key===p.destination))return {error:'destination'};
 p.people=p.adults+p.children;
 const eveningTotal=p.nightlife*p.adults*p.nights;
 const options=available.map(r=>{const estimate=calculateBudget({...DEFAULT_BUDGET,...r.rate,people:p.people,nights:p.nights,days:p.days,stay:r.rate.stay*p.rooms,extras:r.rate.extras+eveningTotal/p.people});return {key:r.key,resort:r,...estimate,eveningTotal,score:r.suitability[p.level]*10+(r.apres===p.apres?4:0)+(r.groups.includes(p.group)?1:0)};});
 options.sort(engine==='value'?(a,b)=>a.group-b.group||b.score-a.score:(a,b)=>b.score-a.score||all.findIndex(r=>r.key===a.key)-all.findIndex(r=>r.key===b.key));
 const selected=options.find(o=>o.key===p.destination)||options[0];
 const restCount=p.nights-1-p.days,interior=Array(p.nights-1).fill('ski');
 if(p.pace==='relaxed'){for(let r=0;r<restCount;r++)interior[Math.floor((r+1)*interior.length/(restCount+1))]='rest';}else for(let r=0;r<restCount;r++)interior[interior.length-1-r]='rest';
 let ski=0;const itinerary=['arrival',...interior,'departure'].map((type,index)=>{const d=new Date(date);d.setUTCDate(d.getUTCDate()+index);return {date:d.toISOString().slice(0,10),type,first:type==='ski'&&++ski===1};});
 return {engine,profile:p,options,selected,itinerary,remaining:p.limit-selected.group,youngChild:p.ages.some(a=>a<6),offSeason:date.getUTCMonth()<11&&date.getUTCMonth()>2};
}
