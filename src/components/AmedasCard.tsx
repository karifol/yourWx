import { StyleSheet, View, Dimensions, Text } from 'react-native'
// import { LineChart } from 'react-native-chart-kit'

interface Props {
  graphObj: any
  cardObj: any
}

// グラフの色や罫線等の設定
// const chartConfig = {
//   backgroundColor: '#fff',
//   backgroundGradientFrom: '#fff',
//   backgroundGradientTo: '#fff',
//   decimalPlaces: 1,
//   strokeWidth: 0.5,
//   fillShadowGradient: '#fff',
//   color: () => '#000000',
//   propsForLabels: {
//     fontSize: 8
//   },
//   yAxisLabel: '0'
// }

const AmedasCard = (props: Props): JSX.Element => {
  const { cardObj, graphObj } = props

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View>
          <Text style={styles.placeText}>{cardObj.name}</Text>
        </View>
        <View>
          <Text style={styles.timeText}>{cardObj.time}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.graph}>
          {/* {
            graphObj.data.length !== 0
              ? <LineChart
              data={{
                labels: [...graphObj.label],
                datasets: [{
                  data: graphObj.data,
                  color: (opacity = 1) => 'rgba(230, 22, 115, 1)',
                  strokeWidth: 2
                }]
              }}
              width={Dimensions.get('window').width * 0.6}
              height={250}
              yAxisSuffix={'℃'}
              yAxisInterval={2}
              chartConfig={chartConfig}
              withInnerLines={true}
            />
              : <Text>データがありません</Text>
          } */}
        </View>
        <View style={styles.value}>
          <View style={styles.valueItem}>
            <Text style={styles.valueText}>気温：</Text>
            <Text style={styles.valueText}>{cardObj.temp[0]}℃</Text>
          </View>
          <View style={styles.valueItem}>
            <Text style={styles.valueText}>風向：</Text>
            <Text style={styles.valueText}>{cardObj.windDirectionStr[0]}</Text>
          </View>
          <View style={styles.valueItem}>
            <Text style={styles.valueText}>風速：</Text>
            <Text style={styles.valueText}>{cardObj.wind[0]}m/s</Text>
          </View>
          <View style={styles.valueItem}>
            <Text style={styles.valueText}>湿度：</Text>
            <Text style={styles.valueText}>{cardObj.humidity[0]}%</Text>
          </View>
          <View style={styles.valueItem}>
            <Text style={styles.valueText}>雨量：</Text>
            <Text style={styles.valueText}>{cardObj.precipitation1h[0]}mm</Text>
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
  graph: {
    width: '30%',
    height: 250
  },
  value: {
    width: '40%',
    height: 250,
    marginLeft: 20,
    justifyContent: 'space-around'
  },
  valueItem: {
    flexDirection: 'row',
    width: '50%'
  },
  valueText: {
    fontSize: 20
  }
})

export default AmedasCard
