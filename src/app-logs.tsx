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
  Pick<FlatListProps<Log>, 'data' | 'onRefresh'> &
    Pick<QaMenuProps, 'styles' | 'errorColor' | 'warningColor'>
> = ({
  data: logs,
  onRefresh,
  styles: propStyles = {},
  errorColor = Colors.error,
  warningColor = Colors.warning,
}) => {
  const [searchText, setSearchText] = useState('')
  const [paramsExpandingNodes, setParamsExpandingNodes] = useState<{ [id: string]: any }>({})
  const [messageExpandingNodes, setMessageExpandingNodes] = useState<{ [id: string]: any }>({})

  const filteredLogs = useMemo(() => {
    if (logs && searchText.length) {
      const lowercasedSearchText = searchText.toLowerCase()
      return logs.filter(({ message }) => {
        if (typeof message === 'string') {
          return message.toLowerCase().includes(lowercasedSearchText)
        }
        if (typeof message === 'object') {
          return JSON.stringify(message).toLowerCase().includes(lowercasedSearchText)
        }
        return false
      })
    }
    return logs
  }, [logs, searchText])

  const shouldMessageExpandNode = useCallback(
    (item: Log) => (keyPath: string[], data: unknown, level: number) => {
      const expandingNode = messageExpandingNodes[item.id]
      if (
        expandingNode &&
        JSON.stringify({ keyPath, data, level }) === JSON.stringify(expandingNode)
      ) {
        return expandingNode.expanded
      }
      return false
    },
    [messageExpandingNodes],
  )

  const shouldParamsExpandNode = useCallback(
    (item: Log) => (keyPath: string[], data: unknown, level: number) => {
      const expandingNode = paramsExpandingNodes[item.id]
      if (
        expandingNode &&
        JSON.stringify({ keyPath, data, level }) === JSON.stringify(expandingNode)
      ) {
        return expandingNode.expanded
      }
      return false
    },
    [paramsExpandingNodes],
  )

  const onMessageNodeExpanded = useCallback(
    (item: Log) => (expanded: boolean, keyPath: string[], data: unknown, level: number) => {
      setMessageExpandingNodes(prev => ({
        ...prev,
        [item.id]: { keyPath, data, level, expanded },
      }))
    },
    [],
  )

  const onParamsNodeExpanded = useCallback(
    (item: Log) => (expanded: boolean, keyPath: string[], data: unknown, level: number) => {
      setParamsExpandingNodes(prev => ({
        ...prev,
        [item.id]: { keyPath, data, level, expanded },
      }))
    },
    [],
  )

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Log>) => {
      const { timestamp, level: logLevel, message, optionalParams = {} } = item
      let textColor = logLevel === LogLevel.error ? Colors.white : Colors.black

      let backgroundColor: ColorValue = Colors.white
      if (logLevel === LogLevel.warn) {
        backgroundColor = warningColor
      } else if (logLevel === LogLevel.error) {
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
              {`[${LogLevel[logLevel].toUpperCase()}] `}
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
              <JSONTree
                hideRoot
                data={message}
                shouldExpandNode={shouldMessageExpandNode(item)}
                onNodeExpanded={onMessageNodeExpanded(item)}
              />
            </View>
          )}
          {Object.keys(params).length > 0 && (
            <JSONTree
              hideRoot
              data={params}
              shouldExpandNode={shouldParamsExpandNode(item)}
              onNodeExpanded={onParamsNodeExpanded(item)}
            />
          )}
        </View>
      )
    },
    [
      propStyles,
      errorColor,
      warningColor,
      shouldMessageExpandNode,
      shouldParamsExpandNode,
      onMessageNodeExpanded,
      onParamsNodeExpanded,
    ],
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
        refreshing={false}
        keyExtractor={item => item.id}
        data={filteredLogs}
        renderItem={renderItem}
        onRefresh={onRefresh}
      />
    </>
  )
}
