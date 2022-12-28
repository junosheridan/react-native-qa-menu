import React from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'

import styles from './styles'
import type { QaMenuProps } from './types'

export const ActionButton: React.FC<TouchableOpacityProps & { title?: string }> = ({
  title,
  style,
  ...rest
}) => {
  return (
    <TouchableOpacity {...rest} style={[styles.actionButton, style]}>
      <Text style={styles.actionButtonTitle}>{title}</Text>
    </TouchableOpacity>
  )
}

export const SectionQuickActions: React.FC<
  Pick<QaMenuProps, 'quickActions'> & { onAppLogsView: () => void }
> = ({ quickActions = [], onAppLogsView }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{'Quick Actions'}</Text>
      <View style={styles.sectionContent}>
        <ActionButton title={'View app logs'} onPress={onAppLogsView} />
        {quickActions.map(({ title, onPress }, index) => {
          return <ActionButton key={`action_button_${index}`} title={title} onPress={onPress} />
        })}
      </View>
    </View>
  )
}
