import {defineConfig} from 'vite';
import {cpSync} from 'node:fs';
export default defineConfig({
 base:'./',
 server:{host:'0.0.0.0',allowedHosts:['terminal.local']},
 build:{outDir:'dist'},
 plugins:[{name:'preserve-dynamic-assets',closeBundle(){
  cpSync('resorts','dist/resorts',{recursive:true});
  cpSync('resort-guides.css','dist/resort-guides.css');
  cpSync('style.css','dist/style.css');
  cpSync('sitemap.xml','dist/sitemap.xml');
  cpSync('assets','dist/assets',{recursive:true});
  cpSync('.nojekyll','dist/.nojekyll');
 }}]
});
