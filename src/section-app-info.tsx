import React, { useMemo } from 'react'
import { Text, View } from 'react-native'
import {
  getBuildNumber,
  getBundleId,
  getDeviceId,
  getSystemVersion,
  getVersion,
} from 'react-native-device-info'
import styles from './styles'
import type { QaMenuProps } from './types'

export const InfoRow: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  return (
    <View style={styles.info}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoDescription}>{description}</Text>
    </View>
  )
}

export const SectionAppInfo: React.FC<Pick<QaMenuProps, 'extraAppInfo'>> = ({
  extraAppInfo = [],
}) => {
  const bundleId = useMemo(() => getBundleId(), [])
  const buildNumber = useMemo(() => getBuildNumber(), [])
  const deviceId = useMemo(() => getDeviceId(), [])
  const systemVersion = useMemo(() => getSystemVersion(), [])
  const appVersion = useMemo(() => getVersion(), [])
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{'App Info'}</Text>
      <View style={styles.sectionContent}>
        <InfoRow title="Device Identifier" description={deviceId} />
        <InfoRow title="Bundle Identifier" description={bundleId} />
        <InfoRow title="Build Number" description={buildNumber} />
        <InfoRow title="OS Version" description={systemVersion} />
        <InfoRow title="App Version" description={appVersion} />
        {extraAppInfo.map(({ title, description }, index) => {
          return <InfoRow key={`info_row_${index}`} title={title} description={description} />
        })}
      </View>
    </View>
  )
}
