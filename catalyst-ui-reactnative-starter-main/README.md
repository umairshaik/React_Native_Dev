# ReactNative starter kit

![Status](https://github.com/Regional-IT-India/getting-started/blob/main/badges/stable.svg)

ReactNative starter kit incorporating sensible defaults for mobile app project

## Table Of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Upcoming Features](#upcoming-features)
- [Quick start](#quick-start)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Tips](#tips)
- [Documentation](#documentation)
- [Architecture Decision Record](#adr)
- [Impact Analysis](#impact-analysis)

## Introduction

- React native catalyst is an opinionated code structure along with recommended coding practices to spread common pattern and practices followed in the community.
- A decent local dev set up, CI/CD setup and detailed documentation for all the features.
- Ready to use dev and prod environments setup.

## Features

1. Monorepo
2. Yarn v3
3. Hoisted worksapces
4. Typescript Support
5. Tools
   1. Es-Lint
   2. Prettier
   3. Jest
   4. Editor config
   5. Commitizen
   6. Husky
   7. Talisman
6. Testing
7. Storage layer
8. Network layer (supports HTTP request aborts)
9. Routing
10. Localisation
11. Styled component
12. Context API
13. Environment based setup
14. CI/CD for android and iOS
    1. Github Actions
    2. Deployment
    3. Build Optimisation (iOS)
15. Animated Splash Screen
16. E2E Testing using Detox

## Upcoming features

1. SSL Pinning
2. Crashlytics
3. Universal links support
4. Feature Toggle

## Quick Start

### Prerequisites

- Node JS >= 16.10
- Xcode - 13.4, iOS 15
- Cocoapods
- JDK >= 11
- Android Studio and Android SDK(21-31)

Refer [React Native environment setup](https://reactnative.dev/docs/environment-setup) to setup all prerequisites (select `React Native CLI Quickstart` tab and follow instructions according to your OS)

If in case you face any issues please refer [troubleshooting.md](./TROUBLESHOOTING.md)

### Setup

1. For NEO users download the repo using `Download source code` button on top right.

2. Users will have to create their own project for android and ios in firebase with

   - **packageName** for android - `com.catalystuireactnativestarter.dev`
   - **bundleId** for iOS - `org.reactjs.native.example.catalystUiReactNativeStarter-Dev`

3. Add the `google-services.json` file in `apps/mobile/android/app`,and add the ` GoogleService-Info.plist` file in `apps/mobile/ios`.

- Run `yarn install` to install all the dependencies required to bootstrap the project.
- Run `yarn workspace mock-server start` to start mounte bank server.
- Run `yarn workspace mobile android` to build and run app on android simulator.
- Run `yarn workspace mobile ios` to build and run app on ios simulator.

4. Credentials for login:

- Username - mountebankuser
- Password - mounte@123

> **Note for using different App Name** : To change the app-name to your app-name, follow the [AppName documentation](docs/app-name/README.md)

> **Note for IOS** : Need to install pods for ios as we are using cocaopods. `cd apps/mobile/ios`, then run `pod install`

> **Note for mounte bank server** : For mounte bank connectivity on Android, you have to change the IP Address in the config.ts file in the `packages/network/src` directory to 10.0.2.2, and on iOS, you have to replace it with your IP address. Just check your IP address with `ipconfig getifaddr en0` and use that address in config.ts file for iOS.

### Tips

- Add `Prettier` extension and set it as default formatter and enable `Run on save` option
- Also install `ESLint` extension for code analysis.
- Add `Jest Runner` extension for ease of running test cases

## Documentation

- [Folder Structure](docs/folder-structure/README.md)
- [Monorepo](docs/monorepo/README.md)
- [Testing](docs/testing/README.md)
- [CI/CD]()
  - [Continous Integration](docs/cicd/CI.md)
  - [CD for IOS](docs/cicd/CD-IOS.md)
  - [CD for android](docs/cicd/CD-ANDROID.md)
- [Config management](docs/config/README.md)
- [Styling](docs/styling/README.md)
- [Tools](docs/tools/README.md)
- [Spinner](docs/spinner/README.md)
- [Typescript](docs/typescript/README.md)
- [Storage](docs/storage/README.md)

## ADR

Please refer [decisions](docs/decisions/) folder to learn more about our tech choices and more detailed comparisions.

## Impact Analysis

If you are using react native **0.69.7** and want to update to **0.71.7**, an analysis has been done and can be found [here](docs/impact-analysis/README.md 'here').
