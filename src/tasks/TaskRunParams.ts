import type { PixelmatchOptions } from 'pixelmatch';

export type TaskRunParams = {
  name: string;
  specName: string;
  baseDir: string;
  actualDir: string;
  diffDir: string;
  keepDiff: boolean;
  errorThreshold: number;
  pixelmatchOptions: PixelmatchOptions;
  alwaysGenerateDiff: boolean;
};