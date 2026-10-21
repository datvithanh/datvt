"""Read-only HTTP integration audit of the real app. Run with a local Next server."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.request import urlopen, Request, build_opener, HTTPRedirectHandler
from urllib.error import HTTPError
from urllib.parse import urlsplit, unquote
import concurrent.futures,json,re,sys,struct,os
BASE=(sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:8767').rstrip('/')
IMAGE_ORIGINS=tuple(origin.rstrip('/')+'/' for origin in ['https://mindtraining.cc',os.environ.get('CC_ASSET_ORIGIN','https://mindtraining.cc')])
class Page(HTMLParser):
 def __init__(self,source):
  super().__init__(); self.ids=[];self.links=[];self.images=[];self.canonical=None;self.robots='';self.h1=0;self.forms=0;self.main_forms=0;self.main=False;self.names=[];self.meta={};self.feed(source)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  if tag=='main':self.main=True
  if tag=='h1':self.h1+=1
  if tag=='form':self.forms+=1;self.main_forms+=int(self.main)
  if tag=='a':self.links.append(a.get('href',''))
  if tag=='img':self.images.append(a.get('src',''))
  if tag=='input':self.names.append(a.get('name'))
  if tag=='link' and a.get('rel')=='canonical':self.canonical=a.get('href')
  if tag=='meta':
   key=a.get('property',a.get('name',''));self.meta[key]=a.get('content','')
   if key=='robots':self.robots=a.get('content','')
 def handle_endtag(self,tag):
  if tag=='main':self.main=False

def read(path):
 with urlopen(BASE+path,timeout=45) as response:return response.status,response.read().decode()
public=['/','/programs','/bootcamp','/mini-bootcamp','/resources','/media','/transmission-101','/articles','/terms','/privacy','/refund-policy','/articles/topics/practice']
articles=[p.stem for p in Path('content/articles').rglob('*.mdx')]
paths=public+[f'/articles/{slug}' for slug in articles]
results={}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
 for path,(status,source) in zip(paths,pool.map(read,paths)):
  assert status==200,path
  page=Page(source);results[path]=page
  assert page.h1==1,(path,'H1 count',page.h1)
  assert len(page.ids)==len(set(page.ids)),(path,'duplicate IDs')
  assert 'resource-nav' not in source,(path,'obsolete tabs')
  assert 'googletagmanager.com/gtag/js' not in source and 'id="gtag-init"' not in source,(path,'analytics must wait for the client production-origin guard')
  assert page.meta.get('og:image','').startswith(IMAGE_ORIGINS),(path,'OG image missing')
  assert page.meta.get('twitter:image','').startswith(IMAGE_ORIGINS),(path,'Twitter image missing')
  assert page.meta.get('twitter:card')=='summary_large_image',(path,'large social card')
  assert page.meta.get('og:title') and page.meta.get('og:title')==page.meta.get('twitter:title'),(path,'contextual social titles')
  assert page.meta.get('og:description') and page.meta.get('og:description')==page.meta.get('twitter:description'),(path,'contextual social descriptions')
  assert page.meta.get('og:url')=='https://mindtraining.cc'+('' if path=='/' else path),(path,'contextual social URL')
  for key in ['og:image','twitter:image']:
   assert (Path('public')/urlsplit(page.meta[key]).path.lstrip('/')).is_file(),(path,'missing social image',page.meta[key])
  assert '<title>Contemplative CrossFit</title>' in source,(path,'browser identity')
  assert 'fields[first_name]' in page.names and 'email_address' in page.names,(path,'Kit fields')
  assert page.forms==1,(path,'form count',page.forms)
  for href in page.links:
   if href.startswith('#') and len(href)>1:assert unquote(href[1:]) in page.ids,(path,'missing anchor',href)
  for image in page.images:
   if image.startswith('/') and not image.startswith('//'):assert (Path('public')/urlsplit(image).path.lstrip('/')).is_file(),(path,'missing image',image)
with urlopen(BASE+'/brand/cc-social-preview.png',timeout=30) as response:
 assert response.status==200 and response.headers.get_content_type()=='image/png'
 image=response.read()
 assert image[:8]==b'\x89PNG\r\n\x1a\n' and struct.unpack('>II',image[16:24])==(1200,630)

for path in public:
 assert results[path].canonical=='https://mindtraining.cc'+('' if path=='/' else path),(path,'canonical')
assert results['/resources'].main_forms==0
_,course=read('/transmission-101')
assert course.index('class="course-hero wrap"')<course.index('id="newsletter"')<course.index('class="course-outline wrap"')
hero=course.split('class="course-hero wrap"',1)[1].split('</section>',1)[0]
assert 'id="newsletter"' in hero and 'class="course-hero-signup"' in hero
assert 'class="section newsletter wrap"' not in course
for slug in articles:assert results[f'/articles/{slug}'].canonical==f'https://mindtraining.cc/articles/{slug}'
_,bootcamp=read('/bootcamp')
assert 'for 12 weeks' in bootcamp and '1.5 to 2.5' not in bootcamp and '90-day commitment' not in bootcamp
_,library=read('/courses/library');library_page=Page(library)
assert 'noindex' in library_page.robots and 'nofollow' in library_page.robots
_,sitemap=read('/sitemap.xml');assert '/courses/library' not in sitemap
for path in ['/resources','/media','/transmission-101']+[f'/articles/{slug}' for slug in articles]:assert 'https://mindtraining.cc'+path in sitemap,(path,'sitemap')
_,robots=read('/robots.txt');assert 'https://mindtraining.cc/sitemap.xml' in robots
class NoRedirect(HTTPRedirectHandler):
 def redirect_request(self,*args,**kwargs):return None
opener=build_opener(NoRedirect)
for old,target in [('/pricing','/bootcamp?tab=pricing'),('/ppw','/mini-bootcamp'),('/ppw-package-april-2026','/courses/transmission-101-staying-present'),('/clips/library/enlightenment-team-sport','/courses/videos/library/enlightenment-team-sport'),('/journal/the-solo-meditator-paradox','/articles/the-solo-meditator-paradox'),('/field-guide/resources','/resources'),('/courses','/resources')]:
 try:opener.open(BASE+old,timeout=30);raise AssertionError(('Missing redirect',old))
 except HTTPError as error:
  assert error.code in [301,302,307,308],(old,error.code)
  assert error.headers['Location']==target,(old,error.headers['Location'],target)
for path in ['/articles/not-a-real-article','/courses/videos/library/not-a-real-video']:
 try:read(path);raise AssertionError(('Missing 404',path))
 except HTTPError as error:assert error.code==404,(path,error.code)
print(json.dumps({'checked_pages':len(paths),'articles':len(articles),'forms':'one each; optional name + email retained','course':'inline hero signup; full outline retained','aliases':'7 checked','unlisted_library':'noindex/nofollow; absent from sitemap','GA4':'deferred to client production-origin guard; tested separately','social_images':'OG and Twitter large images present and locally resolvable','anchors_assets_canonicals':'pass'},indent=2))
