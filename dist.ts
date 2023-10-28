import fs from 'fs';

fs.copyFileSync('.npmignore', './dist/.npmignore');
fs.copyFileSync('LICENSE', './dist/LICENSE');
fs.copyFileSync('README.md', './dist/README.md');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
delete packageJson.devDependencies;
delete packageJson.scripts;

fs.writeFileSync('./dist/package.json', JSON.stringify(packageJson, null, 2), 'utf-8');