import MapView, { Marker } from 'react-native-maps'
import { View, StyleSheet, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'

type Amedas = Record<string, {
  id: string
  name: string
  lat: number[]
  lon: number[]
  type: string
}>

interface Props {
  setCardObj: React.Dispatch<React.SetStateAction<any>> // アメダスカードデータ更新
  setGraphObj: React.Dispatch<React.SetStateAction<any>> // グラフデータ更新
}

const MapComponent = (props: Props): JSX.Element => {
  const [tableArr, setTableArr] = useState([] as any) // テーブルデータ
  const [zoomLevel, setZoomLevel] = useState(10) // 地図ズームレベル
  const [timeLatest, setTimeLatest] = useState('' as string) // 最新時刻
  const [amedasLatest, setAmedasLatest] = useState({} as any) // 最新データ
  const [amedasPastObj, setAmedasPastObj] = useState({} as any) // 過去データ
  const { setCardObj, setGraphObj } = props

  /**
   * 風向取得
   * @param degree - 風向
   * @returns 風向
   */
  const getDirection = (degree: number): string => {
    const directions = ['北', '北北東', '北東', '東北東', '東', '東南東', '南東', '南南東', '南', '南南西', '南西', '西南西', '西', '西北西', '北西', '北北西', '北']
    const direction = directions[degree]
    return direction
  }

  /**
   * 地図ズームレベル変更時
   * @param region - 地図情報
   * @returns void
   */
  const handleRegionChange = (region: any): void => {
    const newZoomLevel = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2)
    setZoomLevel(newZoomLevel)
  }

  const fetchAmedas = async (latestTime: string): Promise<void> => {
    const timeLatest = latestTime
    const year = timeLatest.slice(0, 4)
    const month = timeLatest.slice(4, 6)
    const day = timeLatest.slice(6, 8)
    const hour = timeLatest.slice(8, 10)
    const min = timeLatest.slice(10, 12)
    const date = new Date(`${year}-${month}-${day}T${hour}:${min}:00`)
    const obj = {} as any
    for (let i = 0; i < 6; i++) {
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + date.getDate()).slice(-2)
      const hour = ('0' + date.getHours()).slice(-2)
      const min = ('0' + date.getMinutes()).slice(-2)
      const time = `${year}${month}${day}${hour}${min}00`
      const data = await fetch(`https://www.jma.go.jp/bosai/amedas/data/map/${time}.json`)
        .then(async (response) => await response.json())
      // データ格納
      obj[`${hour}:${min}`] = data
      date.setMinutes(date.getMinutes() - 10)
      // 最新データ
      if (i === 0) {
        setAmedasLatest(data)
      }
    }
    setAmedasPastObj(obj)
  }

  const updateCardObj = (id: number): void => {
    if (tableArr.length === 0) {
      return
    }
    const name = tableArr.find((amedas: any) => amedas.id === String(id)).kjName
    const amedas = amedasLatest[id]
    amedas.name = name
    amedas.id = id
    // 最新時刻
    const hour = timeLatest.slice(8, 10)
    const min = timeLatest.slice(10, 12)
    amedas.time = `${hour}時${min}分`
    // 風向
    const windDirection = getDirection(amedas.windDirection[0] as number)
    amedas.windDirectionStr = [windDirection]
    // 更新
    setCardObj(amedas) // AmedasCard右側で使うデータ
  }

  const updateGraphObj = (id: number): void => {
    if (amedasPastObj.length === 0) {
      return
    }
    const labelArr = [] as string[]
    const dataArr = [] as number[]
    for (const key in amedasPastObj) {
      const value = amedasPastObj[key][id].temp[0] as number
      dataArr.push(value)
      labelArr.push(key)
    }
    dataArr.reverse()
    labelArr.reverse()
    setGraphObj({
      data: dataArr,
      label: labelArr
    })
  }

  const handlePress = async (e: any): Promise<void> => {
    const id = e.nativeEvent.id as number
    updateCardObj(id) // アメダスカードデータ更新
    updateGraphObj(id) // グラフデータ更新
  }

  /**
   * 最新時刻取得
   * @returns void
   */
  const fetchLatestTime = async (): Promise<string> => {
    const url = 'https://www.jma.go.jp/bosai/amedas/data/latest_time.txt'
    const timeLatest = await fetch(url)
      .then(async (response) => await response.text())
    const date = new Date(timeLatest)
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    const hour = ('0' + date.getHours()).slice(-2)
    const min = ('0' + date.getMinutes()).slice(-2)
    const timeLatestStr = `${year}${month}${day}${hour}${min}00`
    setTimeLatest(timeLatestStr)
    return timeLatestStr
  }

  /**
   * テーブルデータ取得
   * @returns void
   */
  const fetchTable = async (): Promise<void> => {
    const url = 'https://www.jma.go.jp/bosai/amedas/const/amedastable.json'
    const data: Amedas = await fetch(url)
      .then(async (response) => await response.json())
    const amedasArr: any = []
    for (const key in data) {
      const type = data[key].type
      // 官署データのみ取得
      if (type === 'A') {
        data[key].id = key
        amedasArr.push(data[key])
      }
    }
    setTableArr(amedasArr)
  }

  /**
   * 初回ロード時に実行
   * 1. テーブルデータ取得
   * 2. データ最新時刻取得
   */
  const handleLoad = async (): Promise<void> => {
    await fetchTable() // テーブルデータ取得
    const latestTime = await fetchLatestTime() // データ最新時刻取得
    await fetchAmedas(latestTime) // アメダスデータ取得
  }

  useEffect(() => {
    handleLoad().catch((error) => { console.error(error) })
  }, [])

  useEffect(() => {
    updateCardObj(44132) // アメダスカードデータ更新
  }
  , [amedasLatest])

  useEffect(() => {
    updateGraphObj(44132) // グラフデータ更新
  }
  , [amedasPastObj])

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: 35.681236,
          longitude: 139.767125,
          latitudeDelta: 1,
          longitudeDelta: 1
        }}
        onRegionChangeComplete={handleRegionChange}
      >
        {
          tableArr.map((amedas: any) => (
            <Marker
              coordinate={{
                latitude: amedas.lat[0] + amedas.lat[1] / 60,
                longitude: amedas.lon[0] + amedas.lon[1] / 60
              }}
              onPress={ handlePress as any}
              key = {amedas.id}
              title={amedas.kjName}
              identifier={amedas.id.toString()}
            >
              <View style={styles.iconContainer}>
                <FontAwesome5
                  name='umbrella'
                  size={ 200 / zoomLevel }
                  color="blue"
                  borderColor="black"
                />
              </View>
            </Marker>
          ))
        }
      </MapView>
    </View>
  )
}

export default MapComponent

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: Dimensions.get('window').height - 400 - 120,
    marginTop: 5,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },
  mapStyle: {
    width: '100%',
    height: '100%'
  },
  iconContainer: {
    backgroundColor: 'white',
    padding: 3,
    borderRadius: 100,
    borderWidth: 0.5
  }
})
