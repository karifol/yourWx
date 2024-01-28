import { View, Text, StyleSheet } from 'react-native'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const week = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Header />
      <View>
        <Text>Week</Text>
      </View>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%'
  }
})

export default week
