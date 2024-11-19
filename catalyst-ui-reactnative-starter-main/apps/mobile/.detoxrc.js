/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      $0: 'jest',
      config: 'e2e/jest.config.js',
    },
    jest: {
      setupTimeout: 120000,
    },
  },
  artifacts: {
    rootDir: './e2e/artifacts/',
    plugins: {
      instruments: {enabled: false},
      log: {enabled: true},
      // uiHierarchy: 'enabled',
      screenshot: {
        shouldTakeAutomaticSnapshots: true,
        keepOnlyFailedTestsArtifacts: true,
        takeWhen: {
          testStart: false,
          testDone: true,
        },
      },
    },
  },
  apps: {
    'development.ios.debug': {
      type: 'ios.app',
      binaryPath:
        'ios/build/Build/Products/Dev.Debug-iphonesimulator/catalystUiReactNativeStarter Dev.app',
      build:
        'xcodebuild -workspace ios/catalystUiReactNativeStarter.xcworkspace -scheme DevCatalystUiReactNativeStarter -configuration Dev.Debug -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'development.ios.release': {
      type: 'ios.app',
      binaryPath:
        'ios/build/Build/Products/Dev.Release-iphonesimulator/catalystUiReactNativeStarter Dev.app',
      build:
        'xcodebuild -workspace ios/catalystUiReactNativeStarter.xcworkspace -scheme DevCatalystUiReactNativeStarter -configuration Dev.Release -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'production.ios.debug': {
      type: 'ios.app',
      binaryPath:
        'ios/build/Build/Products/Debug-iphonesimulator/catalystUiReactNativeStarter.app',
      build:
        'xcodebuild -workspace ios/catalystUiReactNativeStarter.xcworkspace -scheme catalystUiReactNativeStarter -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'production.ios.release': {
      type: 'ios.app',
      binaryPath:
        'ios/build/Build/Products/Release-iphonesimulator/catalystUiReactNativeStarter.app',
      build:
        'xcodebuild -workspace ios/catalystUiReactNativeStarter.xcworkspace -scheme catalystUiReactNativeStarter -configuration Release -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'development.android.debug': {
      type: 'android.apk',
      binaryPath:
        'android/app/build/outputs/apk/development/debug/app-development-debug.apk',
      build:
        'cd android ; ./gradlew assembleDevelopmentDebug assembleDevelopmentDebugAndroidTest -DtestBuildType=debug ; cd -',
      reversePorts: [8081],
    },
    'development.android.release': {
      type: 'android.apk',
      binaryPath:
        'android/app/build/outputs/apk/development/release/app-development-release.apk',
      build:
        'cd android ; ./gradlew assembleDevelopmentRelease assembleDevelopmentReleaseAndroidTest -DtestBuildType=release ; cd -',
    },
    'production.android.debug': {
      type: 'android.apk',
      binaryPath:
        'android/app/build/outputs/apk/production/debug/app-production-debug.apk',
      build:
        'cd android ; ./gradlew assembleProductionDebug assembleProductionDebugAndroidTest -DtestBuildType=debug ; cd -',
      reversePorts: [8081],
    },
    'production.android.release': {
      type: 'android.apk',
      binaryPath:
        'android/app/build/outputs/apk/production/release/app-production-release.apk',
      build:
        'cd android ; ./gradlew assembleProductionRelease assembleProductionReleaseAndroidTest -DtestBuildType=release ; cd -',
    },
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 13',
      },
    },
    attached: {
      type: 'android.attached',
      device: {
        adbName: '.*',
      },
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_6_API_31',
      },
    },
  },
  configurations: {
    'ios.sim.debug': {
      device: 'simulator',
      app: 'development.ios.debug',
    },
    'ios.sim.release': {
      device: 'simulator',
      app: 'production.ios.release',
    },
    'android.att.debug': {
      device: 'attached',
      app: 'development.android.debug',
    },
    'android.att.release': {
      device: 'attached',
      app: 'production.android.release',
    },
    'android.emu.debug': {
      device: 'emulator',
      app: 'development.android.debug',
    },
    'android.emu.release': {
      device: 'emulator',
      app: 'production.android.release',
    },
  },
};
