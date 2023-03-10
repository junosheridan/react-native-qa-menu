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
```

## Properties
|Prop|Type|Required|Default|Description|
|---|---|---|---|---|
|visible|boolean|true||Whether to show the menu or not|
|isCircle|boolean|false|true|Display the draggable menu as circle|
|x|number|false|Screen width - 75|Position x of the draggable menu|
|y|number|false|Screen height - 100|Position y of the draggable menu|
|maxLogsCount|number|false|100|Maximum number of logs shown in app|
|logFilters|string[]|false|[]|Filter out unwanted logs|
|draggableDisplayText|string|false|<app_version>|Displaying text on the draggable menu|
|draggableSize|number|false|50|Draggable menu's size|
|quickActions|Array<{ title: string; onPress: () => void; closedOnPress?: boolean }>|false|[]|Quick actions added to the menu|
|extraAppInfo|Array<{ title: string; description: string }>|false|[]|Extra app info added to the menu|
|state|any|false|undefined|Any object that we'd like to display in the JSON tree Eg. redux store state, react navigation state, react-query's state|
|styles|object|false|{}|Custom styles applied to the elements inside the QA menu|
|styles.headerTitleStyle|TextStyle|false|undefined|Text style applied to the menu header's title|
|styles.sectionTitleStyle|TextStyle|false|undefined|Text style applied to the section's title|
|styles.infoTitleStyle|TextStyle|false|undefined|Text style applied to the app info's title|
|styles.infoDescriptionStyle|TextStyle|false|undefined|Text style applied to the app info's description|
|styles.quickActionButtonStyle|ViewStyle|false|undefined|View style applied to the quick action button|
|styles.quickActionButtonTitleStyle|TextStyle|false|undefined|Text style applied to the quick action button's title|
|styles.logTimestampStyle|TextStyle|false|undefined|Text style applied to the log's timestamp text|
|styles.logCopyButtonStyle|ViewStyle|false|undefined|View style applied to the log's copy button|
|styles.logMessageStyle|TextStyle|false|undefined|Text style applied to the log's message text|
|errorColor|ColorValue|false|"crimson"|Color applied when error state|
|successColor|ColorValue|false|"forestgreen"|Color applied for normal state|
|warningColor|ColorValue|false|"lightgoldenrodyellow"|Color applied when warning state|

## Methods
|Func|Description|
|---|---|
|open|Open the menu's content modal|
|close|Close the menu's content modal|

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---
