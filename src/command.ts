import type { PixelmatchOptions } from 'pixelmatch';
import type { CompareSnapshotOptions, PixelmatchRegressionConfig } from './types';

export const addCompareSnapshotsCommand = (
  defaultOptions: Partial<CompareSnapshotOptions> = {},
) => {
  const actualDir = Cypress.config().screenshotsFolder;
  const runType = Cypress.env('type') === 'base' ? 'base' : 'actual';
  const { alwaysGenerateDiff, baseDir, diffDir } = Cypress.env('pixelmatchPlugin') as PixelmatchRegressionConfig;

  Cypress.Commands.add(
    'compareSnapshot',
    { prevSubject: 'element' },
    (prevSubject, name, options = {} as CompareSnapshotOptions) => {
      cy.log(`compareSnapshot("${name}")`);

      const errorThreshold = options.errorThreshold ?? defaultOptions.errorThreshold ?? 0;

      const screenshotOptions: Partial<Cypress.ScreenshotOptions & Cypress.Loggable> = {
        overwrite: true,
        log: false,
        ...defaultOptions.screenshot,
        ...options.screenshot,
      };

      const pixelmatchOptions = {
        ...defaultOptions.pixelmatch,
        ...options.pixelmatch,
      } as PixelmatchOptions;

      const subject = prevSubject ? cy.wrap(prevSubject, { log: false }) : cy;
      subject
        .screenshot(name, screenshotOptions)
        .task(
          runType === 'base' ? 'visualRegressionBaseRun' : 'visualRegressionActualRun',
          {
            name,
            specName: Cypress.spec.name,
            baseDir,
            diffDir,
            actualDir,
            errorThreshold,
            pixelmatchOptions,
            alwaysGenerateDiff,
          },
          { log: false }
        )
        .then((percentage) => {
          if (percentage as number > errorThreshold) {
            throw new Error(
              `Threshold limit for the "${name}" image exceeded!\n` +
              `            Expected: ${errorThreshold}\n` +
              `            Actual: ${percentage}`,
            );
          }
        });
    },
  );
};

