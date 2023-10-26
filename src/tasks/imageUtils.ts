import fs from 'fs';
import { PNG } from 'pngjs';

export const readPngFile = (fileName: string): Promise<PNG> => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(fileName)) {
      reject(new Error(`Snapshot ${fileName} does not exist.`));
      return;
    }

    fs.createReadStream(fileName)
      .pipe(new PNG())
      .on('parsed', function () {
        resolve(this);
      })
      .on('error', (error) => reject(error));
  });
};


export const resize = (image: PNG, width: number, height: number) => {
  if (image.width === width && image.height === height) {
    return image;
  }

  const resized = new PNG({
    width,
    height,
    // bitDepth: image,
    inputHasAlpha: true,
  });

  PNG.bitblt(image, resized, 0, 0, image.width, image.height, 0, 0);

  return resized;
}