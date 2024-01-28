import { View, Text, StyleSheet } from 'react-native'

const AmedasCard = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View>
          <Text style={styles.placeText}>東京</Text>
        </View>
        <View>
          <Text style={styles.timeText}>20時10分</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.icon}></View>
        <View style={styles.value}>
          <View style={styles.valueItem}>
            <Text style={styles.valueText}>気温：</Text>
            <Text style={styles.valueText}>30℃</Text>
          </View>
          <View style={styles.valueItem}>
            <Text style={styles.valueText}>風向：</Text>
            <Text style={styles.valueText}>北西</Text>
          </View>
          <View style={styles.valueItem}>
            <Text style={styles.valueText}>風速：</Text>
            <Text style={styles.valueText}>3m/s</Text>
          </View>
          <View style={styles.valueItem}>
            <Text style={styles.valueText}>湿度：</Text>
            <Text style={styles.valueText}>40%</Text>
          </View>
          <View style={styles.valueItem}>
            <Text style={styles.valueText}>雨量：</Text>
            <Text style={styles.valueText}>0mm</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

// カードのスタイル
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '95%',
    marginTop: 5,
    height: 300,
    borderRadius: 10
  },
  info: {
    height: 50,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10
  },
  placeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#226387'
  },
  timeText: {
    fontSize: 16
  },
  body: {
    width: '100%',
    height: 250,
    flexDirection: 'row'
  },
  icon: {
    width: '50%',
    height: 250,
    backgroundColor: '#828282'
  },
  value: {
    width: '50%',
    height: 250,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  valueItem: {
    flexDirection: 'row',
    width: '50%'
  },
  valueText: {
    fontSize: 25
  }
})

export default AmedasCard
