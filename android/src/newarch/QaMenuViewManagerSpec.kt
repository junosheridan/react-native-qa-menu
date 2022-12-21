package com.qamenu

import android.view.View

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.QaMenuViewManagerDelegate
import com.facebook.react.viewmanagers.QaMenuViewManagerInterface

abstract class QaMenuViewManagerSpec<T : View> : SimpleViewManager<T>(), QaMenuViewManagerInterface<T> {
  private val mDelegate: ViewManagerDelegate<T>

  init {
    mDelegate = QaMenuViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<T>? {
    return mDelegate
  }
}
