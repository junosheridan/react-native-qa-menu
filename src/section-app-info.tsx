import React, { useMemo } from 'react'
import { StyleProp, Text, TextStyle, View } from 'react-native'
import {
  getBuildNumber,
  getBundleId,
  getDeviceId,
  getSystemVersion,
  getVersion,
} from 'react-native-device-info'

import styles from './styles'
import type { QaMenuProps } from './types'

export const InfoRow: React.FC<{
  title: string
  description: string
  titleStyle?: StyleProp<TextStyle>
  descriptionStyle?: StyleProp<TextStyle>
}> = ({ title, description, titleStyle, descriptionStyle }) => {
  return (
    <View style={styles.info}>
      <Text style={[styles.infoTitle, titleStyle]}>{title}</Text>
      <Text style={[styles.infoDescription, descriptionStyle]}>{description}</Text>
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
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, propStyles.sectionTitleStyle]}>{'App Info'}</Text>
      <View style={styles.sectionContent}>
        <InfoRow
          title="Device Identifier"
          description={deviceId}
          titleStyle={propStyles.infoTitleStyle}
          descriptionStyle={propStyles.infoDescriptionStyle}
        />
        <InfoRow
          title="Bundle Identifier"
          description={bundleId}
          titleStyle={propStyles.infoTitleStyle}
          descriptionStyle={propStyles.infoDescriptionStyle}
        />
        <InfoRow
          title="Build Number"
          description={buildNumber}
          titleStyle={propStyles.infoTitleStyle}
          descriptionStyle={propStyles.infoDescriptionStyle}
        />
        <InfoRow
          title="OS Version"
          description={systemVersion}
          titleStyle={propStyles.infoTitleStyle}
          descriptionStyle={propStyles.infoDescriptionStyle}
        />
        <InfoRow
          title="App Version"
          description={appVersion}
          titleStyle={propStyles.infoTitleStyle}
          descriptionStyle={propStyles.infoDescriptionStyle}
        />
        {extraAppInfo.map(({ title, description }, index) => {
          return (
            <InfoRow
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
