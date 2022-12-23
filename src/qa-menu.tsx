import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Modal, SafeAreaView, ScrollView, View } from 'react-native'
import { getVersion } from 'react-native-device-info'
import Draggable from 'react-native-draggable'
import { Colors, Metrics } from './constants'
import { SectionAppInfo } from './section-app-info'
import { SectionCustomActions } from './section-custom-actions'
import { SectionReduxState } from './section-redux-state'
import styles from './styles'
import { ViewState, QaMenuProps, LogLevel } from './types'

const originalConsoleLog = console.log
const originalConsoleDebug = console.debug
const originalConsoleInfo = console.info
const originalConsoleWarn = console.warn
const originalConsoleError = console.error

export const QaMenu: React.FC<QaMenuProps> = ({
  visible,
  isCircle = true,
  draggableDisplayText,
  draggableColor,
  draggableSize = Metrics.draggableViewSize,
  draggableImageSource,
  customActions,
  reduxState,
  children,
}) => {
  const [viewState, setViewState] = useState(ViewState.default)
  const [hasError] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const draggableRenderColor = useMemo(
    () => draggableColor || (hasError ? Colors.error : Colors.success),
    [draggableColor, hasError],
  )
  const appVersion = useMemo(() => getVersion(), [])
  const openModal = useCallback(() => setModalVisible(true), [])
  const closeModal = useCallback(() => setModalVisible(false), [])
  const setViewStateAsDefault = useCallback(() => setViewState(ViewState.default), [])
  const viewAppLogs = useCallback(() => setViewState(ViewState.logs), [])

  const log = useCallback((level: LogLevel, message?: any, ...optionalParams: any[]) => {
    // setLogs(prevState => [{ level, message: args, date: new Date() }, ...prevState.slice(-100)])
    switch (level) {
      case LogLevel.debug:
        originalConsoleDebug(message, ...optionalParams)
        break
      case LogLevel.warn:
        originalConsoleWarn(message, ...optionalParams)
        break
      case LogLevel.error:
        originalConsoleError(message, ...optionalParams)
        break
      case LogLevel.info:
        originalConsoleInfo(message, ...optionalParams)
        break
      default:
        originalConsoleLog(message, ...optionalParams)
        break
    }
  }, [])

  useEffect(() => {
    console.log = (message?: any, ...optionalParams: any[]) =>
      log(LogLevel.log, message, ...optionalParams)
    console.debug = (message?: any, ...optionalParams: any[]) =>
      log(LogLevel.debug, message, ...optionalParams)
    console.info = (message?: any, ...optionalParams: any[]) =>
      log(LogLevel.info, message, ...optionalParams)
    console.warn = (message?: any, ...optionalParams: any[]) =>
      log(LogLevel.warn, message, ...optionalParams)
    console.error = (message?: any, ...optionalParams: any[]) =>
      log(LogLevel.error, message, ...optionalParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            {viewState === ViewState.default ? (
              <View />
            ) : (
              <Button title="Back" onPress={setViewStateAsDefault} />
            )}
            <View />
            {viewState === ViewState.default ? (
              <Button title="Close" onPress={closeModal} />
            ) : (
              <View />
            )}
          </View>
          {viewState === ViewState.default && (
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <SectionAppInfo />
              <SectionReduxState reduxState={reduxState} />
              <SectionCustomActions customActions={customActions} onAppLogsView={viewAppLogs} />
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>
    </>
  )
}
