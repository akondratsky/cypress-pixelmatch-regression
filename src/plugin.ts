import { visualRegressionBaseRun, visualRegressionActualRun } from './tasks';
import { PixelmatchRegressionConfig } from './types';

export const addPixelmatchRegressionPlugin = (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) => {
  const actualDir = config.screenshotsFolder;
  const envConfig = config.env.pixelmatchPlugin as PixelmatchRegressionConfig;

  if (!actualDir || !envConfig || !envConfig.baseDir || !envConfig.diffDir) {
    throw new Error('cypress-pixelmatch-plugin: incorrect configuration');
  }

  on('task', {
    visualRegressionBaseRun,
    visualRegressionActualRun,
  });
};
