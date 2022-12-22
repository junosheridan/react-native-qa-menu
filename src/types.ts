import type { IDraggableProps } from 'react-native-draggable'

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
}
