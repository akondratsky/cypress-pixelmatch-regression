import fs from 'fs';

fs.copyFileSync('.npmignore', './dist/.npmignore');

const packageJson = {
  ...JSON.parse(fs.readFileSync('package.json', 'utf-8')),
  main: 'index.js',
};

delete packageJson.devDependencies;
delete packageJson.scripts;

fs.writeFileSync('./dist/package.json', JSON.stringify(packageJson, null, 2), 'utf-8');