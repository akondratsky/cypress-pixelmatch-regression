import { mkdirp } from 'mkdirp';
import path from 'path';
import fs from 'fs';
import { readPngFile, resize } from './imageUtils';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { TaskRunParams } from './TaskRunParams';

export const visualRegressionActualRun = async ({
  baseDir,
  diffDir,
  actualDir,
  name,
  errorThreshold = 0,
  pixelThreshold = 0,
  ignoreAntiAliasing = false,
  specName,
  alwaysGenerateDiff,
}: TaskRunParams) => {
  const actualImagePath = path.join(actualDir, specName, `${name}.png`);
  const baseImagePath = path.join(baseDir, specName, `${name}-base.png`);
  const diffSpecFolder = path.join(diffDir, specName);
  const diffImagePath = path.join(diffSpecFolder, `${name}-diff.png`);

  const actualImage = await readPngFile(actualImagePath);
  const baseImage = await readPngFile(baseImagePath);

  const width = Math.max(actualImage.width, baseImage.width);
  const height = Math.max(actualImage.height, baseImage.height);
  
  const resizedActualImage = resize(actualImage, width, height);
  const resizedBaseImage = resize(baseImage, width, height);
  const diffImage = new PNG({ width, height });

  const mismatchedPixels = pixelmatch(
    resizedActualImage.data,
    resizedBaseImage.data,
    diffImage.data,
    width,
    height,
    {
      threshold: pixelThreshold,
      includeAA: !ignoreAntiAliasing,
    },
  );

  const percentage = mismatchedPixels / (width * height);
  const isFailed = percentage > errorThreshold;

  if (isFailed || alwaysGenerateDiff) {
    mkdirp.sync(diffSpecFolder);
    diffImage.pack().pipe(fs.createWriteStream(diffImagePath));
  }

  if (isFailed) {
    throw new Error(
      `Threshold limit for the "${name}" image exceeded! \nExpected: ${errorThreshold} \nActual: ${percentage}`
    );
  }

  return true;
};
