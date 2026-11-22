import fs from 'node:fs';
let text='# Copy completo ES / EN\n\nFuente editable: JSON de Pages CMS. Secciones activas en orden; las páginas legales conservan su texto previo.\n';
for(const dir of ['pages','services'])for(const f of fs.readdirSync('content/'+dir)){
 const p=JSON.parse(fs.readFileSync('content/'+dir+'/'+f));text+=`\n## ${p.lang.toUpperCase()} — ${p.path}\n`;
 for(const s of p.sections){text+=`\n### ${s.heading}\n\n${s.eyebrow||''}\n\n${s.body||''}\n`;for(const i of [...s.items||[],...s.heroMetrics||[]])text+=`\n- **${i.title}**: ${i.body}\n`;for(const a of s.actions||[])text+=`\nCTA: ${a.label} → ${a.href}\n`;for(const key of ['characterLabel','multilingualLabel','caption','note','stat','statLabel','specialties'])if(s[key])text+=`\n${s[key]}\n`;
 for(const step of s.timeline||[])text+=`\n${step.title}: ${step.body}\n`;
 for(const shot of s.screenshots||[])text+=`\nCaptura: ${shot.title} · ${shot.caption} · ${shot.status}\n`;
 if(s.demoIds)for(const id of s.demoIds){const d=JSON.parse(fs.readFileSync('content/demos/'+id+'.json'));text+=`\nDemo: ${d.title} · ${d.language}\n`}
 if(s.form){const form=JSON.parse(fs.readFileSync('content/forms/'+s.form+'.json'));text+='\nFormulario:\n'+form.fields.map(f=>`- ${f.label}${f.required?' *':''}${f.options.length?' ['+f.options.map(o=>o.label).join(' / ')+']':''}`).join('\n')+`\n\n${form.submit}\n\n${form.notice}\n\n${form.optionalLabel||''}\n\n${form.privacyText||''} ${form.privacyLabel||''}\n\n${s.email}\n`;}}
 const seo=JSON.parse(fs.readFileSync('content/seo/'+p.seo+'.json'));text+=`\nSEO title: ${seo.title}\n\nDescription: ${seo.description}\n`;}
for(const name of ['navigation','footer','ui'])text+=`\n## Interfaz: ${name}\n\n\`\`\`json\n${fs.readFileSync('content/settings/'+name+'.json','utf8')}\`\`\`\n`;
fs.writeFileSync('docs/WEBSITE_COPY_ES_EN.md',text);
