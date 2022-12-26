import React, { useCallback } from 'react'
import { FlatList, FlatListProps, ListRenderItemInfo, Text, View } from 'react-native'
import JSONTree from 'react-native-json-tree'
import { Colors } from './constants'
import styles from './styles'
import { Log, LogLevel } from './types'

export const AppLogs: React.FC<Pick<FlatListProps<Log>, 'data'>> = ({ data = [] }) => {
  const renderItem = useCallback(({ item }: ListRenderItemInfo<Log>) => {
    const { timestamp, level, message, optionalParams } = item
    const textColor = level === LogLevel.error ? Colors.white : Colors.black

    let backgroundColor = Colors.white
    if (level === LogLevel.warn) {
      backgroundColor = Colors.warning
    } else if (level === LogLevel.error) {
      backgroundColor = Colors.error
    }

    return (
      <View style={[styles.logItemContainer, { backgroundColor }]}>
        <Text style={[styles.infoTitle, { color: textColor }]}>
          {timestamp.format('h:mm:ss.SSS A')}
        </Text>
        {message && <Text style={[styles.logItemMessage, { color: textColor }]}>{message}</Text>}
        {optionalParams?.map((p, index) => {
          return <JSONTree key={`${index}_${Math.random()}`} data={p} hideRoot />
        })}
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
