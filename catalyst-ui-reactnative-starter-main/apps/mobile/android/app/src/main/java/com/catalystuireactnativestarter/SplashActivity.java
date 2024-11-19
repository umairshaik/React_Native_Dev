package com.catalystuireactnativestarter;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.splashscreen.SplashScreen;


public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState){
        // Handle the splash screen transition.
         SplashScreen splashScreen = SplashScreen.installSplashScreen(this);
        super.onCreate(savedInstanceState);

        // Intent intent = new Intent(this, MainActivity.class);
        // startActivity(intent);
        // finish();
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);

        // remove this activity from the stack
        finish();
    }
}
