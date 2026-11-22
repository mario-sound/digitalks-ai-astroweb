import fs from'node:fs/promises';
const assets=JSON.parse(await fs.readFile('docs/original/asset-map.json','utf8')).filter(x=>x.type.includes('css'));
for(let i=0;i<assets.length;i+=6)await Promise.all(assets.slice(i,i+6).map(async a=>{const response=await fetch(a.url);if(!response.ok)throw Error(a.url);await fs.writeFile('docs/original/styles/'+a.local.split('/').pop(),Buffer.from(await response.arrayBuffer()))}));
console.log('Archived',assets.length,'public source styles');
