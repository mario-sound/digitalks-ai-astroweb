import fs from'node:fs';import sharp from'sharp';
const baseline=JSON.parse(fs.readFileSync('docs/design/content-baseline.json'));const pages=Object.entries(baseline).filter(([key])=>/^(pages|services|legal)\//.test(key)).map(([,r])=>r.value);
for(const[mode,w,h]of [['desktop',1440,1000],['tablet',834,1112],['mobile',390,844]])for(let batch=0;batch<4;batch++){
 const items=[];
 for(let row=0;row<4;row++){const page=pages[batch*4+row];for(const[col,version]of ['before','after'].entries()){
  const file=`docs/design/${version}/${page.id}-${mode}.jpg`;const meta=await sharp(file).metadata();
  const buffer=await sharp(file).extract({left:0,top:0,width:Math.min(w,meta.width),height:Math.min(h,meta.height)}).resize(480,360,{fit:'contain',background:'#e7e7e5'}).jpeg({quality:85}).toBuffer();items.push({input:buffer,left:col*480,top:row*390+30});
  const title=Buffer.from(`<svg width="480" height="30"><rect width="480" height="30" fill="white"/><text x="8" y="21" font-family="sans-serif" font-size="14">${version==='before'?'Antes':'Después'} · ${page.path}</text></svg>`);items.push({input:title,left:col*480,top:row*390});
 }}
 await sharp({create:{width:960,height:1560,channels:3,background:'#e7e7e5'}}).composite(items).jpeg({quality:87}).toFile(`docs/design/comparison-${mode}-${batch+1}.jpg`);
}
console.log('Created 12 visual comparison sheets.');
