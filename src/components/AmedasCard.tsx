import { useEffect, useState } from 'react'
import { StyleSheet, View, Dimensions, Text } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

interface Props {
  amedasData: any
  timeArray: string[]
  amedasPastObj: any
}

// グラフの色や罫線等の設定
const chartConfig = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 1,
  strokeWidth: 0.5,
  fillShadowGradient: '#fff',
  color: () => '#000000',
  propsForLabels: {
    fontSize: 8
  },
  yAxisLabel: '0'
}

const AmedasCard = (props: Props): JSX.Element => {
  const [datasets, setDatasets] = useState({
    data: [],
    label: []
  } as any)

  const { amedasData, timeArray, amedasPastObj } = props

  useEffect(() => {
    if (timeArray.length === 0) {
      return
    }
    if (amedasPastObj.init === true) {
      return
    }
    const id = amedasData.id
    const dataArr = [] as number[]
    const labelArr = [] as string[]
    for (let i = 0; i < timeArray.length; i++) {
      const time = timeArray[i]
      dataArr.push(amedasPastObj[time][id].temp[0] as number)
      labelArr.push(time)
    }
    setDatasets({
      data: dataArr,
      label: labelArr
    })
  }
  , [amedasData])

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View>
          <Text style={styles.placeText}>{amedasData.name}</Text>
        </View>
        <View>
          <Text style={styles.timeText}>{amedasData.time}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.graph}>
          {
            datasets.data.length !== 0
              ? <LineChart
              data={{
                labels: [...datasets.label],
                datasets: [{
                  data: datasets.data,
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
          }
        </View>
        <View style={styles.value}>
          <View style={styles.valueItem}>
            <Text style={styles.valueText}>気温：</Text>
            <Text style={styles.valueText}>{amedasData.temp[0]}℃</Text>
          </View>
          <View style={styles.valueItem}>
            <Text style={styles.valueText}>風向：</Text>
            <Text style={styles.valueText}>{amedasData.windDirection[0]}</Text>
          </View>
          <View style={styles.valueItem}>
            <Text style={styles.valueText}>風速：</Text>
            <Text style={styles.valueText}>{amedasData.wind[0]}m/s</Text>
          </View>
          <View style={styles.valueItem}>
            <Text style={styles.valueText}>湿度：</Text>
            <Text style={styles.valueText}>{amedasData.humidity[0]}%</Text>
          </View>
          <View style={styles.valueItem}>
            <Text style={styles.valueText}>雨量：</Text>
            <Text style={styles.valueText}>{amedasData.precipitation1h[0]}mm</Text>
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
    width: '60%',
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
