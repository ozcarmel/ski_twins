// Some remote preview hosts do not expose network-interface enumeration.
import os from 'node:os';
import { syncBuiltinESMExports } from 'node:module';
const interfaces = os.networkInterfaces;
os.networkInterfaces = () => { try { return interfaces(); } catch { return {}; } };
syncBuiltinESMExports();
const { createServer } = await import('vite');
const args = process.argv.slice(2);
const option = (name, fallback) => { const i=args.indexOf(name); return i>=0 ? args[i+1] : fallback; };
const server = await createServer({server:{host:option('--host','0.0.0.0'),port:Number(option('--port','4173')),strictPort:args.includes('--strictPort')}});
await server.listen();
console.log('Ski Twins preview ready.');
