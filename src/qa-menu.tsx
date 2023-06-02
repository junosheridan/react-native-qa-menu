import dayjs from 'dayjs'
import React, {
  forwardRef,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
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
import { Log, LogLevel, QaMenuProps, QaMenuRefMethods, ViewState } from './types'

const originalConsoleLog = console.log
const originalConsoleDebug = console.debug
const originalConsoleInfo = console.info
const originalConsoleWarn = console.warn
const originalConsoleError = console.error

export const QaMenu = forwardRef(
  (
    {
      visible,
      isCircle = true,
      draggableDisplayText,
      draggableSize = Metrics.draggableViewSize,
      x = Metrics.screenWidth - Metrics.draggableViewSize * 1.5,
      y = Metrics.screenHeight - Metrics.draggableViewSize * 2,
      maxLogsCount = MAXIMUM_LOGS_COUNT,
      logFilters = [],
      quickActions = [],
      extraAppInfo = [],
      state,
      styles: propStyles = {},
      errorColor = Colors.error,
      successColor = Colors.success,
      children,
    }: QaMenuProps,
    ref: Ref<QaMenuRefMethods>,
  ) => {
    const [viewState, setViewState] = useState(ViewState.default)
    const [hasError, setHasError] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [logs, setLogs] = useState<Log[]>([])
    const listOfAllLogsRef = useRef<Log[]>([])

    const draggableRenderColor = useMemo(
      () => (hasError ? errorColor : successColor),
      [hasError, errorColor, successColor],
    )
    const appVersion = useMemo(() => getVersion(), [])
    const appName = useMemo(() => getApplicationName(), [])
    const openModal = useCallback(() => setModalVisible(true), [])
    const closeModal = useCallback(() => setModalVisible(false), [])
    const setViewStateAsDefault = useCallback(() => {
      setLogs([])
      setViewState(ViewState.default)
    }, [])
    const viewAppLogs = useCallback(() => {
      setHasError(false)
      setLogs(listOfAllLogsRef.current)
      setViewState(ViewState.logs)
    }, [])

    const log = useCallback(
      (level: LogLevel, message?: any, ...optionalParams: any[]) => {
        let shouldAddNewLog = true
        if (typeof message === 'string') {
          shouldAddNewLog = !logFilters.includes(message)
        } else if (typeof message === 'object') {
          shouldAddNewLog = !logFilters.includes(JSON.stringify(message).toLowerCase())
        }
        switch (level) {
          case LogLevel.debug:
            originalConsoleDebug(message, ...optionalParams)
            break
          case LogLevel.warn:
            originalConsoleWarn(message, ...optionalParams)
            break
          case LogLevel.error:
            setHasError(shouldAddNewLog)
            originalConsoleError(message, ...optionalParams)
            break
          case LogLevel.info:
            originalConsoleInfo(message, ...optionalParams)
            break
          default:
            originalConsoleLog(message, ...optionalParams)
            break
        }
        if (shouldAddNewLog) {
          const timestamp = dayjs()
          const updatedLogs = [
            {
              level,
              message,
              optionalParams,
              timestamp,
              id: `${timestamp.valueOf()}_${Math.random()}`,
            },
            ...listOfAllLogsRef.current,
          ]
          listOfAllLogsRef.current = updatedLogs.slice(
            0,
            Math.max(maxLogsCount, MAXIMUM_LOGS_COUNT),
          )
        }
      },
      [maxLogsCount, logFilters],
    )

    const shareLogFiles = useCallback(async () => {
      const [logFilePath] = await FileLogger.getLogFilePaths()
      if (logFilePath) {
        const shareOptions: ShareOptions = {
          title: `Share ${appName}'s Log`,
          url: Metrics.isIphone ? logFilePath : `file://${logFilePath}`,
          failOnCancel: false,
        }
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

    const renderDefaultView = useCallback(() => {
      if (viewState !== ViewState.default) return null
      return (
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
      )
    }, [
      children,
      closeModal,
      extraAppInfo,
      propStyles,
      quickActions,
      state,
      viewAppLogs,
      viewState,
    ])

    const renderAppLogsView = useCallback(() => {
      if (viewState !== ViewState.logs) return null
      return (
        <AppLogs
          data={logs}
          styles={propStyles}
          onRefresh={() => setLogs(listOfAllLogsRef.current)}
        />
      )
    }, [logs, propStyles, viewState])

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

    useImperativeHandle(ref, () => ({
      open: openModal,
      close: closeModal,
    }))

    if (!visible) return null
    return (
      <View style={styles.container} pointerEvents="box-none">
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
          <SafeAreaView style={styles.modalContent}>
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
            {renderDefaultView()}
            {renderAppLogsView()}
          </SafeAreaView>
        </Modal>
      </View>
    )
  },
)
