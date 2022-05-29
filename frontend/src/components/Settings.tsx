import { Box, Stack } from '@mui/material'
import Navbar from './Navbar'
import SettingNav from './Settings/SettingNav'
import { useSearchParams } from 'react-router-dom'
import Projects from './Settings/Projects'
import { Project } from '../redux/Types'

type SettingProps = {
  project?: Project
}

const Settings = ({ project }: SettingProps) => {
  const [searchParams] = useSearchParams()
  let tab = searchParams.get('tab')

  const setTab = () => {
    switch (tab) {
      case 'projects':
        return <Projects project={project} />
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
