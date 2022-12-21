package com.qamenu

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

@ReactModule(name = QaMenuViewManager.NAME)
class QaMenuViewManager :
  QaMenuViewManagerSpec<QaMenuView>() {
  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): QaMenuView {
    return QaMenuView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: QaMenuView?, color: String?) {
    view?.setBackgroundColor(Color.parseColor(color))
  }

  companion object {
    const val NAME = "QaMenuView"
  }
}
