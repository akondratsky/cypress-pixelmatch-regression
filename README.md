# cypress-pixelmatch-regression

## Why is it archived and deprecated?

This plugin was an experiment with design system testing. Such plugins as [cypress-visual-regression](https://github.com/cypress-visual-regression/cypress-visual-regression) or [cypress-visual-regression-resemble-js](https://github.com/Andremoniy/cypress-visual-regression-resemble-js) have predefined some pixel-level threshold by default, and you cannot change it. It means that, for example, if you want to test your background colors, there will be some tolerance for change. It's not what you need for design systems.

Unfortunately, it is a well-known issue that browsers render the same web pages differently on different systems. If you work in a team, you will get different results. This fact was the reason why resemblejs and pixelmatch have anti-aliasing detection algorithms. The only way to get stable results during visual regression is to run tests on the same environment each time, as the part of CI/CD process.

At this point it is clear that keeping screenshots in the same repo reduces transparency: if your test fails in the pipeline, there is no way to understand why. Even if your script commits the difference to the repo, you need to check it out. It increases complexity and makes the developer experience worse. In our team, we agreed that using external tools is the better way to achieve our goals.

You might want to consider something from this list:

- [Visual Regression Tracker](https://github.com/visual-regression-tracker/visual-regression-tracker)
- [Applitools Eyes](https://applitools.com/platform/eyes/)
- [Percy](https://percy.io/)
- [Happo](https://happo.io/)


## Description

This plugin was inspired by [cypress-visual-regression](https://github.com/cypress-visual-regression/cypress-visual-regression) and [cypress-visual-regression-resemble-js](https://github.com/Andremoniy/cypress-visual-regression-resemble-js) plugins.

The plugin uses [pixelmatch](https://github.com/mapbox/pixelmatch) to compare screenshots. Written in Typescript. Supports Typescript.

It was created to create the most precise visual regression test, to be run on the same environment and to track the minimal visual changes. If you want to run you visual regression on a different machines, consider using `pixelThreshold` option to avoid anti-aliasing problem (see ["Add Command"](#add-command) section)

## Getting Started

### Install

```shell
npm i cypress-pixelmatch-regression --save
```

### Cypress Configuration

```ts
import { defineConfig } from 'cypress';
import { addPixelmatchRegressionPlugin } from 'cypress-pixelmatch-regression/plugin';

export default defineConfig({
  screenshotsFolder: './cypress/snapshots/actual',
  video: false,
  trashAssetsBeforeRuns: true,

  env: {
    pixelmatchPlugin: {
      baseDir: './cypress/snapshots/base',
      diffDir: './cypress/snapshots/diff',
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      addPixelmatchRegressionPlugin(on, config);
    },
  },

  component: {
    setupNodeEvents(on, config) {
      addPixelmatchRegressionPlugin(on, config);
    },
  },
});
```

- `screenshotsFolder` is a directory where actual screenshots will be saved; `cypress-pixelmatch-regression` uses default `cy.screenshot()` command, and it saves them according to this parameter, it is required to run plugin
- `baseDir` is required, it is a directory where so-called baseline screenshots are kept
- `diffDir` is required, a directory with images containing rendered difference between actual and baseline screenshots
- `alwaysGenerateDiff` is optional, if true, difference files will be generated even if no difference found

### Add Command

You can add the command (under `cypress/support` folder):

```ts
import { addCompareSnapshotsCommand } from 'cypress-pixelmatch-regression/command';

addCompareSnapshotsCommand();
```

The `addCompareSnapshotsCommand()` method takes an object as a parameter. It consists of standard [cy.screenshot()](https://docs.cypress.io/api/commands/screenshot#Arguments) arguments and also contains two additional parameters:

- `errorThreshold` is a number from 0 to 1, which represents sensitivity to relative number of different pixels between actual and base image. By default equals 0 (minimal difference will cause failing the test);
- `pixelThreshold` is the `threshold` value from the pixelmatch. Ranges from 0 to 1. The smaller the value, the more sensitive pixel-by-pixel comparison; may be useful in solving problem with anti-aliasing.

**Pay your attention that sensitivity is maximal by default, you may need to configure it. The value for `pixelThreshold` 0.1 is used in the most libraries**


### Usage

```ts
// use predefined options:
cy.get('#your-component').compareSnapshots('screenshot-name');

// with options in command:
cy.get('#your-component').compareSnapshots('screenshot-name', {
  errorThreshold: 0.1,
  pixelmatch: {
    // ...options for pixelmatch
  },
  screenshot: {
    // ...options for cy.screenshot()
  },
});
```
