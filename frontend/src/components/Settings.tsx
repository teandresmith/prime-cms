import { Box, Stack } from '@mui/material'
import { useAppDispatch } from '../hooks/reduxHooks'
import Navbar from './Navbar'
import SettingNav from './Settings/SettingNav'
import { useSearchParams } from 'react-router-dom'
import Projects from './Settings/Projects'

type Props = {}

const Settings = (props: Props) => {
  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()

  let tab = searchParams.get('tab')

  const setTab = () => {
    switch (tab) {
      case 'projects':
        return <Projects />
      default:
        return
    }
  }

  return (
    <Box
      component='div'
      sx={{ display: 'flex', width: '100%', height: '100%' }}
    >
      <Navbar />
      <Stack direction={'row'} sx={{ width: '95%' }}>
        <SettingNav />
        {setTab()}
      </Stack>
    </Box>
  )
}

export default Settings
