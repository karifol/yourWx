import { View, ScrollView, StyleSheet } from 'react-native'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PrefectureMap from '../../components/PrefectureMap'
import { useState } from 'react'

const week = (): JSX.Element => {
  const [prefecture, setPrefecture] = useState('東京都')
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={{ width: '100%' }}>
        <PrefectureMap prefecture={prefecture} setPrefecture={setPrefecture} />
      </ScrollView>
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
