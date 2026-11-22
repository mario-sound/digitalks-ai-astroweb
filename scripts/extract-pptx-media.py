from zipfile import ZipFile
from pathlib import Path
import hashlib,json,posixpath,xml.etree.ElementTree as E
from PIL import Image
ppt=Path('refs/DigiTalks_Game_Audio_Post_Production_v13.pptx');out=Path('refs/suiteqa-extracted-originals');out.mkdir(exist_ok=True)
ns={'a':'http://schemas.openxmlformats.org/drawingml/2006/main','r':'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
manifest={'source':ppt.name,'sha256':hashlib.sha256(ppt.read_bytes()).hexdigest(),'images':[],'slides':[]};seen={}
with ZipFile(ppt) as z:
 for name in z.namelist():
  if not name.startswith('ppt/media/'):continue
  data=z.read(name);digest=hashlib.sha256(data).hexdigest();duplicate=seen.get(digest);dest=out/Path(name).name
  if not duplicate:dest.write_bytes(data);seen[digest]=name
  try:
   with Image.open(dest if not duplicate else out/Path(duplicate).name) as im:width,height=im.size
  except:width=height=None
  manifest['images'].append({'entry':name,'sha256':digest,'bytes':len(data),'width':width,'height':height,'duplicateOf':duplicate})
 for name in sorted([n for n in z.namelist() if __import__('re').match(r'ppt/slides/slide\d+\.xml$',n)],key=lambda n:int(__import__('re').search(r'slide(\d+)',n).group(1))):
  xml=E.fromstring(z.read(name));rel=E.fromstring(z.read(posixpath.dirname(name)+'/_rels/'+posixpath.basename(name)+'.rels'));rels={x.attrib['Id']:posixpath.normpath(posixpath.join('ppt/slides',x.attrib['Target'])) for x in rel};images=[rels.get(b.attrib.get('{'+ns['r']+'}embed')) for b in xml.findall('.//a:blip',ns)];manifest['slides'].append({'slide':name,'text':' '.join(t.text or '' for t in xml.findall('.//a:t',ns)),'images':images})
(out/'manifest-private.json').write_text(json.dumps(manifest,indent=2))
print('Images',len(manifest['images']),'unique',len(seen),'duplicates',len(manifest['images'])-len(seen))
for s in manifest['slides']:
 print(s['slide'],s['text'][:110],s['images'])
for i in manifest['images']:print(i['entry'],i['width'],i['height'],'duplicate:',i['duplicateOf'])
