import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal, SafeAreaView, ScrollView, View } from 'react-native'
import { getVersion } from 'react-native-device-info'
import Draggable from 'react-native-draggable'
import { Colors, Metrics } from './constants'
import { SectionAppInfo } from './section-app-info'
import { SectionCustomActions } from './section-custom-actions'
import styles from './styles'
import type { QaMenuProps } from './types'

export const QaMenu: React.FC<QaMenuProps> = ({
  visible,
  isCircle = true,
  draggableDisplayText,
  draggableColor,
  draggableSize = Metrics.draggableViewSize,
  draggableImageSource,
  customActions,
  children,
}) => {
  const [hasError] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const draggableRenderColor = useMemo(
    () => draggableColor || (hasError ? Colors.error : Colors.success),
    [draggableColor, hasError],
  )
  const appVersion = useMemo(() => getVersion(), [])
  const openModal = useCallback(() => setModalVisible(true), [])
  const closeModal = useCallback(() => setModalVisible(false), [])

  if (!visible) return null
  return (
    <>
      <Draggable
        z={9999}
        isCircle={isCircle}
        imageSource={draggableImageSource}
        renderColor={draggableRenderColor}
        renderSize={draggableSize}
        animatedViewProps={{ height: Metrics.screenHeight }}
        x={Metrics.screenWidth - draggableSize * 1.5}
        y={Metrics.screenHeight - draggableSize * 2}
        renderText={draggableDisplayText || appVersion}
        onShortPressRelease={openModal}
      >
        {children}
      </Draggable>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <View />
            <Button title="Close" onPress={closeModal} />
          </View>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <SectionAppInfo />
            <SectionCustomActions customActions={customActions} />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  )
}
