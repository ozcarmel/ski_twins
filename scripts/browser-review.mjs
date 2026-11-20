import {chromium} from 'playwright';
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {articlesEN} from '../articles.js';
import {copy} from '../i18n.js';

const root=path.resolve('.'), out=path.join(root,'browser-review');
await fs.mkdir(out,{recursive:true});
const mime={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.jpg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2'};
const server=http.createServer(async(req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://local').pathname);
  const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(!file.startsWith(root+path.sep))throw Error('Invalid path');
  res.writeHead(200,{'content-type':mime[path.extname(file)]||'application/octet-stream'});
  res.end(await fs.readFile(file));
 }catch{res.writeHead(404);res.end('Not found');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const url=`http://127.0.0.1:${server.address().port}/`;
const report={checks:[],consoleErrors:[],screenshots:[],viewports:[]};
const clean=s=>s.replace(/[\u200e\u200f\u2066-\u2069\ufeff]/g,'').trim();
const check=async(name,fn)=>{try{await fn();report.checks.push({name,status:'passed'});}catch(e){report.checks.push({name,status:'failed',error:e.stack});console.error(name,e.message);}};
let browser;
try{
 browser=await chromium.launch({headless:true});
 const pageFor=async(width,height)=>{
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1,reducedMotion:'reduce',acceptDownloads:true});
  page.on('pageerror',e=>report.consoleErrors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')report.consoleErrors.push(m.text());});
  await page.goto(url);await page.evaluate(()=>document.fonts.ready);
  await page.locator('.hero-picture img').evaluate(img=>img.decode());return page;
 };
 const shot=async(page,name,fullPage=false)=>{
  await page.screenshot({path:path.join(out,name+'.jpg'),type:'jpeg',quality:90,fullPage});report.screenshots.push(name+'.jpg');
 };
 const overflow=async(page)=>{
  const metrics=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('main *,header *,footer *')].filter(e=>{const b=e.getBoundingClientRect();return b.width&&getComputedStyle(e).position!=='fixed'&&(b.right>innerWidth+1||b.left< -1);}).slice(0,12).map(e=>({tag:e.tagName,class:e.className,text:e.textContent.slice(0,60)}))}));
  report.viewports.push(metrics);assert.ok(metrics.scrollWidth<=metrics.width+1,JSON.stringify(metrics));
  const hero=await page.locator('.hero').boundingBox(), content=await page.locator('.hero-content').boundingBox();assert.ok(content.y+content.height<=hero.y+hero.height+1,'Hero content exceeds its section');
 };
 for(const [width,height] of [[360,1005],[390,844],[768,1024],[1030,1005],[1440,1000]]){
  const page=await pageFor(width,height);
  await shot(page,`home-he-${width}`);
  await check(`Hebrew ${width}px layout`,async()=>{await overflow(page);assert.equal(await page.locator('html').getAttribute('dir'),'rtl');});
  if(width===390||width===1440){
   for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=700){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(70);}
   await page.evaluate(()=>scrollTo(0,0));await shot(page,`home-he-${width}-full`,true);
  }
  await page.locator('.header [data-language]').click();
  await check(`English ${width}px layout`,async()=>{await overflow(page);assert.equal(await page.locator('html').getAttribute('dir'),'ltr');});
  if(width===390||width===1440)await shot(page,`home-en-${width}`);
  await page.close();
 }
 const page=await pageFor(1280,1000);
 await check('Budget edits and language switching retain values',async()=>{
  assert.equal(clean(await page.locator('#group-total').innerText()),'€4,060');
  await page.locator('#budget-people').fill('5');assert.equal(clean(await page.locator('#group-total').innerText()),'€4,835');
  await page.locator('.header [data-language]').click();assert.equal(await page.locator('#budget-people').inputValue(),'5');assert.equal(clean(await page.locator('#group-total').innerText()),'€4,835');
  await page.locator('.header [data-language]').click();
 });
 await check('Separate engines, country filters and après-ski preferences',async()=>{
  assert.equal(await page.locator('#alpine-catalog [data-resort]').count(),9);
  assert.equal(await page.locator('#value-catalog [data-resort]').count(),4);
  assert.equal(await page.locator('#alpine-catalog [data-resort=bansko]').count(),0);
  await page.locator('#alpine-country').selectOption('austria');
  assert.equal(await page.locator('#alpine-catalog [data-resort]').count(),3);
  await page.locator('#alpine-start').fill('2027-01-10');
  await page.locator('#alpine-apres').selectOption('party');
  await page.locator('#alpine-form button[type=submit]').click();
  assert.equal(await page.locator('#alpine-results [data-resort]').count(),3);
  assert.equal(await page.locator('#value-results [data-resort]').count(),0);
  await page.locator('.header [data-language]').click();
  assert.equal(await page.locator('#alpine-start').inputValue(),'2027-01-10');
  assert.equal(await page.locator('#alpine-catalog').isVisible(),false);
  await page.locator('[data-trip-budget=alpine]').click();
  assert.equal(await page.locator('#budget-people').inputValue(),'2');
 });
 await check('Invalid budget and reset',async()=>{
  await page.locator('#budget-people').fill('');assert.equal(await page.locator('#save-budget').isDisabled(),true);assert.equal(clean(await page.locator('#group-total').innerText()),'—');
  await page.locator('#budget-form button[type=reset]').click();assert.equal(clean(await page.locator('#group-total').innerText()),'€4,060');
 });
 for(const lang of ['en','he']){
  if(await page.locator('html').getAttribute('lang')!==lang)await page.locator('.header [data-language]').click();
  await check(`${lang} budget download`,async()=>{
   const pending=page.waitForEvent('download');await page.locator('#save-budget').click();const download=await pending;
   const name=download.suggestedFilename();assert.equal(name,`ski-twins-trip-plan-${lang}.txt`);await download.saveAs(path.join(out,name));
   const content=clean(await fs.readFile(path.join(out,name),'utf8'));assert.ok(content.includes('€4,060'));assert.ok(content.includes(copy[lang].downloadTitle));
  });
 }
 await check('Each planner downloads its own destination set',async()=>{
  for(const engine of ['alpine','value']){
   await page.locator(`#${engine}-start`).fill('2027-01-10');
   await page.locator(`#${engine}-form button[type=submit]`).click();
   const pending=page.waitForEvent('download');await page.locator(`[data-trip-download=${engine}]`).click();const download=await pending;
   assert.ok(download.suggestedFilename().includes(engine));await download.saveAs(path.join(out,download.suggestedFilename()));
   const content=clean(await fs.readFile(path.join(out,download.suggestedFilename()),'utf8'));
   assert.ok(!content.includes('undefined'));
  }
 });
 for(const lang of ['he','en']){
  if(await page.locator('html').getAttribute('lang')!==lang)await page.locator('.header [data-language]').click();
  for(const [key,item] of Object.entries(articlesEN))await check(`${lang} guide ${key} and original source links`,async()=>{
   await page.goto(url+'#'+(['bansko','livigno','mayrhofen'].includes(key)?'destination/':'guide/')+key);
   await page.locator('#article-dialog').waitFor({state:'visible'});
   const actual=await page.locator('#article-content a[href^="http"]').evaluateAll(links=>links.map(a=>a.getAttribute('href')).sort());
   const expected=[...item.body.matchAll(/href="(https?:[^\"]+)"/g)].map(m=>m[1]).sort();assert.deepEqual(actual,expected);
   if(key==='stay'){const box=page.locator('#article-content input[type=checkbox]').first();await box.check();assert.equal(await box.isChecked(),true);}
   if(key==='bansko')await shot(page,`guide-bansko-${lang}`);
   await page.keyboard.press('Escape');assert.equal(await page.locator('#article-dialog').isVisible(),false);
  });
 }
 await check('Every referenced local image resolves',async()=>{
  const images=await page.locator('img').evaluateAll(imgs=>[...new Set(imgs.map(i=>i.getAttribute('src')))]);
  for(const src of images){const response=await page.request.get(url+src);assert.equal(response.status(),200,src);}
 });
 await page.close();
 const mobile=await pageFor(390,844);
 await check('Mobile navigation opens, closes, and follows links',async()=>{
  await mobile.locator('.menu-toggle').click();assert.equal(await mobile.locator('#navigation').isVisible(),true);
  await mobile.locator('#navigation a[href="#planner"]').click();assert.equal(await mobile.locator('#navigation').isVisible(),false);assert.ok(mobile.url().endsWith('#planner'));
  await mobile.locator('.menu-toggle').click();await mobile.keyboard.press('Escape');assert.equal(await mobile.locator('#navigation').isVisible(),false);
 });
 await check('Mobile article and calculator remain within viewport',async()=>{
  await mobile.goto(url+'#destination/bansko');await mobile.locator('#article-dialog').waitFor({state:'visible'});
  const box=await mobile.locator('#article-dialog').boundingBox();assert.ok(box.x>=0&&box.x+box.width<=390);
  await shot(mobile,'guide-mobile');await mobile.keyboard.press('Escape');
  await mobile.goto(url+'#planner');await shot(mobile,'calculator-mobile');await overflow(mobile);
 });
 await mobile.close();
 await check('No browser runtime or resource errors',async()=>assert.deepEqual(report.consoleErrors,[]));
} catch(e){report.checks.push({name:'Browser review execution',status:'failed',error:e.stack});}
finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
report.passed=report.checks.filter(c=>c.status==='passed').length;
report.failed=report.checks.filter(c=>c.status==='failed').length;
await fs.writeFile(path.join(out,'results.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(report.failed)process.exitCode=1;
