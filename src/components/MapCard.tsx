import MapView, { Marker } from 'react-native-maps'
import { View, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'

type Amedas = {
  [key: string]: {
    id: string
    name: string
    lat: number[]
    lon: number[]
    type: string
  }
}

const MapComponent = (): JSX.Element => {
  const [zoomLevel, setZoomLevel] = useState(10)
  const [amedasData, setAmedasData] = useState([])

  const handleRegionChange = (region: any): void => {
    const newZoomLevel = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2)
    setZoomLevel(newZoomLevel)
  }

  useEffect(() => {
    const fetchAmedas = async () => {
      const url = 'https://www.jma.go.jp/bosai/amedas/const/amedastable.json'
      const data: Amedas = await fetch(url)
        .then(async (response) => await response.json())
      const amedasArr = []
      for (const key in data) {
        const type = data[key].type
        if (type === 'A') {
          amedasArr.push(data[key])
        }
      }
      setAmedasData(amedasArr)
    }
    fetchAmedas()
  }, [])

  const handlePress = (e: any): void => {
    console.log('ddd')
  }

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
          amedasData.map((amedas: any) => (
            <Marker
              coordinate={{
                latitude: amedas.lat[0] + amedas.lat[1] / 60,
                longitude: amedas.lon[0] + amedas.lon[1] / 60
              }}
              onPress={handlePress}
              key = {amedas.id}
            />
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
  }
})
