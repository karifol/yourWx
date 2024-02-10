import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import { useEffect, useState } from 'react'
import _telops from './weatherCode'

interface Props {
  prefecture: string
  imgObj: Record<number, any>
}

const telops = _telops as Record<number, string[]>

const ForecastWeek = (props: Props): JSX.Element => {
  const { prefecture, imgObj } = props
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
      data[1].timeSeries[0].areas.forEach((item: any) => {
        obj[item.area.name] = item
      })
      setForecast(obj[area] as any || {})

      // timeArrのセット
      const _timeArr = data[1].timeSeries[0].timeDefines.map((item: string) => {
        const date = new Date(item)
        const hour = date.getHours()
        if (hour === 0) {
          return `${date.getMonth() + 1}月${date.getDate()}日`
        }
        return `${date.getMonth() + 1}月${date.getDate()}日 ${hour}時`
      })
      setTimeArr(_timeArr as string[])
      // areaArrのセット
      const _areaArr = data[1].timeSeries[0].areas.map((item: any) => {
        return item.area.name
      })
      setAreaArr(_areaArr as any[])
    }
    fetchForecast(prefecture).catch((error) => { console.error(error) })
    
  }
  , [prefecture, area, tableObj])

  useEffect(() => {
    if (areaArr.length === 0) {
      return
    }
    setArea(areaArr[0])
  } , [areaArr])

  const handlePress = (area: string): void => {
    setArea(area)
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.title}>
          <Text style={styles.titleText}>週間予報</Text>
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
                timeArr.map((item: any, index: number) => {
                  if (forecast.weatherCodes === undefined) {
                    return null
                  }
                  return (
                    <View style={styles.forecast} key={index}>
                      <View style={styles.date}>
                        <Text>{timeArr[index]}</Text>
                      </View>
                      <View style={styles.icon}>
                        <Image
                          style={{ width: 150, height: 100 }}
                          source={imgObj[telops[forecast.weatherCodes[index]][0]]}
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

export default ForecastWeek
