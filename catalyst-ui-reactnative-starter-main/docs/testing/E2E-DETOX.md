# E2E Testing

- [E2E Testing](#E2E-testing)

  - [End to end testing in Mobile Applications](#end-to-end-testing-in-mobile-applications)
  - [Detox v/s Appium](#detox-vs-appium---automated-ui-tests-in-react-native)
  - [Detox Testing Framework](#detox-testing-framework)
  - [Project setup and Configurations](#project-setup-and-configurations)
  - [Running on CI]()

## End-to-end testing in mobile applications

The process of testing mobile applications is actually quite similar to web applications. Let’s go through the steps:

1. Create an instance of an emulator on an Android or iOS device
2. Install the application
3. Initialize the application
4. Executing routines
5. Expecting events

## Detox v/s Appium - automated UI tests in React Native

| Appium                                                                                                                                                   | Detox                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| wider API capabilities                                                                                                                                   | Capabilities are not wide as Appium                                                     |
| supports multiple languages for scripting test case, like Java, java script, python, Ruby, etc.                                                          | JavaScript focused.                                                                     |
| Black box testing (tests doesn’t know about internal process)                                                                                            | Gray box testing (there’s connection between tests and internal processes).             |
| Works out of sync with the app. Flaky, even more flaky on react native.                                                                                  | Works in sync with the app. Not so flaky.                                               |
| Delay in feedback                                                                                                                                        | Fast feedback                                                                           |
| Appium will be slower because of manual “sleep” commands                                                                                                 | Detox in this case wins as it automatically continues action as soon as one is finished |
| Integrates with paid services like Sauce Labs, Browserstack that provide real physical devices of a wide variety of models available online for testing. | More limited integration with physical devices and test lab services like Sauce Labs    |

    Appium can be used for detection — detox can be used as prevention tool

Read More : [Detox vs. Appium: automated UI tests in React Native
](https://medium.com/reactive-hub/detox-vs-appium-ui-tests-in-react-native-2d07bf1e244f)

## Detox Testing Framework

Wix’s Detox works similar way as Appium but important difference here is a Gray box testing. One of the reason why Detox was born is to solve “flakiness” problem — it will wait until action in app is finished and will continue only when app is idle.

Features :

1. Protractor like API, written in JavaScript.
2. Minimal boilerplate, and very small configuration process.
3. Cross platform: Test code is unaware of the platform it tests it can be shared between platforms.
4. Synchronized: no need to manually sync test with the app, Detox is inherently synchronized, it will execute its commands only when the app is idle, no more sleeps!
5. Debuggable: Using native constructs such as modern async-await instead of putting everything in a promise queue means that breakpoints will work as expected.
6. Detox does not rely on WebDriver, since this is not the web. Detox communicates with its native driver (which extends EarlGrey and Espresso) using a JSON-based reflection mechanism, this allows a common JavaScript implementation to invoke native methods directly on the device.

Good reads:

- [Detox - Official Documentation](https://wix.github.io/Detox/docs/introduction/getting-started)
- [React native testing docs](https://reactnativetesting.io/e2e/intro)
- [Detox: Gray Box End to End Testing Framework for Mobile Apps by @rotemmiz](https://hackernoon.com/detox-gray-box-end-to-end-testing-framework-for-mobile-apps-196ccd9564ce)

## Project setup and Configurations

Refer [documentation](https://wix.github.io/Detox/docs/introduction/project-setup) for more details

- Detox Prerequisites
  - Command Line Tools (detox-cli)
  ```
  yarn global add detox-cli
  ```
  - [MacOS Only] applesimutils - This tool is required by Detox to work with iOS simulators
  ```
  brew tap wix/brew
  brew install applesimutils
  ```
- Add jest and detox dependencies
  - Add jest's recommended version for detox : `yarn add "jest@^29" --dev`
  - Add detox as dev dependency: `yarn add detox --dev`
- Initialize Detox in your project:

```
  detox init

  This will generate following files
  .detoxrc.js – Detox config file
  e2e/jest.config.js – Jest configuration
  e2e/starter.test.js – dummy first test

```

- Update `.detoxrc.js` file with [App onfig](https://wix.github.io/Detox/docs/introduction/project-setup#step-2-app-configs) and [Device configs](https://wix.github.io/Detox/docs/introduction/project-setup#step-3-device-configs)

- Additional Android configuration

  Assuming you have a regular React Native project, these are the files you normally would need to patch or create if they are missing:

  ```
  - Build scripts:
      android/build.gradle
      android/app/build.gradle
  - Native test code:
      android/app/src/androidTest/java/com/<your.package>/DetoxTest.java
  - Manifests:
      android/app/src/main/AndroidManifest.xml
      android/app/src/main/res/xml/network_security_config.xml
  - Adding an auxiliary Android test
  - Enabling unencrypted traffic for Detox
  ```

  Please refer to the code commented with `//detox` in starter kit. or follow the steps mentioned in [android setup](https://wix.github.io/Detox/docs/introduction/project-setup#step-4-additional-android-configuration)

      \* Make sure to add correct progaurd file path for detox (We faced issue for android release app) - you need to exempt some of native code from ProGuard minification.

- Build the app with correct cofiguration from your./detoxrc file

```
detox build --configuration ios.sim.debug
```

- Running the detox tests

  For Debug configuration first start the metro server and then you can run the tests with

  ```
  yarn start
  detox test --configuration ios.sim.debug
  ```

  For release configuration run the tests directly `detox test --configuration ios.sim.release`
