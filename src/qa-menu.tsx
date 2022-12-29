import dayjs from 'dayjs'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { getApplicationName, getVersion } from 'react-native-device-info'
import Draggable from 'react-native-draggable'
import { FileLogger } from 'react-native-file-logger'

import { AppLogs } from './app-logs'
import { Colors, Images, MAXIMUM_LOGS_COUNT, Metrics } from './constants'
import { SectionAppInfo } from './section-app-info'
import { SectionQuickActions } from './section-quick-actions'
import { SectionStateTree } from './section-state-tree'
import styles from './styles'
import { Log, LogLevel, QaMenuProps, ViewState } from './types'

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
  quickActions = [],
  extraAppInfo = [],
  state,
  children,
}) => {
  const [viewState, setViewState] = useState(ViewState.default)
  const [hasError, setHasError] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [logs, setLogs] = useState<Log[]>([])
  const draggableRenderColor = useMemo(
    () => draggableColor || (hasError ? Colors.error : Colors.success),
    [draggableColor, hasError],
  )
  const appVersion = useMemo(() => getVersion(), [])
  const appName = useMemo(() => getApplicationName(), [])
  const openModal = useCallback(() => setModalVisible(true), [])
  const closeModal = useCallback(() => setModalVisible(false), [])
  const setViewStateAsDefault = useCallback(() => setViewState(ViewState.default), [])
  const viewAppLogs = useCallback(() => {
    setHasError(false)
    setViewState(ViewState.logs)
  }, [])

  const log = useCallback((level: LogLevel, message?: any, ...optionalParams: any[]) => {
    switch (level) {
      case LogLevel.debug:
        originalConsoleDebug(message, ...optionalParams)
        break
      case LogLevel.warn:
        originalConsoleWarn(message, ...optionalParams)
        break
      case LogLevel.error:
        setHasError(true)
        originalConsoleError(message, ...optionalParams)
        break
      case LogLevel.info:
        originalConsoleInfo(message, ...optionalParams)
        break
      default:
        originalConsoleLog(message, ...optionalParams)
        break
    }
    setLogs(prev => {
      const updatedLogs = [{ level, message, optionalParams, timestamp: dayjs() }, ...prev]
      return updatedLogs.slice(0, MAXIMUM_LOGS_COUNT)
    })
  }, [])

  const sendLogFilesByEmail = useCallback(
    () => FileLogger.sendLogFilesByEmail({ subject: `${appName}'s Log Files` }),
    [appName],
  )

  useEffect(() => {
    FileLogger.deleteLogFiles()
    FileLogger.configure()
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
      />
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
              <TouchableOpacity style={styles.headerMenuButton} onPress={setViewStateAsDefault}>
                <Image style={styles.icon} source={Images.goBack} resizeMode="contain" />
              </TouchableOpacity>
            )}
            <Text style={styles.headerTitle}>{appName}</Text>
            {viewState === ViewState.default ? (
              <TouchableOpacity style={styles.headerMenuButton} onPress={closeModal}>
                <Image style={styles.icon} source={Images.cancel} resizeMode="contain" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.headerMenuButton} onPress={sendLogFilesByEmail}>
                <Image style={styles.icon} source={Images.emailSend} resizeMode="contain" />
              </TouchableOpacity>
            )}
          </View>
          {viewState === ViewState.default && (
            <KeyboardAvoidingView
              enabled
              style={styles.keyboardAvoidingView}
              behavior={Metrics.isIphone ? 'padding' : 'height'}
              keyboardVerticalOffset={100}
            >
              <ScrollView contentContainerStyle={styles.scrollContent}>
                <SectionAppInfo extraAppInfo={extraAppInfo} />
                <SectionStateTree state={state} />
                <SectionQuickActions
                  quickActions={quickActions}
                  closeModal={closeModal}
                  onAppLogsView={viewAppLogs}
                />
                {children}
              </ScrollView>
            </KeyboardAvoidingView>
          )}
          {viewState === ViewState.logs && <AppLogs data={logs} />}
        </SafeAreaView>
      </Modal>
    </>
  )
}
