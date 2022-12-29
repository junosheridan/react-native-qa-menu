import React from 'react'
import { Text, View } from 'react-native'
import JSONTree from 'react-native-json-tree'

import styles from './styles'
import type { QaMenuProps } from './types'

export const SectionStateTree: React.FC<Pick<QaMenuProps, 'states'>> = ({ states = [] }) => {
  if (!states.length) return null
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{'State Tree'}</Text>
      <View style={styles.sectionContent}>
        {states.map((state, index) => {
          return <JSONTree key={`state_${index}`} data={state} hideRoot />
        })}
      </View>
    </View>
  )
}
