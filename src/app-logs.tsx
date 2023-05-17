import React, { useCallback, useMemo, useState } from 'react'
import {
  ColorValue,
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  Text,
  TextInput,
  View,
} from 'react-native'
import JSONTree from 'react-native-json-tree'

import { Colors } from './constants'
import { ActionButton } from './section-quick-actions'
import styles from './styles'
import { Log, LogLevel, QaMenuProps } from './types'
import { copyToClipboard } from './utils'

export const AppLogs: React.FC<
  Pick<FlatListProps<Log>, 'data'> & Pick<QaMenuProps, 'styles' | 'errorColor' | 'warningColor'>
> = ({
  data,
  styles: propStyles = {},
  errorColor = Colors.error,
  warningColor = Colors.warning,
}) => {
  const [searchText, setSearchText] = useState('')

  const filteredLogs = useMemo(() => {
    if (data && searchText.length) {
      const lowercasedSearchText = searchText.toLowerCase()
      return data.filter(({ message }) => {
        if (typeof message === 'string') {
          return message.toLowerCase().includes(lowercasedSearchText)
        }
        if (typeof message === 'object') {
          return JSON.stringify(message).toLowerCase().includes(lowercasedSearchText)
        }
        return false
      })
    }
    return data
  }, [data, searchText])

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Log>) => {
      const { timestamp, level, message, optionalParams = {} } = item
      let textColor = level === LogLevel.error ? Colors.white : Colors.black

      let backgroundColor: ColorValue = Colors.white
      if (level === LogLevel.warn) {
        backgroundColor = warningColor
      } else if (level === LogLevel.error) {
        backgroundColor = errorColor
      }

      let params = optionalParams || {}
      if (Array.isArray(optionalParams)) {
        params = optionalParams.filter(p => {
          if (
            typeof p === 'string' &&
            (p.includes('rgb') || p.includes('rgba') || /^#[0-9A-F]{6}$/i.test(p))
          ) {
            textColor = p
            return false
          }
          return true
        })
      }

      const onCopyButtonPress = () => {
        let copiedMessage = message
        let copiedParams = params
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
            <Text
              style={[styles.logItemTimestamp, propStyles.logTimestampStyle, { color: textColor }]}
            >
              {`[${LogLevel[level].toUpperCase()}] `}
              {timestamp.format('h:mm:ss.SSS A')}
            </Text>
            <ActionButton
              style={[styles.logItemCopyButton, propStyles.logCopyButtonStyle]}
              title="Copy"
              onPress={onCopyButtonPress}
            />
          </View>
          {typeof message === 'string' && (
            <Text
              style={[styles.logItemMessageText, propStyles.logMessageStyle, { color: textColor }]}
            >
              {message.replaceAll('%c', '').trim()}
            </Text>
          )}
          {typeof message === 'object' && (
            <View style={styles.logItemMessageData}>
              <JSONTree data={message} hideRoot />
            </View>
          )}
          {Object.keys(params).length > 0 && <JSONTree data={params} hideRoot />}
        </View>
      )
    },
    [propStyles, errorColor, warningColor],
  )

  return (
    <>
      <TextInput
        style={styles.searchInput}
        allowFontScaling={false}
        placeholder="Search logs"
        clearButtonMode="while-editing"
        value={searchText}
        onChangeText={setSearchText}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FlatList
        keyExtractor={item => `${item.timestamp.valueOf()}_${Math.random()}`}
        data={filteredLogs}
        renderItem={renderItem}
      />
    </>
  )
}
