import fs from 'node:fs';import {pathToFileURL} from 'node:url';
export function assertPublicationAllowed(general,pages){
 if(general.preview)return;
 for(const page of pages)for(const section of page.sections||[])for(const shot of section.screenshots||[])if(shot.src&&shot.review!=='approved')throw Error('Publication blocked: SuiteQA screenshot awaiting approval: '+shot.id);
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)assertPublicationAllowed(JSON.parse(fs.readFileSync('content/settings/general.json')),fs.readdirSync('content/services').map(f=>JSON.parse(fs.readFileSync('content/services/'+f))));
