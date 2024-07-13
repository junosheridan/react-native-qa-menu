import React, { useMemo } from 'react'
import { StyleProp, Text, TextStyle, View } from 'react-native'
import {
  getBuildNumber,
  getBundleId,
  getDeviceId,
  getSystemVersion,
  getVersion,
} from 'react-native-device-info'

import { TestIDs } from './constants'
import styles from './styles'
import type { QaMenuProps } from './types'

export const InfoRow: React.FC<{
  title: string
  description: string
  titleStyle?: StyleProp<TextStyle>
  descriptionStyle?: StyleProp<TextStyle>
  testID?: string
}> = ({ title, description, titleStyle, descriptionStyle, testID }) => {
  return (
    <View testID={testID} style={styles.info}>
      <Text testID={`${testID || ''}.title`} style={[styles.infoTitle, titleStyle]}>
        {title}
      </Text>
      <Text
        testID={`${testID || ''}.description`}
        style={[styles.infoDescription, descriptionStyle]}
      >
        {description}
      </Text>
    </View>
  )
}

export const SectionAppInfo: React.FC<Pick<QaMenuProps, 'extraAppInfo' | 'styles'>> = ({
  extraAppInfo = [],
  styles: propStyles = {},
}) => {
  const bundleId = useMemo(() => getBundleId(), [])
  const buildNumber = useMemo(() => getBuildNumber(), [])
  const deviceId = useMemo(() => getDeviceId(), [])
  const systemVersion = useMemo(() => getSystemVersion(), [])
  const appVersion = useMemo(() => getVersion(), [])
  return (
    <View testID={TestIDs.sections.appInfo} style={styles.section}>
      <Text
        testID={`${TestIDs.sections.appInfo}.title`}
        style={[styles.sectionTitle, propStyles.sectionTitleStyle]}
      >
        {'App Info'}
      </Text>
      <View testID={`${TestIDs.sections.appInfo}.content`} style={styles.sectionContent}>
        <InfoRow
          testID={TestIDs.appInfo.deviceId}
          title="Device Identifier"
          description={deviceId}
          titleStyle={propStyles.infoTitleStyle}
          descriptionStyle={propStyles.infoDescriptionStyle}
        />
        <InfoRow
          testID={TestIDs.appInfo.bundleId}
          title="Bundle Identifier"
          description={bundleId}
          titleStyle={propStyles.infoTitleStyle}
          descriptionStyle={propStyles.infoDescriptionStyle}
        />
        <InfoRow
          testID={TestIDs.appInfo.buildNumber}
          title="Build Number"
          description={buildNumber}
          titleStyle={propStyles.infoTitleStyle}
          descriptionStyle={propStyles.infoDescriptionStyle}
        />
        <InfoRow
          testID={TestIDs.appInfo.osVersion}
          title="OS Version"
          description={systemVersion}
          titleStyle={propStyles.infoTitleStyle}
          descriptionStyle={propStyles.infoDescriptionStyle}
        />
        <InfoRow
          testID={TestIDs.appInfo.appVersion}
          title="App Version"
          description={appVersion}
          titleStyle={propStyles.infoTitleStyle}
          descriptionStyle={propStyles.infoDescriptionStyle}
        />
        {extraAppInfo.map(({ title, description, testID }, index) => {
          return (
            <InfoRow
              testID={testID}
              key={`info_row_${index}`}
              title={title}
              description={description}
              titleStyle={propStyles.infoTitleStyle}
              descriptionStyle={propStyles.infoDescriptionStyle}
            />
          )
        })}
      </View>
    </View>
  )
}
