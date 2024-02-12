import { View, Text, Linking, StyleSheet } from 'react-native'
import FooterButton from './FooterButton'
import { AntDesign } from '@expo/vector-icons'

interface Props {
  url: string
}

const Footer = (props: Props): JSX.Element => {
  const { url } = props
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <FooterButton labelText='アメダス' render='/wx/amedas' icon={<AntDesign name="dashboard" size={40}/>}/>
        <FooterButton labelText='今日/明日' render='/wx/tommorrow' icon={<AntDesign name="cloudo" size={40}/>} />
        <FooterButton labelText='週間' render='/wx/week' icon={<AntDesign name="calendar" size={40}/>} />
      </View>
      <View>
      <Text style={{ color: 'blue' }} onPress={() => { Linking.openURL(url) }}>
          出典：気象庁ホームページ
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 100
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
})

export default Footer
