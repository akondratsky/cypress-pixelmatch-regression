export type TaskRunParams = {
  name: string;
  specName: string;
  baseDir: string;
  actualDir: string;
  diffDir: string;
  keepDiff: boolean;
  errorThreshold: number;
  pixelThreshold: number;
  alwaysGenerateDiff: boolean;
};