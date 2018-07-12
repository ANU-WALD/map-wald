from glob import glob
import os
import sys

def inline(fn):
  if not (os.path.exists(fn) and os.path.isfile(fn)):
    raise Exception(fn)
  contents = open(fn).readlines()
  if not len(contents):
    return ''
  contents[0] = '`'+contents[0]
  contents[-1] = contents[-1]+'`'
  return contents

ts_files = glob('src/**/*.ts',recursive=True)
files_to_rm = []
for fn in ts_files:
  dir_name = os.path.dirname(fn)
  print(fn)
  contents = open(fn).readlines()
  modified = False
  result = []
  for ln in contents:
    if ln.strip().startswith('//') or not 'templateUrl' in ln:
      result.append(ln)
      continue
    modified = True
    template_fn = os.path.join(dir_name,ln.split("'")[-2]).replace('./','')
    inlined = inline(template_fn)
    inlined[0] = '  template: ' + inlined[0]

    if ln.strip().endswith(','):
      inlined[-1] += ','
    result += inlined
    files_to_rm.append(template_fn)

  contents = result
  result = []
  for ln in contents:
    if ln.strip().startswith('//') or not 'styleUrls' in ln:
      result.append(ln)
      continue
    modified = True

    style_fns = [os.path.join(dir_name, style_fn).replace('./','') for style_fn in ln.replace("'","").split('[')[-1].split(']')[0].split(',')]
    print('=== STYLES ===',style_fns)

    result.append('styles: [')
    first = True
    for style_fn in style_fns:
      if not first:
        result[-1] = result[-1] + ','
      inlined = inline(style_fn)
      result += inlined
      first = False
      files_to_rm.append(style_fn)
    result[-1] = result[-1] + ']'

    if ln.strip().endswith(','):
      result[-1] += ','

  if not modified:
    continue

  open(fn,'w').writelines(result)

print(len(ts_files))

failed_remove = []
for fn in files_to_rm:
  if os.system('git rm %s'%fn) != 0:
    failed_remove.append(fn)

if len(failed_remove):
  print(failed_remove)