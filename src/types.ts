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
  message: any
  date: Date
}

export enum ViewState {
  default,
  logs,
}

export interface MenuAction {
  title: string
  onPress: () => void
}

export interface AppInfo {
  title: string
  description: string
}

export interface QaMenuProps extends Pick<IDraggableProps, 'isCircle'> {
  visible: boolean
  draggableDisplayText?: string
  draggableColor?: string
  draggableSize?: number
  draggableImageSource?: number
  customActions?: MenuAction[]
  extraAppInfo?: AppInfo[]
  reduxState?: any
}
