# Monorepo

- [Monorepo](#monorepo)
  - [Overview](#overview)
  - [no-hoist or hoist?](#no-hoist-or-hoist)
  - [Challenges in RN for hoisting](#challenges-in-rn-for-hoisting)

## Overview

Monorepos, or "monolithic repositories", are single repositories containing multiple apps or packages. It can help speed up development for larger projects, makes it easier to share code, and act as a single source of truth.
But it also adds more complexity, and often requires specific tooling configuration.

Before we continue with Monorepos, we need to understand some mechanisms/configurations in package managers like hoist, no-hoist, workspaces etc. Below are some links of articles or blogs for give you context over these tools or their configurations:

Workspaces- [Workspaces in Yarn](https://classic.yarnpkg.com/blog/2017/08/02/introducing-workspaces/) (Can skip Lerna Part)
Hoist, [no-hoist - nohoist in Workspaces | Yarn Blog](https://classic.yarnpkg.com/blog/2018/02/15/nohoist/)

## no-hoist or hoist?

There are some pros and cons of both approaches. If we go with `no-hoist` approach then your package manager(yarn or npm) will take more time to install all dependencies for your monorepo because duplication of dependencies is there and on other side if we use hoisting approach then we can avoid that extra time of installation by package manager but it will mistakenly letting you access all dependencies as your own. For more details on hoisting types and limits in yarn berry you can refer to [this](https://dev.to/arcanis/yarn-2-3-info-command-detailed-options-nohoist-409h) blog.

> Note: In this RN starter kit we are using hoisted workspaces

## Challenges in RN for hoisting

1.  In React Native, metro is used as a javascript bundler and by default metro is not supporting monorepo architechure, So we need to change some configuration to support monorepo architechure in metro.

    ```
    /**
     * Metro configuration for React Native
     * https://github.com/facebook/react-native
     *
     * @format
     */

    const path = require('path');

    const projectRoot = __dirname;
    const workspaceRoot = path.resolve(projectRoot, '../..');
    const monorepoPackages = path.resolve(workspaceRoot, 'packages');

    const projectNodeModules = path.resolve(projectRoot, 'node_modules');

    const nodeModulesPaths = [path.resolve(workspaceRoot, 'node_modules')];

    // project specific node_modules folder might be not there if all dependencies are already hoisted
    // that's why we need to check if there are any node_modules folder present in project directory
    if (fs.existsSync(projectNodeModules)) {
      nodeModulesPaths.push(projectNodeModules);
    }
    const config = {
      transformer: {
        getTransformOptions: async () => ({
          transform: {
            experimentalImportSupport: false,
            inlineRequires: true,
          },
        }),
      },
      watchFolders: [__dirname, ...nodeModulesPaths, monorepoPackages] // <-- We need to tell metro to watch this folders for monorepo
    };

    module.exports = config;

    ```

2.  As we are using [yarn berry](https://yarnpkg.com) and after yarn v2 they removed the support for `nohoist` glob pattern. so now every dependency will hoist to root which include `react-native` as well. In react native there are some places in native files where relative path of `react-native` node module are hardcoded to something like:

    **Android:**

    ```
    apply from: "../../node_modules/react-native/react.gradle"
    ```

    **iOS:**

    ```
    require_relative '../node_modules/react-native/scripts/react_native_pods'
    ```

    So if we go with hoisted workspaces then this path will become invalid in that case because now `node_modules` are shifted to root

    We can avoid this issue by using Node to find the location of the package instead of hardcoding these relative paths:

    **Android:**

    ```
    apply from: new File(["node", "--print", "require.resolve('react-native/package.json')"].execute(null, rootDir).text.trim(), "../react.gradle")
    ```

    **iOS:**

    ```
    require File.join(File.dirname(`node --print "require.resolve('react-native/package.json')"`), "scripts/react_native_pods")
    ```

3.  After doing all of these changes you can try running `yarn workspaces mobile ios` or `yarn workspaces mobile android`, you will see that build will succefully completed but it will give error while metro start building up the project with an error `Error: unable to resolve module ./index`, if you run metro manually with `yarn workspace mobile start` then it will work fine.

    Problem here is with the `packager.sh` script which react native internally using to launch metro form project root which is monorepo root if react native triggering it and `apps/mobile` if we are triggering it with `yarn workspace mobile start`. That's why its showing `Error: unable to resolve module ./index` because index file is present in our `apps/mobile` folder not in monorepo root.

    **Fix:** For fixing this issue we have added a patch for `react-native/scripts/packer.sh` file in which we have overrode the `PROJECT_ROOT` variable to have our React-native app directory path, So the metro can be launched from that path only.

    from:

    ```
    PROJECT_ROOT="$THIS_DIR/../../.."
    ```

    to:

    ```
    PROJECT_ROOT="$THIS_DIR/../../../apps/mobile"
    ```

4.  The last thing we need to is with [Jetifier](https://github.com/mikehardy/jetifier). As our app is using [React Native CLI](https://github.com/react-native-community/cli) and this CLI internally using [Jetifier](https://github.com/mikehardy/jetifier) as AndroidX transition tool, So whenever we execute React Native CLI command it will run jetifier first to convert native modules code to AndroidX.

    **Problem**: By default Jetifier will try to find `node_modules` folder inside your React Native App and it should be but if we have hoisting enabled then may be our all dependencies are already hoisted to root and `node_modules` folder will not be generated inside your App folder. In that case Jetifier will give you below error

    ```
    Error: ENOENT: no such file or directory, scandir 'node_modules'
    at readdirSync (node:fs:1390:3)
    at readDir (/catalystUiReactNativeStarter/node_modules/jetifier/src/utils.js:14:17)

    // ...

    error Failed to run jetifier.
    ```

    **Solution**:

    We can add Jetifier explicitly as a dependency in our monorepo's root `package.json` and then add jetify command in `postinstall` script.

        `package.json`

        ```
        "scripts":{
          "postinstall": "yarn jetify",
          "jetify": "jetify"
          ...
        },
        devDependencies:{
          "jetifier": "2.0.0",
          ...
        }

        ```

    Detailed discussion on this issue: [Jetifier issue](https://github.com/mikehardy/jetifier/issues/36)
