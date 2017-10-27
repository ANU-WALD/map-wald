#!/usr/bin/env python

import sys
import os
from string import Template

serv_path = sys.argv[1]
path_elements=serv_path.split('/')
serv_name = path_elements[-1]
base_dir='src/' + (path_elements[:-1] or '')
serv_name_elements = serv_name.split('-')
serv_class_name = ''.join(elem.capitalize() for elem in serv_name_elements)+'Service'

print(serv_path,serv_name,serv_class_name,base_dir)

if not os.path.exists(base_dir):
  os.makedirs(base_dir)
templates = ['ts']

subst = {
  'klass':serv_class_name,
}

for tpl in templates:
  template = Template(open('scripts/tpl.service.'+tpl).read())
  dest = os.path.join(base_dir,'.'.join([serv_name,'service',tpl]))
  open(dest,'w').write(template.substitute(subst))

indexSubst = {
  'importList':"import { %s } from './%s/%s.service';"%(serv_class_name,base_dir,serv_name),
  'exportList':"export * from './%s/%s.service';"%(base_dir,serv_name),
  'serviceList':'%s,\n'%serv_class_name,
  'componentList':''
}

for k,v in indexSubst.items():
  indexSubst[k] = '$%s\n%s'%(k,v)

indexTpl = Template(open('index.ts').read())
open('index.ts','w').write(indexTpl.substitute(indexSubst))
#print(indexTpl.substitute(indexSubst))