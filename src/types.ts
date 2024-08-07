import type { Dayjs } from 'dayjs'
import type { PropsWithChildren } from 'react'
import type { ColorValue, StyleProp, TextStyle, ViewStyle } from 'react-native'
import type { IDraggableProps } from 'react-native-draggable'

export enum LogLevel {
  log,
  debug,
  info,
  warn,
  error,
}

export interface Log {
  level: LogLevel
  message?: any | null
  optionalParams?: any[] | null
  timestamp: Dayjs
  id: string
}

export enum ViewState {
  default,
  logs,
}

export interface QuickAction {
  title: string
  onPress: () => void
  closedOnPress?: boolean
  testID?: string
}

export interface AppInfo {
  title: string
  description: string
  testID?: string
}

export interface QaMenuProps
  extends PropsWithChildren<Pick<IDraggableProps, 'isCircle' | 'x' | 'y'>> {
  visible: boolean
  maxLogsCount?: number
  logFilters?: string[]
  draggableDisplayText?: string
  draggableSize?: number
  quickActions?: QuickAction[]
  extraAppInfo?: AppInfo[]
  state?: any
  styles?: {
    headerTitleStyle?: StyleProp<TextStyle>
    sectionTitleStyle?: StyleProp<TextStyle>
    infoTitleStyle?: StyleProp<TextStyle>
    infoDescriptionStyle?: StyleProp<TextStyle>
    quickActionButtonStyle?: StyleProp<ViewStyle>
    quickActionButtonTitleStyle?: StyleProp<TextStyle>
    logTimestampStyle?: StyleProp<TextStyle>
    logCopyButtonStyle?: StyleProp<ViewStyle>
    logMessageStyle?: StyleProp<TextStyle>
  }
  errorColor?: ColorValue
  successColor?: ColorValue
  warningColor?: ColorValue
}

export interface QaMenuRefMethods {
  open: () => void
  close: () => void
}
