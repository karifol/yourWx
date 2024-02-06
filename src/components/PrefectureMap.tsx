import MapView, { Polygon } from 'react-native-maps'
import { View, StyleSheet, Dimensions } from 'react-native'
import geojson from '../components/prefecture.json'

interface Props {
  prefecture: string // 都道府県
  setPrefecture: React.Dispatch<React.SetStateAction<string>> // 都道府県更新
}

const PrefectureMap = (props: Props): JSX.Element => {
  const { prefecture, setPrefecture } = props
  const handlePress = (prefecture: string): void => {
    setPrefecture(prefecture)
  }
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
          {geojson.features.map((feature, index) => (
            <View key={index}>
              {
                feature.geometry.type === 'Polygon'
                  ? (
                      feature.geometry.coordinates.map((polygon, index) => (
                        <Polygon
                          key={index}
                          coordinates={polygon.map((coord) => ({ latitude: coord[1], longitude: coord[0] }))}
                          fillColor= {feature.properties.name === prefecture ? 'rgb(244, 133, 211)' : 'rgb(85, 218, 92)'}
                          strokeColor="rgba(0, 0, 0, 0.3)"
                          strokeWidth={2}
                          onPress={() => { handlePress(feature.properties.name) }}
                        />
                      )))
                  : (
                      feature.geometry.coordinates.map((multiPolygon, index) =>
                        multiPolygon.map((polygon, index2) => (
                          <Polygon
                            key={`${index}-${index2}`}
                            coordinates={polygon.map((coord) => ({ latitude: coord[1], longitude: coord[0] }))}
                            fillColor= {feature.properties.name === prefecture ? 'rgb(244, 133, 211)' : 'rgb(85, 218, 92)'}
                            strokeColor="rgba(0, 0, 0, 0.3)"
                            strokeWidth={2}
                            onPress={() => { handlePress(feature.properties.name) }}
                          />
                        ))
                      )
                    )}
            </View>
          ))}
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
