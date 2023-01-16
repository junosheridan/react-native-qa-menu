import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { QaMenu, QaMenuRefMethods } from 'react-native-qa-menu'

export default function App() {
  const ref = useRef<QaMenuRefMethods>(null)

  useEffect(() => {
    console.log('This is a log message', {
      array: [1, 2, 3],
      bool: true,
      object: { foo: 'bar' },
    })
    console.log({
      array: [1, 2, 3],
      bool: true,
      object: { foo: 'bar' },
    })
    console.error(new Error('This is an error message'))
    console.warn('This is a warning message')
    console.info('This is an info message')
    console.debug('This is a debug message')
    console.log(`%c Log message with color`, 'color: rgb(118, 74, 188)', { foo: 'bar' })
  }, [])

  return (
    <QaMenu
      visible
      ref={ref}
      quickActions={[{ title: 'Logout', onPress: () => {}, closedOnPress: true }]}
      state={{
        array: [1, 2, 3],
        bool: true,
        object: { foo: 'bar' },
      }}
    >
      <View style={styles.customSection}>
        <Text>This is another section rendered as children prop</Text>
      </View>
    </QaMenu>
  )
}

const styles = StyleSheet.create({
  customSection: {
    marginTop: 24,
  },
})
