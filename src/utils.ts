import Clipboard from '@react-native-clipboard/clipboard'
import { Vibration } from 'react-native'

export const copyToClipboard = (data: unknown) => {
  Clipboard.setString(JSON.stringify(data, null, 2))
  Vibration.vibrate([200, 200, 200])
}
