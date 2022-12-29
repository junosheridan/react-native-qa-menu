import React, { useCallback } from 'react'
import { FlatList, FlatListProps, ListRenderItemInfo, Text, View } from 'react-native'
import JSONTree from 'react-native-json-tree'

import { Colors } from './constants'
import { ActionButton } from './section-quick-actions'
import styles from './styles'
import { Log, LogLevel } from './types'
import { copyToClipboard } from './utils'

export const AppLogs: React.FC<Pick<FlatListProps<Log>, 'data'>> = ({ data = [] }) => {
  const renderItem = useCallback(({ item }: ListRenderItemInfo<Log>) => {
    const { timestamp, level, message, optionalParams = {} } = item
    const textColor = level === LogLevel.error ? Colors.white : Colors.black

    let backgroundColor = Colors.white
    if (level === LogLevel.warn) {
      backgroundColor = Colors.warning
    } else if (level === LogLevel.error) {
      backgroundColor = Colors.error
    }

    const onCopyButtonPress = () => {
      let copiedMessage = message
      let copiedParams = optionalParams
      if (message instanceof Error) {
        copiedMessage = message.message
        copiedParams = {
          cause: message.cause,
          stack: message.stack,
        }
      }
      copyToClipboard({ message: copiedMessage, params: copiedParams })
    }

    return (
      <View style={[styles.logItemContainer, { backgroundColor }]}>
        <View style={styles.row}>
          <Text style={[styles.logItemTimestamp, { color: textColor }]}>
            {timestamp.format('DD MMM YYYY | h:mm:ss.SSS A')}
          </Text>
          <ActionButton
            style={styles.logItemCopyButton}
            title="Copy to clipboard"
            onPress={onCopyButtonPress}
          />
        </View>
        {typeof message === 'string' && (
          <Text style={[styles.logItemMessageText, { color: textColor }]}>
            {message.replaceAll('%c', '').trim()}
          </Text>
        )}
        {typeof message === 'object' && (
          <View style={styles.logItemMessageData}>
            <JSONTree data={message} shouldExpandNode={() => false} />
          </View>
        )}
        {optionalParams && Object.keys(optionalParams).length > 0 && (
          <JSONTree data={optionalParams} shouldExpandNode={() => false} />
        )}
      </View>
    )
  }, [])

  return (
    <FlatList
      keyExtractor={item => `${item.timestamp.valueOf()}_${Math.random()}`}
      data={data}
      renderItem={renderItem}
    />
  )
}
