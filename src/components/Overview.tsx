import { View, Text, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'

interface Props {
  prefecture: string
}

const Overview = (props: Props): JSX.Element => {
  const { prefecture } = props
  const [tableObj, setTableObj] = useState<Record<string, string>>({})
  const [overviewArr, setOverviewArr] = useState<string[]>([])

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

  useEffect(() => {
    fetchTable().catch((error) => { console.error(error) })
  }, [])

  useEffect(() => {
    if (prefecture === '') {
      return
    }
    if (tableObj[prefecture] === undefined) {
      return
    }

    const num = tableObj[prefecture]
    fetchOverview(num)
      .catch((error) => {
        console.log('fetchOverview error')
        console.error(error)
      })
  }, [prefecture, tableObj])

  const fetchOverview = async (num: string): Promise<void> => {
    const url = `https://www.jma.go.jp/bosai/forecast/data/overview_forecast/${num}.json`
    const response = await fetch(url)
    const data = await response.json()
    const textArr = data.text.split('\n')
    setOverviewArr(textArr as string[])
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.title}>
          <Text style={styles.titleText}>概況分</Text>
        </View>
        <View style={styles.content}>
          {
            overviewArr.map((item, index) => {
              return (
                <Text key={index} >{item}</Text>
              )
            })
          }
        </View>
      </View>
    </View>
  )
}

export default Overview

const styles = StyleSheet.create({
  content: {
    width: '100%',
    height: '100%',
    marginTop: 10
  },
  container: {
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    height: 500,
    marginBottom: 10
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
  }
})
