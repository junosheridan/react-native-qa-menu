import React, { useCallback } from 'react'
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

import { TestIDs } from './constants'
import styles from './styles'
import type { QaMenuProps, QuickAction } from './types'

export const ActionButton: React.FC<
  TouchableOpacityProps & { title?: string; titleStyle?: StyleProp<TextStyle> }
> = ({ testID, title, style, titleStyle, ...rest }) => {
  return (
    <TouchableOpacity {...rest} testID={testID} style={[styles.actionButton, style]}>
      <Text testID={`${testID}.title`} style={[styles.actionButtonTitle, titleStyle]}>
        {title}
      </Text>
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
    ({ onPress, closedOnPress = false }: QuickAction) =>
      () => {
        onPress()
        if (closedOnPress) {
          closeModal()
        }
      },
    [closeModal],
  )

  return (
    <View testID={TestIDs.sections.quickAction} style={styles.section}>
      <Text
        testID={`${TestIDs.sections.quickAction}.title`}
        style={[styles.sectionTitle, propStyles.sectionTitleStyle]}
      >
        {'Quick Actions'}
      </Text>
      <View testID={`${TestIDs.sections.quickAction}.content`} style={styles.sectionContent}>
        <ActionButton
          testID={TestIDs.quickActionButtons.viewAppLog}
          title={'View app logs'}
          onPress={onAppLogsView}
          style={propStyles.quickActionButtonStyle}
          titleStyle={propStyles.quickActionButtonTitleStyle}
        />
        {quickActions.map((action, index) => {
          return (
            <ActionButton
              testID={action.testID}
              key={`action_button_${index}`}
              title={action.title}
              onPress={onQuickActionPress(action)}
              style={propStyles.quickActionButtonStyle}
              titleStyle={propStyles.quickActionButtonTitleStyle}
            />
          )
        })}
      </View>
    </View>
  )
}
