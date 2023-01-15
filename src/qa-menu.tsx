import dayjs from 'dayjs'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Alert,
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
import Share, { ShareOptions } from 'react-native-share'

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
  draggableSize = Metrics.draggableViewSize,
  x = Metrics.screenWidth - Metrics.draggableViewSize * 1.5,
  y = Metrics.screenHeight - Metrics.draggableViewSize * 2,
  maxLogsCount = MAXIMUM_LOGS_COUNT,
  quickActions = [],
  extraAppInfo = [],
  state,
  styles: propStyles = {},
  children,
  errorColor,
  successColor,
}) => {
  const [viewState, setViewState] = useState(ViewState.default)
  const [hasError, setHasError] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [logs, setLogs] = useState<Log[]>([])
  const draggableRenderColor = useMemo(() => {
    if (hasError) {
      return errorColor || Colors.error
    }
    return successColor || Colors.success
  }, [hasError, errorColor, successColor])
  const appVersion = useMemo(() => getVersion(), [])
  const appName = useMemo(() => getApplicationName(), [])
  const openModal = useCallback(() => setModalVisible(true), [])
  const closeModal = useCallback(() => setModalVisible(false), [])
  const setViewStateAsDefault = useCallback(() => setViewState(ViewState.default), [])
  const viewAppLogs = useCallback(() => {
    setHasError(false)
    setViewState(ViewState.logs)
  }, [])

  const log = useCallback(
    (level: LogLevel, message?: any, ...optionalParams: any[]) => {
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
        return updatedLogs.slice(0, Math.max(maxLogsCount, MAXIMUM_LOGS_COUNT))
      })
    },
    [maxLogsCount],
  )

  const shareLogFiles = useCallback(async () => {
    const [logFilePath] = await FileLogger.getLogFilePaths()
    if (logFilePath) {
      const shareOptions = {
        title: `Share ${appName}'s Log`,
        url: Metrics.isIphone ? logFilePath : `file://${logFilePath}`,
        failOnCancel: false,
      } satisfies ShareOptions
      await Share.open(shareOptions)
    } else {
      Alert.alert("Log file doesn't exist. Try again later.")
    }
  }, [appName])

  const configureFileLogger = useCallback(async () => {
    await FileLogger.configure({
      maximumFileSize: 10 * 1024 * 1024, // 10 Mb
      maximumNumberOfFiles: 1,
    })
  }, [])

  useEffect(() => {
    configureFileLogger()
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
    return () => {
      FileLogger.deleteLogFiles()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!visible) return null
  return (
    <>
      <Draggable
        isCircle={isCircle}
        renderColor={draggableRenderColor as string}
        renderSize={draggableSize}
        x={x}
        y={y}
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
            <Text style={[styles.headerTitle, propStyles.headerTitleStyle]} numberOfLines={1}>
              {appName}
            </Text>
            {viewState === ViewState.default ? (
              <TouchableOpacity style={styles.headerMenuButton} onPress={closeModal}>
                <Image style={styles.icon} source={Images.cancel} resizeMode="contain" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.headerMenuButton} onPress={shareLogFiles}>
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
                <SectionAppInfo extraAppInfo={extraAppInfo} styles={propStyles} />
                <SectionStateTree state={state} styles={propStyles} />
                <SectionQuickActions
                  quickActions={quickActions}
                  closeModal={closeModal}
                  onAppLogsView={viewAppLogs}
                  styles={propStyles}
                />
                {children}
              </ScrollView>
            </KeyboardAvoidingView>
          )}
          {viewState === ViewState.logs && <AppLogs data={logs} styles={propStyles} />}
        </SafeAreaView>
      </Modal>
    </>
  )
}
