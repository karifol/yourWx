import { View, Text, StyleSheet } from 'react-native'

interface Props {
  prefecture: string
}

const PrefectureCard = (props: Props): JSX.Element => {
  const { prefecture } = props
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{ prefecture }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold'
  }
})

export default PrefectureCard
