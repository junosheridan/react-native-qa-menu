import React from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import styles from './styles'
import type { QaMenuProps } from './types'

export const ActionButton: React.FC<TouchableOpacityProps & { title?: string }> = ({
  title,
  ...rest
}) => {
  return (
    <TouchableOpacity {...rest} style={styles.actionButton}>
      <Text style={styles.actionButtonTitle}>{title}</Text>
    </TouchableOpacity>
  )
}

export const SectionCustomActions: React.FC<Pick<QaMenuProps, 'customActions'>> = ({
  customActions = [],
}) => {
  if (customActions.length === 0) return null
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{'Custom Actions'}</Text>
      <View style={styles.sectionContent}>
        {customActions.map(({ title, onPress }, index) => {
          return <ActionButton key={`action_button_${index}`} title={title} onPress={onPress} />
        })}
      </View>
    </View>
  )
}
