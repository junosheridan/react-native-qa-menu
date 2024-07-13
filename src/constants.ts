import { Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

export const Images = {
  emailSend: require('./assets/images/email-send.png'),
  goBack: require('./assets/images/go-back.png'),
  cancel: require('./assets/images/cancel.png'),
}

export const Metrics = {
  isIphone: Platform.OS === 'ios',

  screenWidth: width,
  screenHeight: height,
  draggableViewSize: 50,

  headerHeight: 44,
  buttonHeight: 40,

  tiny: 4,
  xxs: 8,
  xs: 12,
  small: 16,
  smedium: 18,
  medium: 20,
  large: 24,
  xl: 28,
  xxl: 32,
  huge: 48,
  massive: 64,

  iconSize: 24,

  borderRadiusXSmall: 2,
  borderRadiusSmall: 4,
  borderRadius: 6,
  borderRadiusMedium: 8,
  borderRadiusLarge: 10,
}

export const Colors = {
  white: 'white',
  black: 'black',
  gray: 'gray',
  lavender: 'lavender',

  midnightBlue: 'midnightblue',
  text: 'dimgrey',

  success: 'forestgreen',
  warning: 'lightgoldenrodyellow',
  error: 'crimson',
}

export const TestIDs = {
  modal: 'qa.menu.modal',
  modalContent: 'qa.menu.modalContent',
  keyboardAvoidingView: 'qa.menu.keyboardAvoidingView',
  scrollView: 'qa.menu.scrollView',
  header: {
    title: 'qa.menu.header.title',
    leftMenuItem: 'qa.menu.header.leftMenuItem',
    rightMenuItem: 'qa.menu.header.rightMenuItem',
  },
  quickActionButtons: {
    viewAppLog: 'qa.menu.action.viewAppLog',
  },
  sections: {
    appInfo: 'qa.menu.sections.appInfo',
    stateTree: 'qa.menu.sections.stateTree',
    quickAction: 'qa.menu.sections.quickAction',
  },
  appInfo: {
    deviceId: 'qa.menu.info.deviceId',
    bundleId: 'qa.menu.info.bundleId',
    buildNumber: 'qa.menu.info.buildNumber',
    osVersion: 'qa.menu.info.osVersion',
    appVersion: 'qa.menu.info.appVersion',
  },
}

export const MAXIMUM_LOGS_COUNT = 100
