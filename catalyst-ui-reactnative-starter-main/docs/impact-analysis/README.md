# Impact Analysis

- [Overview](#overview)
- [Android](#android)
- [iOS](#ios)
- [Dependencies](#dependencies)
- [New Architecture](#new-architecture)

## Overview

An impact analysis was performed to evaluate the potential implications of upgrading React Native from 0.69.7 to 0.71.7. According to the findings, the upgrade would offer various enhancements and new features, including improved performance and bug fixes. However, it was also found that some of the existing code may need to be modified to be compatible with the new version. There were several changes to the API and libraries in particular that may necessitate upgrading dependencies and modifying custom components. Furthermore, some third-party packages and libraries may not be compatible with the new version, necessitating the search for alternative solutions or updates.

For the version upgrade, we basically followed the methods outlined in the[ react native](https://reactnative.dev/docs/upgrading#upgrade-helper ' react native') documentation.

Apart from that, we have also faced some issues in the _native layers_ (both android and iOS) and also in dependencies. A detailed documentation of that are given below.

## Android

In the perspective of Android we have faced some challenges in upgrading the version of react native.

- From React Native 0.70.x the `--no-jetifier` flag has been [removed](https://github.com/react-native-community/cli/pull/1662 'removed').
- In package.json file for the `android` script the `variant` flag has been renamed to `mode`

## iOS

In the perspective of iOS we have faced some challenges in upgrading the version of react native.

- The previous flipper version **0.125.0** is [incompatible](https://github.com/facebook/flipper/issues/4278 'incompatible') with react native 0.71.x so want to upgrade it to **0.163.0**.

```
:flipper_configuration => FlipperConfiguration.enabled(["Dev.Debug", "Dev.Release"], {'Flipper' => '0.163.0'}),
```

- In package.json file for the `ios` script the `configuration` flag has been renamed to `mode`

- In the **post-install** script of `podfile` , an error may occur due to package location of the **node_modules** to solve this do the following step below:

Add `react_native_path` argument to `react_native_post_install` script

```shell

   react_native_post_install(
      installer,
      react_native_path = "../../../node_modules/react-native",
      :mac_catalyst_enabled => false
    )
```

## Dependencies

In the dependencies side there are some libraries that needs to be upgraded to support the latest version(0.71.7) of react native.

- [Splash screen](https://github.com/HwangTaehyun/react-native-lottie-splash-screen#readme 'Splash screen') was not working as expected when we upgrade the [lottie-ios](https://github.com/airbnb/lottie-ios#readme 'lottie-ios') package from 3.x.x to 4.x.x.

- [React native safe area context](https://github.com/th3rdwave/react-native-safe-area-context#readme 'React native safe area context') library needs to be updated to the **4.5.x** version to support the latest version of react-native.

- And mostly for e2e testing we are using [detox](https://github.com/wix/Detox#readme 'detox') when we upgrade to 20.7.0, we were facing issues in android but it was fine with iOS.

  - The errors we were getting are:

    ```
    - DetoxRuntimeError: Test Failed: No static method arrayListOf([Ljava/lang/Object;)Ljava/util/ArrayList; in class Lu8/n; or its super classes.
    - java.lang.NoSuchMethodError: No virtual method retryOnConnectionFailure

    ```

  - Due to some restrictions in proguard file, want to add these lines in `android/app/proguard-rules.pro` and it is mentioned in the below links.

  - [DetoxRuntimeError](https://github.com/wix/Detox/issues/3365 'DetoxRuntimeError')
  - [NoSuchMethodError](https://stackoverflow.com/questions/70448003/java-lang-nosuchmethoderror-no-virtual-method-retryonconnectionfailure-error-wh 'NoSuchMethodError')

  ```
  -keep class okhttp3.** { *; }
  -keep interface okhttp3.** { *; }
  -dontwarn okhttp3.**
  -keep class kotlin.collections.** { *; }
  ```

- After migrating to latest version of[ RTL library (12.x.x)](https://github.com/callstack/react-native-testing-library ' RTL library (12.x.x)') some of the components has been deprecated/removed. To know about the migration of RTL library click [here](https://callstack.github.io/react-native-testing-library/docs/migration-v12 'here')

- For `lottie-ios` while upgrading its version to 4.1.3, it was observed that AnimationView is deprecated ,instead [LottieAnimationView](https://github.com/airbnb/lottie-ios/issues/1891) is getting used so change all the instances to the latter (in AppDelegate.mm and Dynamic.swift for our case) 

## New Architecture

If you want to enable the new architecture , do the following

- In Android change the boolean value from **false** to **true** of `newArchEnabled` in `android/gradle.properties`

- In iOS, run the following command inside `ios` folder
  `RCT_NEW_ARCH_ENABLED=1 pod install` or add a script command in **package.json** like `cd ios && RCT_NEW_ARCH_ENABLED=1 pod install` (currently we have added like _pod_install_new_arch_)

- To support the new Arch want to update the following libraries to its latest version
  `React native screens`
  
- **Note that [react18 features](https://react.dev/blog/2022/03/29/react-v18) are not supported if the new-architecture is not enabled.**

**Note**:
⚠️ [react native safe area context](https://github.com/th3rdwave/react-native-safe-area-context#new-architecture-support 'react native safe area context') and [detox](https://github.com/wix/Detox/issues/3949#issuecomment-1514241968 'detox') are not supporting the new architecture so if you want to enable the new architecture for e2e it may get failed and for safe area context also.


