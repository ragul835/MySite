import json, yaml

workspace = yaml.safe_load(open('../pnpm-workspace.yaml'))
catalog = workspace.get('catalog', {})

pkg = json.load(open('package.json'))
dev_deps = pkg.get('devDependencies', {})

for k, v in list(dev_deps.items()):
    if v == 'catalog:':
        if k in catalog:
            dev_deps[k] = str(catalog[k])
        else:
            dev_deps[k] = 'latest'
    elif v == 'workspace:*':
        del dev_deps[k]

pkg['devDependencies'] = dev_deps
json.dump(pkg, open('package.json', 'w'), indent=2)
