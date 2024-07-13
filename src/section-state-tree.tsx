import React from 'react'
import { Text, View } from 'react-native'
import JSONTree from 'react-native-json-tree'

import { TestIDs } from './constants'
import styles from './styles'
import type { QaMenuProps } from './types'

export const SectionStateTree: React.FC<Pick<QaMenuProps, 'state' | 'styles'>> = ({
  state,
  styles: propStyles = {},
}) => {
  if (!state) return null
  return (
    <View testID={TestIDs.sections.stateTree} style={styles.section}>
      <Text
        testID={`${TestIDs.sections.stateTree}.title`}
        style={[styles.sectionTitle, propStyles.sectionTitleStyle]}
      >
        {'State Tree'}
      </Text>
      <View testID={`${TestIDs.sections.stateTree}.content`} style={styles.sectionContent}>
        <JSONTree data={state} hideRoot />
      </View>
    </View>
  )
}
