import {createServer} from 'node:http';
import {existsSync,statSync,createReadStream,mkdirSync,cpSync,mkdtempSync,symlinkSync,rmSync} from 'node:fs';
import {resolve,join,extname,sep} from 'node:path';
import {tmpdir} from 'node:os';
import {execFileSync} from 'node:child_process';
const revision=process.argv.find(arg=>arg.startsWith('--revision='))?.slice(11)||'31c290f';
if(!/^[a-f0-9]{7,40}$/.test(revision))throw Error('Use a verified Git commit hash for comparison');
const project=process.cwd(),root=join(project,'.comparison',revision==='31c290f'?'original':revision);
if(!existsSync(join(root,'index.html'))){
 const temporary=mkdtempSync(join(tmpdir(),'digitalks-original-'));
 try{
  const archive=execFileSync('git',['archive',revision,'src','content','public','astro.config.mjs','package.json','tsconfig.json'],{maxBuffer:150*1024*1024});
  execFileSync('tar',['-xf','-','-C',temporary],{input:archive});
  symlinkSync(join(project,'node_modules'),join(temporary,'node_modules'),'dir');
  execFileSync(process.execPath,[join(project,'node_modules/astro/astro.js'),'build'],{cwd:temporary,env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1'},stdio:'inherit'});
  mkdirSync(root,{recursive:true});cpSync(join(temporary,'dist'),root,{recursive:true});
 }finally{rmSync(temporary,{recursive:true,force:true});}
}
if(process.argv.includes('--prepare-only'))process.exit(0);
const mime={'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.gif':'image/gif','.mp3':'audio/mpeg','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf','.xml':'application/xml','.txt':'text/plain'};
createServer((request,response)=>{
 let pathname;try{pathname=decodeURIComponent(new URL(request.url,'http://localhost').pathname)}catch{response.writeHead(400).end();return}
 let file=resolve(root,'.'+pathname);
 if(!file.startsWith(root+sep)&&file!==root){response.writeHead(403).end();return}
 if(existsSync(file)&&statSync(file).isDirectory())file=join(file,'index.html');
 if(!existsSync(file)){response.writeHead(404).end('Not found');return}
 const size=statSync(file).size;const headers={'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':'no-store','Accept-Ranges':'bytes'};
 const range=request.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
 if(range){const start=Number(range[1]),end=Math.min(range[2]?Number(range[2]):size-1,size-1);if(start>end||start>=size){response.writeHead(416,{'Content-Range':`bytes */${size}`}).end();return}response.writeHead(206,{...headers,'Content-Length':end-start+1,'Content-Range':`bytes ${start}-${end}/${size}`});createReadStream(file,{start,end}).pipe(response);return}
 response.writeHead(200,{...headers,'Content-Length':size});createReadStream(file).pipe(response);
}).listen(4322,'127.0.0.1',()=>console.log('Comparación '+revision+': http://127.0.0.1:4322/ — Ctrl+C para detener.'));
