export type EnvConfig = {
  baseDir: string;
  diffDir: string;
  alwaysGenerateDiff: boolean;
}

declare global {
  namespace Cypress {
    type CompareSnapshotOptions = {
      errorThreshold: number;
      pixelThreshold: number;
    };

    interface Chainable {
      compareSnapshot(
        name: string,
        options?: Partial<Cypress.ScreenshotOptions & CompareSnapshotOptions>
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}