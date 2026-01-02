package com.matzip

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.os.Bundle

class MainActivity : ReactActivity() {
  override fun getMainComponentName(): String = "matzip"

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)  // savedInstanceState 대신 null 전달
  }

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}