import path from 'path';
import fs from 'fs';
import { mkdirp } from 'mkdirp';
import { TaskRunParams } from './TaskRunParams';

export const visualRegressionBaseRun = ({ name, specName, actualDir, baseDir }: TaskRunParams) => {
  const specBaseDir = path.join(baseDir, specName);

  mkdirp.sync(specBaseDir);

  fs.copyFileSync(
    path.join(actualDir, specName, `${name}.png`),
    path.join(specBaseDir, `${name}.png`),
  );

  return true;
};
