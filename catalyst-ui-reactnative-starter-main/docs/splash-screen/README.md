# Splash Screen

- [Splash Screen](#splash-screen)
  - [Overview](#overview)
  - [Static](#static)
  - [Animated](#animated)

## Overview

There are two types of splash screen, Static and Animated. For static splash screen we can use [react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen#readme) and for Animated splash screen we can use [react-native-lottie-splash-screen](https://github.com/HwangTaehyun/react-native-lottie-splash-screen#readme).

## Static

For setup we can simply follow the instructions given in the library [doc](https://github.com/crazycodeboy/react-native-splash-screen#readme).

Some additiona setup need to be done for supporting system themes in splash screen. There are few ways of doing this,

### Android

If we have a image as an splash screen then we can simply add another drawable folder with `drawable-night` name and we can place dark version of that image there, android will take care of rest.
But if we are using custom splash screen which having some color variables and those variables need to be changed according to theme then [this](https://brainsandbeards.com/blog/how-to-add-a-dark-mode-splash-screen-to-a-react-native-app) article will help.

#### for Android version 12 and higher

A new approach was introduced for the android version 12 and higher devices for splash screen ,but , we can migrate the existing one to the aforementioned version, the following are the steps that were made to accommadate the changes -

   1. In `android/app/build.gradle` we added another dependency `implementation 'androidx.core:core-splashscreen:1.0.0-beta02'`.
   2. Add another style in styles.xml 
         ```
          <style name="ThemeApp" parent="Theme.SplashScreen">
               <item name="windowSplashScreenAnimatedIcon" > @drawable/background_splash</item>
               <item name="windowSplashScreenAnimationDuration">200</item>
               <item name="postSplashScreenTheme">@style/AppTheme</item>
           </style> 
   3.Add an import in the SplashActivity.java , ` import androidx.core.splashscreen.SplashScreen`,and in onCreate method, add this line at the top `SplashScreen splashScreen = SplashScreen.installSplashScreen(this); `

### iOS

In iOS we can have theme based assets. During addition of any image asset in x-code, we can mention `Any, Dark` in `Appearances` option in image set so whenever that image set is used in launchscreen it will be according to theme only.

## Animated

For setup we can simply follow the instructions given in the library [doc](https://github.com/HwangTaehyun/react-native-lottie-splash-screen#readme).

Steps to add custom theme in `react-native-lottie-splash-screen` in android(needed to modify or hide status bar, navigation bar etc)

`MainActivity.java`

```
SplashScreen.show(this, R.style.SplashTheme, R.id.lottie); // Create and Pass the theme(SplashTheme here) as a second parameter to Splashscreen.show function
```

`res/values/styles.xml`

```
<style name="SplashTheme" parent="SplashScreen_Fullscreen"> // SplashScreen_Fullscreen is defined inside the libraries styles
  <item name="android:windowTranslucentStatus">true</item>
  <item name="android:windowLayoutInDisplayCutoutMode">shortEdges</item> // for notch screens
  <item name="android:statusBarColor">
    @android:color/transparent
  </item>
</style>
```
