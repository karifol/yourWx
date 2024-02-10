import { View, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PrefectureMap from '../../components/PrefectureMap'
import PrefectureCard from '../../components/PrefectureCard'
import Forecast3days from '../../components/Forecast3days'
import Overview from '../../components/Overview'
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency'

const tommorrow = (): JSX.Element => {
  const [prefecture, setPrefecture] = useState('東京都')

  useEffect(() => {
    requestTrackingPermissionsAsync()
      .then((status) => {
        console.log('tracking status:', status)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])


  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.scrollContainer}>
        <ScrollView style={{ width: '100%' }}>
          <PrefectureCard prefecture={prefecture} />
          <PrefectureMap prefecture={prefecture} setPrefecture={setPrefecture} />
          <Forecast3days prefecture={prefecture} />
          <Overview prefecture={prefecture} />
        </ScrollView>
      </View>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%'
  },
  scrollContainer: {
    height: Dimensions.get('window').height - 200,
    width: '100%',
    alignItems: 'center'
  }
})

export default tommorrow
