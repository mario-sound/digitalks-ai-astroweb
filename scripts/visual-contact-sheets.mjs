import fs from 'node:fs';import sharp from 'sharp';
const pages=JSON.parse(fs.readFileSync('docs/original/audit.json')).pages;
for(const mode of ['desktop','mobile'])for(let batch=0;batch<4;batch++){
 const input=[];
 for(let row=0;row<4;row++){let p=pages[batch*4+row];for(let [col,version]of ['original','astro'].entries()){
 const file=`docs/screenshots/${version}-${p.key}-${mode}.jpg`;const meta=await sharp(file).metadata();const width=mode==='desktop'?1440:390;
 const buffer=await sharp(file).extract({left:0,top:0,width:Math.min(width,meta.width),height:Math.min(mode==='desktop'?1000:844,meta.height)}).resize(480,330,{fit:'contain',background:'#ddd'}).toBuffer();input.push({input:buffer,left:col*480,top:row*360+30});
 const title=Buffer.from(`<svg width="480" height="30"><rect width="480" height="30" fill="white"/><text x="8" y="21" font-family="sans-serif" font-size="14">${version} · ${p.path}</text></svg>`);input.push({input:title,left:col*480,top:row*360});
 }}
 await sharp({create:{width:960,height:1440,channels:3,background:'#ddd'}}).composite(input).jpeg({quality:85}).toFile(`docs/screenshots/comparison-${mode}-${batch+1}.jpg`);
}
