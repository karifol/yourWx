import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { router } from 'expo-router'

interface Props {
  labelText: string
  render: string
}

const FooterButton = (props: Props): JSX.Element => {
  const { labelText, render } = props
  const handlePress = (): void => {
    router.push(render)
  }
  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <View style={styles.icon}></View>
      <View style={styles.label}>
        <Text style={styles.labelText}>{labelText}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 70
  },
  icon: {
    width: 50,
    height: 50,
    backgroundColor: '#828282',
    borderRadius: 25
  },
  label: {
    paddingTop: 5
  },
  labelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#818181'
  }
})

export default FooterButton
