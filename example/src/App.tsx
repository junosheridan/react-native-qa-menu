import * as React from 'react'

import { StyleSheet, View } from 'react-native'
import { QaMenu } from 'react-native-qa-menu'

export default function App() {
  return (
    <View style={styles.container}>
      <QaMenu
        visible
        customActions={[
          { title: 'Open Storybook', onPress: () => {} },
          { title: 'Logout', onPress: () => {} },
        ]}
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
