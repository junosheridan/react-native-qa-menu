# react-native-qa-menu

Helper menu for QAs to examine the apps during the development

<img src="./demo.gif" />

## Installation

```sh
npm install react-native-qa-menu
```
or yarn:
```sh
yarn add react-native-qa-menu
```
This library needs these dependencies to be installed in your project before you can use it:

```sh
yarn add @react-native-clipboard/clipboard react-native-device-info react-native-file-logger
```

## Example

```js
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { QaMenu } from 'react-native-qa-menu'

export default function App() {
  React.useEffect(() => {
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
  }, [])
  return (
    <View style={styles.container}>
      <QaMenu
        visible
        customActions={[{ title: 'Logout', onPress: () => {} }]}
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customSection: {
    marginTop: 24,
  },
})

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---
