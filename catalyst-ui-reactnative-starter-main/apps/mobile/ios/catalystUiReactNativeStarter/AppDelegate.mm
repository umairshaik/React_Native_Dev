#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

// react-native-lottie-splash-screen
#import "RNSplashScreen.h"

#if DEV
#import "catalystUiReactNativeStarter_Dev-Swift.h"
#else
#import "catalystUiReactNativeStarter-Swift.h"
#endif
// ---- ends here

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

  self.moduleName = @"catalystUiReactNativeStarter";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  // ----------- react-native-splash-screen
 BOOL success = [super application:application didFinishLaunchingWithOptions:launchOptions];
 
  if (success) {
    //This is where we will put the logic to get access to rootview
    UIView *rootView = self.window.rootViewController.view;
    
    rootView.backgroundColor = [UIColor whiteColor]; // change with your desired backgroundColor

    NSString *splashMode = @"lightSplash" ;

  if (UITraitCollection.currentTraitCollection.userInterfaceStyle == UIUserInterfaceStyleDark) {
    splashMode = @"darkSplash";
  }

    Dynamic *t = [Dynamic new];
    UIView *animationUIView = (UIView *)[t createAnimationViewWithRootView:rootView lottieName:splashMode]; // change lottieName to your lottie files name
 
  // register LottieSplashScreen to RNSplashScreen
  if (UITraitCollection.currentTraitCollection.userInterfaceStyle == UIUserInterfaceStyleLight) {
    animationUIView.backgroundColor = [UIColor whiteColor]; // change backgroundColor
  }else{
    animationUIView.backgroundColor = [UIColor colorWithRed: 0.05 green: 0.06 blue: 0.10 alpha: 1.00]; // change backgroundColor
  }
    // register LottieSplashScreen to RNSplashScreen
  [RNSplashScreen showLottieSplash:animationUIView inRootView:rootView];
    // casting UIView type to AnimationView type
    LottieAnimationView *animationView = (LottieAnimationView *) animationUIView;
    // play
    [t playWithAnimationView:animationView];
    // If you want the animation layout to be forced to remove when hide is called, use this code
    [RNSplashScreen setAnimationFinished:true];
  }
 
  return success;

  // ------------- ends here
}



- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  return true;
}

@end
