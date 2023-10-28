export type PixelmatchRegressionConfig = {
  baseDir: string;
  diffDir: string;
  alwaysGenerateDiff: boolean;
}

export type CompareSnapshotOptions = Cypress.ScreenshotOptions & {
  errorThreshold: number;
  pixelThreshold: number;
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

