import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {PROFILE,buildPlan} from '../planner.mjs';
import {planURL,readPlanURL} from '../trip-links.mjs';
import {catalog,RESORTS} from '../resorts.mjs';
const input={...PROFILE,start:'2027-01-10',country:'austria',level:'beginner',apres:'party'};
test('beginner terrain fit affects alpine order without crossing engines',()=>{
 const plan=buildPlan(input);assert.equal(plan.selected.key,'saalbach');
 assert.equal(plan.options.length,3);assert.ok(plan.options.every(o=>o.resort.country==='austria'));
 const value=buildPlan({...input,country:'all'},'value');assert.deepEqual(value.options.map(o=>o.group),value.options.map(o=>o.group).sort((a,b)=>a-b));
 assert.deepEqual(catalog('alpine').filter(r=>r.country==='france').map(r=>r.key).sort(),['la-plagne','les-arcs','val-thorens']);
});
test('shared plans round-trip dates, costs, child ages and selection without putting details in HTTP query',()=>{
 for(const engine of ['alpine','value']){
 const profile={...PROFILE,start:'2027-02-03',group:'family',children:2,ages:'9,13',rooms:2,nightlife:25};const plan=buildPlan(profile,engine);
 const url=planURL('https://ozcarmel.github.io/ski_twins/',engine,{...plan.profile,destination:plan.selected.key},'en');
 assert.equal(new URL(url).search,'?lang=en');
 const restored=readPlanURL(url);assert.equal(restored.engine,engine);assert.equal(restored.plan.selected.key,plan.selected.key);assert.equal(restored.plan.selected.group,plan.selected.group);assert.deepEqual(restored.plan.profile.ages,[9,13]);assert.deepEqual(restored.plan.itinerary,plan.itinerary);
 }
});
test('guide prefills and malformed links keep profiles validated and engines isolated',()=>{
 const base='https://ozcarmel.github.io/ski_twins/';
 assert.equal(readPlanURL(base+'?engine=alpine&country=austria&destination=saalbach').profile.destination,'saalbach');
 for(const query of ['engine=alpine&destination=bansko','engine=value&destination=ischgl','engine=alpine&level=bogus','engine=alpine&adults=-2','engine=alpine&start=2027-02-30','engine=alpine&children=1&ages=99','engine=other'])assert.equal(readPlanURL(base+'?'+query),null,query);
});
test('all static destinations have reciprocal languages, canonical URLs, sources and valid local links',()=>{
 const base='https://ozcarmel.github.io/ski_twins/';
 for(const r of RESORTS)for(const lang of ['he','en']){
  const path=`resorts/${r.key}/${lang==='en'?'en.html':'index.html'}`,html=readFileSync(path,'utf8'),canonical=base+`resorts/${r.key}/${lang==='en'?'en.html':''}`;
  assert.ok(html.includes(`rel="canonical" href="${canonical}"`));assert.ok(html.includes(`hreflang="he" href="${base}resorts/${r.key}/"`));assert.ok(html.includes(`hreflang="en" href="${base}resorts/${r.key}/en.html"`));
  if(r.popularity)assert.ok(html.includes(r.popularity.url.replaceAll('&','&amp;')));assert.ok(html.includes(r.areaSource.replaceAll('&','&amp;')));assert.ok(html.includes(`engine=${r.engine}&amp;country=${r.country}&amp;destination=${r.key}#${r.engine}-planner`));assert.ok(!html.includes('undefined'));
  for(const match of html.matchAll(/(?:href|src)="([^\"]+)"/g)){
   const url=new URL(match[1].replaceAll('&amp;','&'),base+path);if(!url.href.startsWith(base))continue;
   let local=decodeURIComponent(url.pathname.slice('/ski_twins/'.length));if(!local||local.endsWith('/'))local+='index.html';assert.ok(existsSync(local),`${path}: ${local}`);
  }
 }
 const sitemap=readFileSync('sitemap.xml','utf8');assert.equal((sitemap.match(/<loc>/g)||[]).length,3+RESORTS.length*2);
});
