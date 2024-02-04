import { View, StyleSheet } from 'react-native'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AmedasCard from '../../components/AmedasCard'
import MapComponent from '../../components/MapCard'

const amedas = (): JSX.Element => {
  const [amedasData, setAmedasData] = useState({
    name: '-',
    windDirection: ['-'],
    temp: ['-'],
    wind: ['-'],
    humidity: ['-'],
    precipitation1h: ['-'],
    time: '-'
  } as any)
  return (
    <View style={styles.container}>
      <Header />
      <AmedasCard
        amedasData={amedasData}
      />
      <MapComponent
        setAmedasData={setAmedasData}
      />
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
