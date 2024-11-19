package com.catalystuireactnativestarter;

import android.content.res.Configuration; // For Theme change
import android.os.Bundle; // #react-native-screens && react-native-splash-screen
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import org.devio.rn.splashscreen.SplashScreen; // react-native-splash-screen

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "catalystUiReactNativeStarter";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
      this,
      getMainComponentName(),
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
      // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
      DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
    );
  }

  // #react-native-screens
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    switch (getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK) {
      case Configuration.UI_MODE_NIGHT_YES:
        setTheme(R.style.DarkTheme);
        break;
      case Configuration.UI_MODE_NIGHT_NO:
        setTheme(R.style.LightTheme);
        break;
      default:
        setTheme(R.style.LightTheme);
    }
    SplashScreen.show(this, R.style.SplashScreenTheme,R.id.lottie); // here

    super.onCreate(null);
  }
}
