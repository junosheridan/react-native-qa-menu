import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { QaMenu } from 'react-native-qa-menu'

export default function App() {
  React.useEffect(() => {
    console.log('Hello world')
    console.log('Hello world', { hello: true, world: 123 })
    console.error('Error', new Error('This is an error message'))
    console.warn('This is a warning message')
    console.info('This is an info message')
    console.debug('This is a debug message')
  }, [])
  return (
    <View style={styles.container}>
      <QaMenu
        visible
        customActions={[{ title: 'Logout', onPress: () => {} }]}
        reduxState={{
          array: [1, 2, 3],
          bool: true,
          object: { foo: 'bar' },
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
