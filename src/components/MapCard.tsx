import MapView from 'react-native-maps'
import { View, StyleSheet } from 'react-native'

const MapComponent = (): JSX.Element => {
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
      />
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
