import { View, StyleSheet } from 'react-native'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AmedasCard from '../../components/AmedasCard'
import MapComponent from '../../components/MapCard'

const amedas = (): JSX.Element => {
  const [graphObj, setGraphObj] = useState({
    data: [],
    label: []
  })
  const [cardObj, setCardObj] = useState({
    name: '-',
    windDirection: ['-'],
    windDirectionStr: ['-'],
    temp: ['-'],
    wind: ['-'],
    humidity: ['-'],
    precipitation1h: ['-'],
    time: '-'
  })
  const url = 'https://www.jma.go.jp/bosai/map.html#5/34.5/137/&elem=temp&contents=amedas&interval=60'

  return (
    <View style={styles.container}>
      <Header />
      <AmedasCard
        graphObj={graphObj}
        cardObj={cardObj}
      />
      <MapComponent
        setCardObj={setCardObj}
        setGraphObj={setGraphObj}
      />
      <Footer url={url} />
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
