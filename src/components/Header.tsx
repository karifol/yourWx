import { View, Text, StyleSheet } from 'react-native'

const Header = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>シンプル天気</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: 100
  },
  title: {
    paddingBottom: 10
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#226387'
  }
})

export default Header
