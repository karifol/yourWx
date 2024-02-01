import { View, StyleSheet } from 'react-native'
import FooterButton from './FooterButton'
import Icon from 'react-native-vector-icons/AntDesign'

const Footer = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <FooterButton labelText='アメダス' render='/wx/amedas' icon={<Icon name="dashboard" size={40}/>}/>
      <FooterButton labelText='今日/明日' render='/wx/week' icon={<Icon name="cloudo" size={40}/>} />
      <FooterButton labelText='週間' render='/wx/week' icon={<Icon name="calendar" size={40}/>} />
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: '#efefef',
    backgroundColor: 'white',
    alignItems: 'flex-start',
    paddingTop: 5,
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 0
  }
})

export default Footer
