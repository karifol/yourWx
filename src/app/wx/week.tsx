import { View, ScrollView, StyleSheet, Dimensions } from 'react-native'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PrefectureMap from '../../components/PrefectureMap'
import ForecastWeek from '../../components/ForecastWeek'
import PrefectureCard from '../../components/PrefectureCard'
import { useState } from 'react'

const week = (): JSX.Element => {
  const [prefecture, setPrefecture] = useState('東京都')

  const imgObj: Record<number, any> = {
    100: require('../../wx/100.png.png'),
    101: require('../../wx/101.png.png'),
    102: require('../../wx/102.png.png'),
    104: require('../../wx/104.png.png'),
    110: require('../../wx/110.png.png'),
    112: require('../../wx/112.png.png'),
    115: require('../../wx/115.png.png'),
    200: require('../../wx/200.png.png'),
    201: require('../../wx/201.png.png'),
    202: require('../../wx/202.png.png'),
    204: require('../../wx/204.png.png'),
    210: require('../../wx/210.png.png'),
    212: require('../../wx/212.png.png'),
    215: require('../../wx/215.png.png'),
    300: require('../../wx/300.png.png'),
    301: require('../../wx/301.png.png'),
    302: require('../../wx/302.png.png'),
    303: require('../../wx/303.png.png'),
    308: require('../../wx/308.png.png'),
    311: require('../../wx/311.png.png'),
    313: require('../../wx/313.png.png'),
    314: require('../../wx/314.png.png'),
    400: require('../../wx/400.png.png'),
    401: require('../../wx/401.png.png'),
    402: require('../../wx/402.png.png'),
    403: require('../../wx/403.png.png'),
    406: require('../../wx/406.png.png'),
    411: require('../../wx/411.png.png'),
    413: require('../../wx/413.png.png'),
    414: require('../../wx/414.png.png')
  }

  const url = 'https://www.jma.go.jp/bosai/forecast/'

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.scrollContainer}>
        <ScrollView style={{ width: '100%' }}>
          <PrefectureCard prefecture={prefecture} />
          <PrefectureMap prefecture={prefecture} setPrefecture={setPrefecture} />
          <ForecastWeek prefecture={prefecture} imgObj={imgObj} />
        </ScrollView>
      </View>
      <Footer url={url} />
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

export default week
