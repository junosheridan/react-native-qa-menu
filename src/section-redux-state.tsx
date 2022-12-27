import React, { useMemo } from 'react'
import { Text, View } from 'react-native'
import JSONTree from 'react-native-json-tree'

import styles from './styles'
import type { QaMenuProps } from './types'

export const SectionReduxState: React.FC<Pick<QaMenuProps, 'reduxState'>> = ({ reduxState }) => {
  const jsonTreeData = useMemo(
    () => (reduxState ? JSON.parse(JSON.stringify(reduxState)) : null),
    [reduxState],
  )
  if (!reduxState) return null
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{'Redux State'}</Text>
      <View style={styles.sectionContent}>
        <JSONTree data={jsonTreeData} hideRoot />
      </View>
    </View>
  )
}
