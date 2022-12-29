import type { Dayjs } from 'dayjs'
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
}

export enum ViewState {
  default,
  logs,
}

export interface QuickAction {
  title: string
  onPress: () => void
  closedOnPress?: boolean
}

export interface AppInfo {
  title: string
  description: string
}

export interface QaMenuProps extends Pick<IDraggableProps, 'isCircle'> {
  visible: boolean
  maxLogsCount?: number
  draggableDisplayText?: string
  draggableColor?: string
  draggableSize?: number
  draggableImageSource?: number
  quickActions?: QuickAction[]
  extraAppInfo?: AppInfo[]
  state?: any
}
