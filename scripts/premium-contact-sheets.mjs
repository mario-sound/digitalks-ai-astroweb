import sharp from 'sharp';
for(const size of ['desktop','mobile']){
 const columns=[];let left=0;for(const page of ['home','post','datasets']){const input=await sharp(`docs/premium/after/${page}-${size}.jpg`).resize({width:size==='desktop'?480:260}).toBuffer();const m=await sharp(input).metadata();columns.push({input,left,top:0,height:m.height});left+=m.width;}
 await sharp({create:{width:left,height:Math.max(...columns.map(x=>x.height)),channels:3,background:'#ddd'}}).composite(columns.map(({input,left,top})=>({input,left,top}))).jpeg({quality:85}).toFile(`docs/premium/review-${size}.jpg`);
}
for(const page of ['home','post','datasets']){
 const columns=[];for(const [i,stage]of ['before','after'].entries()){const input=await sharp(`docs/premium/${stage}/${page}-desktop.jpg`).resize({width:720}).toBuffer();columns.push({input:await sharp(input).extract({left:0,top:0,width:720,height:500}).toBuffer(),left:i*720,top:0});}
 await sharp({create:{width:1440,height:500,channels:3,background:'#eee'}}).composite(columns).jpeg({quality:88}).toFile(`docs/premium/comparison-${page}.jpg`);
}
