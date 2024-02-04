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
  const [timeArray, setTimeArray] = useState([] as string[])
  const [amedasPastObj, setAmedasPastObj] = useState({ init: true })
  return (
    <View style={styles.container}>
      <Header />
      <AmedasCard
        amedasData={amedasData}
        timeArray={timeArray}
        amedasPastObj={amedasPastObj}
      />
      <MapComponent
        setAmedasData={setAmedasData}
        setTimeArray={setTimeArray}
        setAmedasPastObj={setAmedasPastObj}
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
