import React, { useCallback } from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'

import styles from './styles'
import type { QaMenuProps, QuickAction } from './types'

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
  Pick<QaMenuProps, 'quickActions'> & { onAppLogsView: () => void; closeModal: () => void }
> = ({ quickActions = [], onAppLogsView, closeModal }) => {
  const onQuickActionPress = useCallback(
    ({ onPress, closedOnPress = false }: QuickAction) => {
      onPress()
      if (closedOnPress) {
        closeModal()
      }
    },
    [closeModal],
  )

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{'Quick Actions'}</Text>
      <View style={styles.sectionContent}>
        <ActionButton title={'View app logs'} onPress={onAppLogsView} />
        {quickActions.map((action, index) => {
          return (
            <ActionButton
              key={`action_button_${index}`}
              title={action.title}
              onPress={() => onQuickActionPress(action)}
            />
          )
        })}
      </View>
    </View>
  )
}
