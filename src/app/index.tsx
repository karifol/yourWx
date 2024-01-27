import { Redirect } from 'expo-router'

const index = (): JSX.Element => {
  // router.replace('/wx/week')
  return <Redirect href='/wx/week' />
}

export default index
