import React, { useCallback } from 'react'
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

import styles from './styles'
import type { QaMenuProps, QuickAction } from './types'

export const ActionButton: React.FC<
  TouchableOpacityProps & { title?: string; titleStyle?: StyleProp<TextStyle> }
> = ({ title, style, titleStyle, ...rest }) => {
  return (
    <TouchableOpacity {...rest} style={[styles.actionButton, style]}>
      <Text style={[styles.actionButtonTitle, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

export const SectionQuickActions: React.FC<
  Pick<QaMenuProps, 'quickActions' | 'styles'> & {
    onAppLogsView: () => void
    closeModal: () => void
  }
> = ({ quickActions = [], onAppLogsView, closeModal, styles: propStyles = {} }) => {
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
      <Text style={[styles.sectionTitle, propStyles.sectionTitleStyle]}>{'Quick Actions'}</Text>
      <View style={styles.sectionContent}>
        <ActionButton
          title={'View app logs'}
          onPress={onAppLogsView}
          style={propStyles.quickActionButtonStyle}
          titleStyle={propStyles.quickActionButtonTitleStyle}
        />
        {quickActions.map((action, index) => {
          return (
            <ActionButton
              key={`action_button_${index}`}
              title={action.title}
              onPress={() => onQuickActionPress(action)}
              style={propStyles.quickActionButtonStyle}
              titleStyle={propStyles.quickActionButtonTitleStyle}
            />
          )
        })}
      </View>
    </View>
  )
}
