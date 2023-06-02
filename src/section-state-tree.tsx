import React from 'react'
import { Text, View } from 'react-native'

import JSONTree from './libs/react-native-json-tree'
import styles from './styles'
import type { QaMenuProps } from './types'

export const SectionStateTree: React.FC<Pick<QaMenuProps, 'state' | 'styles'>> = ({
  state,
  styles: propStyles = {},
}) => {
  if (!state) return null
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, propStyles.sectionTitleStyle]}>{'State Tree'}</Text>
      <View style={styles.sectionContent}>
        <JSONTree data={state} hideRoot />
      </View>
    </View>
  )
}
