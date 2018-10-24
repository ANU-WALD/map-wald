#!/usr/bin/env python

import sys
import os
from string import Template

comp_path = sys.argv[1]
path_elems = comp_path.split('/')

parent=None
if len(sys.argv)>2:
  parent = sys.argv[2]
elif len(path_elems)>1:
  parent = path_elems[0]
  if parent[-1]=='s':
    parent = parent[:-1]
else:
  parent=''

print(parent)
if parent:
  interface='I'+parent.capitalize()+'Component'
  interface_module = os.path.join(*(['..']*len(path_elems))+['i'+parent+'.component'])
  klass_prefix = parent.capitalize()
else:
  interface=''
  interface_module=''
  klass_prefix=''

comp_name = path_elems[-1]
comp_name_elements = comp_name.split('-')
comp_class_name = ''.join(elem.capitalize() for elem in comp_name_elements)+klass_prefix+'Component'

print(comp_path,comp_name,comp_class_name)

full_path = os.path.join('src',comp_path)
if not os.path.exists(full_path):
  os.makedirs(full_path)
templates = ['ts']

if parent:
  comp_name = comp_name + '-' + parent

subst = {
  'klass':comp_class_name,
  'selector':comp_name,
  'implements':(', %s'%interface) if interface else '',
  'imports':("import {%s} from '%s'"%(interface,interface_module)) if interface else ''
}

print(subst)

fn_suffix='component'

for tpl in templates:
  template = Template(open('scripts/tpl.component.'+tpl).read())
  dest = os.path.join(full_path,'.'.join([comp_name,fn_suffix,tpl]))
  open(dest,'w').write(template.substitute(subst))

indexSubst = {
  'importList':"import { %s } from './%s/%s.%s';"%(comp_class_name,full_path,comp_name,fn_suffix),
  'exportList':"export * from './%s/%s.%s';"%(full_path,comp_name,fn_suffix),
  'serviceList':'',
  'componentList':'%s,\n'%comp_class_name
}

for k,v in indexSubst.items():
  indexSubst[k] = '$%s\n%s'%(k,v)

indexTpl = Template(open('index.ts').read())
open('index.ts','w').write(indexTpl.substitute(indexSubst))