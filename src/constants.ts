import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export const Images = {
  emailSend: require('./assets/images/email-send.png'),
  goBack: require('./assets/images/go-back.png'),
  cancel: require('./assets/images/cancel.png'),
}

export const Metrics = {
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
  warning: 'gold',
  error: 'crimson',
}

export const MAXIMUM_LOGS_COUNT = 100
