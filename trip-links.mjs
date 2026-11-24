import {PROFILE,buildPlan} from './planner.mjs?v=20261124-area-size';
import {catalog} from './resorts.mjs?v=20261124-area-size';
const keys=Object.keys(PROFILE);
export function planURL(base,engine,profile,lang='he'){
 const url=new URL(base);url.search='';url.hash=`${engine}-planner`;
 url.searchParams.set('lang',lang==='en'?'en':'he');const params=new URLSearchParams({engine});
 for(const key of keys){const value=profile[key];if(value!==undefined&&value!=='')params.set(key,Array.isArray(value)?value.join(','):String(value));}
 url.hash=`${engine}-planner?${params}`;return url.href;
}
export function readPlanURL(href){
 const url=new URL(href);if(url.search.length+url.hash.length>2048)return null;
 const params=/^#(?:alpine|value)-planner\?/.test(url.hash)?new URLSearchParams(url.hash.split('?')[1]):url.searchParams;
 const engine=params.get('engine');if(!['alpine','value'].includes(engine))return null;
 const profile={...PROFILE};for(const key of keys)if(params.has(key))profile[key]=params.get(key);
 if(!catalog(engine).some(r=>r.key===profile.destination)&&profile.destination!=='auto')return null;
 // Validate all imported values, including partial profiles from destination guides.
 const valid=buildPlan({...profile,start:profile.start||'2027-01-10'},engine);if(valid.error)return null;
 return {engine,profile,plan:profile.start?buildPlan(profile,engine):null};
}
