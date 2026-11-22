import fs from'node:fs';import{parseHTML}from'linkedom';
for(const file of fs.readdirSync('content/forms')){
 const path='content/forms/'+file;const form=JSON.parse(fs.readFileSync(path));const key=new URL(form.source).pathname.replace(/^\/+|\/+$/g,'').replaceAll('/','__')||'home';const{document:d}=parseHTML(fs.readFileSync('docs/original/'+key+'.html','utf8'));const original=[...d.querySelectorAll('form')].find(x=>x.getAttribute('name')===form.title);if(!original)throw Error(form.id);
 const fields=[];
 for(const group of original.querySelectorAll('.elementor-field-group')){
  if(group.classList.contains('elementor-field-type-html')){fields.push({name:'heading-'+fields.length,label:group.textContent.trim(),type:'heading',required:false,placeholder:'',options:[]});continue}
  const input=group.querySelector('input:not([type="hidden"]),textarea,select');if(!input)continue;
  const field=form.fields.find(f=>f.name===input.name);if(!field)continue;
  fields.push({...field,showLabel:!group.querySelector('label')?.classList.contains('elementor-screen-only'),width:group.classList.contains('elementor-col-50')?'half':'full'});
 }
 form.fields=fields;fs.writeFileSync(path,JSON.stringify(form,null,2)+'\n');
}
