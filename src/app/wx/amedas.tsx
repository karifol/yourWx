import { View, StyleSheet } from 'react-native'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AmedasCard from '../../components/AmedasCard'
import MapComponent from '../../components/MapCard'

const amedas = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Header />
      <AmedasCard />
      <MapComponent />
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%'
  }
})

export default amedas
