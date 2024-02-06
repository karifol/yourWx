import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'

interface Props {
  prefecture: string
}

const Forecast3days = (props: Props): JSX.Element => {
  const { prefecture } = props
  const [tableObj, setTableObj] = useState<Record<string, string>>({})
  const [forecast, setForecast] = useState<any[]>([])
  useEffect(() => {
    const fetchTable = async (): Promise<void> => {
      const url = 'https://www.jma.go.jp/bosai/common/const/area.json'
      const response = await fetch(url)
      const data = await response.json()
      const obj: Record<string, string> = {}
      for (const num in data.offices) {
        const name = data.offices[num].name as string
        obj[name] = num
      }
      setTableObj(obj)
    }
    fetchTable().catch((error) => { console.error(error) })
  }
  , [])
  useEffect(() => {
    const fetchForecast = async (prefecture: string): Promise<void> => {
      const num = tableObj[prefecture]
      const url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${num}.json`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data[0].timeSeries[0].areas)
      setForecast(data[0].timeSeries[0].areas as any[])
    }
    fetchForecast(prefecture).catch((error) => { console.error(error) })
  }
  , [tableObj, prefecture])
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.title}>
          <Text style={styles.titleText}>3日間予報</Text>
        </View>
        <View style={styles.select}>
          {
            forecast.map((item: any, index: number) => {
              return (
                <TouchableOpacity key={index}>
                  <Text>{item.area.name}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
        <View style={styles.forecastContainer}>
          <ScrollView style={styles.scrollForecast} horizontal={true}>
            <View style={styles.scrollInner}>
              <View style={styles.forecast}>
                <View style={styles.date}>
                  <Text>2月20日</Text>
                </View>
                <View style={styles.icon}>
                </View>
                <View style={styles.pops}>
                  <Text>降水確率:30%</Text>
                </View>
              </View>
              <View style={styles.forecast}>
                <View style={styles.date}>
                  <Text>2月21日</Text>
                </View>
                <View style={styles.icon}>
                </View>
                <View style={styles.pops}>
                  <Text>降水確率:30%</Text>
                </View>
              </View>
              <View style={styles.forecast}>
                <View style={styles.date}>
                  <Text>2月22日</Text>
                </View>
                <View style={styles.icon}>
                </View>
                <View style={styles.pops}>
                  <Text>降水確率:30%</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    height: 300,
    marginBottom: 10
  },
  card: {
    width: '95%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'flex-start'
  },
  title: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    borderBottomColor: '#efefef',
    borderBottomWidth: 1
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10
  },
  select: {
    width: '100%',
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    marginVertical: 5,
    borderBottomColor: '#efefef',
    borderBottomWidth: 1
  },
  forecastContainer: {
    width: '100%',
    height: 230,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollForecast: {
    width: '100%',
    height: 230
  },
  scrollInner: {
    height: 230,
    flexDirection: 'row'
  },
  forecast: {
    width: 200,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#d2d2d2'
  },
  date: {
    width: '100%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
    borderTopColor: '#efefef',
    borderTopWidth: 1
  },
  pops: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Forecast3days
