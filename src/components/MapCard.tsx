import MapView, { Marker } from 'react-native-maps'
import { View, StyleSheet } from 'react-native'
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
  setAmedasData: React.Dispatch<React.SetStateAction<any>>
}

const MapComponent = (props: Props): JSX.Element => {
  const [zoomLevel, setZoomLevel] = useState(10)
  const [responseData, setResponseData] = useState([] as any)
  const [timeLatest, setTimeLatest] = useState('' as string)

  const { setAmedasData } = props

  const getDirection = (degree: number): string => {
    const directions = ['北', '北北東', '北東', '東北東', '東', '東南東', '南東', '南南東', '南', '南南西', '南西', '西南西', '西', '西北西', '北西', '北北西']
    const direction = directions[degree]
    return direction
  }

  const handleRegionChange = (region: any): void => {
    const newZoomLevel = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2)
    setZoomLevel(newZoomLevel)
  }

  const handlePress = async (e: any): Promise<void> => {
    const id = e.nativeEvent.id
    const name = responseData.find((amedas: any) => amedas.id === id).kjName
    const data = await fetch(`https://www.jma.go.jp/bosai/amedas/data/map/${timeLatest}.json`)
      .then(async (response) => await response.json())
    const amedas = data[id]
    amedas.name = name
    const windDirection = getDirection(amedas.windDirection[0] as number)
    amedas.windDirection = [windDirection]
    setAmedasData(amedas)

    // 過去データ
    const date = new Date(timeLatest)
    date.setHours(date.getHours() - 1)
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    const hour = ('0' + date.getHours()).slice(-2)
    const min = ('0' + date.getMinutes()).slice(-2)
    const timePast = `${year}${month}${day}${hour}${min}00`
    const urlPast = `https://www.jma.go.jp/bosai/amedas/data/point/${id}/${day}_${hour}.json`
    console.log(urlPast)
  }

  useEffect(() => {
    const fetchAmedas = async (): Promise<void> => {
      const url = 'https://www.jma.go.jp/bosai/amedas/const/amedastable.json'
      const data: Amedas = await fetch(url)
        .then(async (response) => await response.json())
      const amedasArr: any = []
      for (const key in data) {
        const type = data[key].type
        if (type === 'A') {
          data[key].id = key
          amedasArr.push(data[key])
        }
      }
      setResponseData(amedasArr)
    }
    const fetchLatestTime = async (): Promise<void> => {
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
    }
    fetchAmedas()
      .catch((error) => {
        console.error(error)
      })
    fetchLatestTime()
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: 35.681236,
          longitude: 139.767125,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        onRegionChangeComplete={handleRegionChange}
      >
        {
          responseData.map((amedas: any) => (
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
    height: 300,
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
