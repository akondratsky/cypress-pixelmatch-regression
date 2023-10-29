import type { PixelmatchOptions } from 'pixelmatch';

export type PixelmatchRegressionConfig = {
  baseDir: string;
  diffDir: string;
  alwaysGenerateDiff: boolean;
}

export type CompareSnapshotOptions = {
  /** How many pixels may be different. The number in range from 0 to 1. */
  errorThreshold?: number;
  screenshot?: Partial<Cypress.ScreenshotOptions>;
  pixelmatch?: Partial<PixelmatchOptions>;
};

declare global {
  namespace Cypress {
    interface Chainable {
      compareSnapshot(
        name: string,
        options?: Partial<CompareSnapshotOptions>
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}

