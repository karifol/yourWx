import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import { useEffect, useState } from 'react'
import _telops from './weatherCode'

interface Props {
  prefecture: string
}

const telops = _telops as Record<number, string[]>

const Forecast3days = (props: Props): JSX.Element => {
  const { prefecture } = props
  const [area, setArea] = useState<string>('東京地方')
  const [tableObj, setTableObj] = useState<Record<string, string>>({})
  const [forecast, setForecast] = useState<any>({})
  const [areaArr, setAreaArr] = useState<any[]>([])
  const [timeArr, setTimeArr] = useState<string[]>(['', '', ''])

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
      if (prefecture === '') {
        return
      }
      if (tableObj[prefecture] === undefined) {
        return
      }
      const num = tableObj[prefecture]
      const url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${num}.json`
      const response = await fetch(url)
      const data = await response.json()
      const obj = {} as any
      data[0].timeSeries[0].areas.forEach((item: any) => {
        obj[item.area.name] = item
      })
      setForecast(obj[area] as any || {})

      // timeArrのセット
      const _timeArr = data[0].timeSeries[0].timeDefines.map((item: string) => {
        const date = new Date(item)
        const hour = date.getHours()
        if (hour === 0) {
          return `${date.getMonth() + 1}月${date.getDate()}日`
        }
        return `${date.getMonth() + 1}月${date.getDate()}日 ${hour}時`
      })
      setTimeArr(_timeArr as string[])
      // areaArrのセット
      const _areaArr = data[0].timeSeries[0].areas.map((item: any) => {
        return item.area.name
      })
      if (areaArr.length === _areaArr.length) {
        return
      }
      setAreaArr(_areaArr as any[])
    }
    fetchForecast(prefecture).catch((error) => { console.error(error) })
    
  }
  , [tableObj, prefecture, area])


  useEffect(() => {
    if (areaArr.length === 0) {
      return
    }
    setArea(areaArr[0])
  } , [areaArr])

  const imgObj = {
    100: require('../wx/100.png.png'),
    101: require('../wx/101.png.png'),
    102: require('../wx/102.png.png'),
    104: require('../wx/104.png.png'),
    110: require('../wx/110.png.png'),
    112: require('../wx/112.png.png'),
    115: require('../wx/115.png.png'),
    200: require('../wx/200.png.png'),
    201: require('../wx/201.png.png'),
    202: require('../wx/202.png.png'),
    204: require('../wx/204.png.png'),
    210: require('../wx/210.png.png'),
    212: require('../wx/212.png.png'),
    215: require('../wx/215.png.png'),
    300: require('../wx/300.png.png'),
    301: require('../wx/301.png.png'),
    302: require('../wx/302.png.png'),
    303: require('../wx/303.png.png'),
    308: require('../wx/308.png.png'),
    311: require('../wx/311.png.png'),
    313: require('../wx/313.png.png'),
    314: require('../wx/314.png.png'),
    400: require('../wx/400.png.png'),
    401: require('../wx/401.png.png'),
    402: require('../wx/402.png.png'),
    403: require('../wx/403.png.png'),
    406: require('../wx/406.png.png'),
    411: require('../wx/411.png.png'),
    413: require('../wx/413.png.png'),
    414: require('../wx/414.png.png')
  } as Record<number, any>

  const handlePress = (area: string): void => {
    setArea(area)
  }
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.title}>
          <Text style={styles.titleText}>3日間予報</Text>
        </View>
        <View style={styles.select}>
          {
            areaArr.map((item: any, index: number) => {
              return (
                <TouchableOpacity key={index} onPress={() => { handlePress(item) }}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
        <View style={styles.forecastContainer}>
          <ScrollView style={styles.scrollForecast} horizontal={true}>
            <View style={styles.scrollInner}>
              {
                forecast.weatherCodes === undefined ? <></> :
                timeArr.map((item: any, index: number) => {
                  return (
                    <View style={styles.forecast} key={index}>
                      <View style={styles.date}>
                        <Text>{timeArr[index]}</Text>
                      </View>
                      <View style={styles.icon}>
                        <Image
                          style={{ width: 100, height: 100 }}
                          source={imgObj[forecast.weatherCodes[index]]}
                        />
                      </View>
                      <View style={styles.pops}>
                        <Text>{telops[forecast.weatherCodes[index]][3]}</Text>
                      </View>
                    </View>
                  )
                })
              }
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
    borderTopWidth: 1,
  },
  pops: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Forecast3days
