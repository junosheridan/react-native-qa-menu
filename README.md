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
yarn add @react-native-clipboard/clipboard react-native-device-info react-native-file-logger react-native-share
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
    console.log(`%c Log message with color`, 'color: rgb(118, 74, 188)', { foo: 'bar' })
  }, [])

  return (
    <View style={styles.container}>
      <QaMenu
        visible
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

## Properties
|Prop|Type|Required|Default|Description|
|---|---|---|---|---|
|visible|boolean|true||Whether to show the menu or not|
|maxLogsCount|number|false|100|Maximum number of logs shown in app|
|draggableDisplayText|string|false|<app_version>|Displaying text on the draggable menu|
|draggableSize|number|false|50|Draggable menu's size|
|quickActions|Array<{ title: string; onPress: () => void; closedOnPress?: boolean }>|false|[]|Quick actions added to the menu|
|extraAppInfo|Array<{ title: string; description: string }>|false|[]|Extra app info added to the menu|
|state|any|false||Any object that we'd like to display in the JSON tree Eg. redux store state, react navigation state, react-query's state|
|styles|{ sectionTitleStyle?: StyleProp<TextStyle>;<br />infoTitleStyle?: StyleProp<TextStyle>;<br />infoDescriptionStyle?: StyleProp<TextStyle>;<br />quickActionButtonStyle?: StyleProp<ViewStyle>;<br />quickActionButtonTitleStyle?: StyleProp<TextStyle>;<br />logItemTimestampStyle?: StyleProp<TextStyle>;<br />logCopyButtonStyle?: StyleProp<ViewStyle>;<br />logMessageTextStyle?: StyleProp<TextStyle> }|false|{}|Custom styles applied to the elements inside the QA menu|

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---
