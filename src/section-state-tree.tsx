import React from 'react'
import { Text, View } from 'react-native'
import JSONTree from 'react-native-json-tree'

import styles from './styles'
import type { QaMenuProps } from './types'

export const SectionStateTree: React.FC<Pick<QaMenuProps, 'state'>> = ({ state }) => {
  if (!state) return null
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{'State Tree'}</Text>
      <View style={styles.sectionContent}>
        <JSONTree data={state} hideRoot />
      </View>
    </View>
  )
}
