import {defineConfig} from 'vite';
import {cpSync} from 'node:fs';
export default defineConfig({
 base:'./',
 server:{host:'0.0.0.0',allowedHosts:['terminal.local']},
 build:{outDir:'dist'},
 plugins:[{name:'preserve-dynamic-assets',closeBundle(){
  cpSync('assets','dist/assets',{recursive:true});
  cpSync('.nojekyll','dist/.nojekyll');
 }}]
});
