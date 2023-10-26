import path from 'path';
import { EnvConfig } from './types';

export const addCompareSnapshotsCommand = (
  defaultOptions: Partial<Cypress.ScreenshotOptions & Cypress.CompareSnapshotOptions> = {},
) => {
  const actualDir = Cypress.config().screenshotsFolder;
  const runType = Cypress.env('type') === 'base' ? 'base' : 'actual';
  const { alwaysGenerateDiff, baseDir, diffDir } = Cypress.env('pixelmatchPlugin') as EnvConfig;

  Cypress.Commands.add(
    'compareSnapshot',
    { prevSubject: 'element' },
    (prevSubject, name, options = {}) => {
      cy.log(`compareSnapshot("${name}")`);

      const { errorThreshold, pixelThreshold, ...defaultScreenshotOptions } = options;
      const screenshotOptions: Partial<Cypress.ScreenshotOptions & Cypress.Loggable> = {
        ...defaultScreenshotOptions,
        overwrite: true,
        log: false,
      };

      const subject = prevSubject ? cy.wrap(prevSubject, { log: false }) : cy;
      subject
        .screenshot(path.join(Cypress.spec.name, name), screenshotOptions)
        .task(
          runType === 'base' ? 'visualRegressionBaseRun' : 'visualRegressionActualRun',
          {
            name,
            specName: Cypress.spec.name,
            baseDir,
            diffDir,
            actualDir,
            errorThreshold: errorThreshold || defaultOptions.errorThreshold,
            pixelThreshold: pixelThreshold || defaultOptions.pixelThreshold,
            alwaysGenerateDiff,
          },
          { log: false }
        );
    },
  );
};
