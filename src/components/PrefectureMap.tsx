import MapView, { Polygon } from 'react-native-maps'
import { View, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect } from 'react'

interface Props {
  setPrefecture: React.Dispatch<React.SetStateAction<string>> // 都道府県更新
}

const PrefectureMap = (props: Props): JSX.Element => {
  const { setPrefecture } = props
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 38.5,
            longitude: 137,
            latitudeDelta: 15,
            longitudeDelta: 15
          }}
        >
        </MapView>
      </View>
    </View>
  )
}

export default PrefectureMap

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    height: Dimensions.get('window').height - 400 - 120,
    marginTop: 5
  },
  mapContainer: {
    width: '95%',
    height: '100%',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden'
  },
  mapStyle: {
    width: '100%',
    height: '100%',
    marginLeft: 10,
    marginRight: 10
  }
})
