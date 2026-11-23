import { defineConfig } from 'astro/config';
import {readFileSync} from 'node:fs';
import fs from 'node:fs';
import path from 'node:path';
const redirects=JSON.parse(readFileSync(new URL('./content/settings/redirects.json',import.meta.url))); 

const builderApi=()=>{
  const root=path.dirname(new URL('./package.json',import.meta.url).pathname);
  const contentRoot=path.join(root,'content');
  const allowedKinds=new Set(['pages','services','legal']);
  const safeId=(value)=>typeof value==='string'&&/^[a-zA-Z0-9_-]+$/.test(value);
  const send=(res,status,body)=>{
   res.statusCode=status;res.setHeader('Content-Type','application/json');
   res.end(JSON.stringify(body));
  };
  return {name:'local-page-builder-api',configureServer(server){
   server.middlewares.use(async(req,res,next)=>{
    try{
     const url=new URL(req.url,'http://127.0.0.1');
     if(!url.pathname.startsWith('/__builder/api'))return next();
     if(req.method==='GET'&&!url.searchParams.has('kind')){
      const entries=[];for(const kind of allowedKinds){
       const dir=path.join(contentRoot,kind);if(!fs.existsSync(dir))continue;
       for(const name of fs.readdirSync(dir).filter(n=>n.endsWith('.json')).sort()){
        const data=JSON.parse(fs.readFileSync(path.join(dir,name),'utf8'));
        entries.push({kind,id:data.id||name.replace(/\.json$/,''),title:data.title||name,path:data.path||'',lang:data.lang||'',file:name});
       }
      }
      return send(res,200,entries);
     }
     if(req.method==='GET'){
      const kind=url.searchParams.get('kind'),id=url.searchParams.get('id');
      if(!allowedKinds.has(kind)||!safeId(id))return send(res,400,{error:'Invalid page'});
      const file=path.join(contentRoot,kind,id+'.json');
      if(!file.startsWith(contentRoot)||!fs.existsSync(file))return send(res,404,{error:'Page not found'});
      return send(res,200,{file:id+'.json',content:JSON.parse(fs.readFileSync(file,'utf8'))});
     }
     if(req.method==='POST'){
      const kind=url.searchParams.get('kind'),id=url.searchParams.get('id');
      if(!allowedKinds.has(kind)||!safeId(id))return send(res,400,{error:'Invalid page'});
      let body='';for await(const chunk of req)body+=chunk;
      const content=JSON.parse(body);
      const file=path.join(contentRoot,kind,id+'.json');
      if(!file.startsWith(contentRoot))return send(res,400,{error:'Invalid page'});
      fs.writeFileSync(file,JSON.stringify(content,null,2)+'\n','utf8');
      return send(res,200,{saved:true,file:path.basename(file)});
     }
     next();
    }catch(error){send(res,400,{error:error instanceof Error?error.message:'Invalid request'});}
   });
  }};
};
export default defineConfig({
  redirects: Object.fromEntries(Object.entries(redirects).map(([from,to])=>[from,{status:301,destination:to}])),
  devToolbar: { enabled: false },
  site: 'https://digitalks-ai.com', output: 'static', trailingSlash: 'always',
  i18n: { defaultLocale: 'es', locales: ['es', 'en'], routing: { prefixDefaultLocale: false } },
  build: { format: 'directory' },
  vite:{plugins:[builderApi()]},
});
