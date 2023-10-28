export type PixelmatchRegressionConfig = {
  baseDir: string;
  diffDir: string;
  alwaysGenerateDiff: boolean;
}

export type CompareSnapshotOptions = Cypress.ScreenshotOptions & {
  /** How many pixels may be different. The number in range from 0 to 1. */
  errorThreshold: number;

  /** Pixel-level sensitivity. The `threshold` from pixelmatch. The number in range from 0 to 1. */
  pixelThreshold: number;

  /**
   * If true, pixelmatch checks if the difference is caused by anti-aliasing.
   * See `includeAA` from pixelmatch
   */
  ignoreAntiAliasing: boolean;
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

