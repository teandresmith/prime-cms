import { Box, Button, Stack } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../hooks/reduxHooks'

type Props = {}

const Navbar = (props: Props) => {
  const currentProject = useAppSelector((state) => state.cm.currentProject)
  return (
    <Box
      component={'div'}
      sx={{
        backgroundColor: 'rgba(0,0,0,0.85)',
        height: '100vh',
        width: '10%',
        position: 'sticky',
        top: 0,
        left: 0,
      }}
    >
      <Stack direction='column' justifyContent={'center'} sx={{ pt: 1 }}>
        <Button
          sx={{ color: 'white', fontSize: '18px', textTransform: 'lowercase' }}
        >
          prime
        </Button>
        <Box component='div'>
          <Button
            component={Link as React.ElementType<any>}
            to={`/content-management`}
            sx={{
              color: 'white',
              fontSize: '18px',
              textTransform: 'lowercase',
              width: '100%',
            }}
          >
            CManage
          </Button>
          <Button
            component={Link as React.ElementType<any>}
            to={`/content-type`}
            sx={{
              color: 'white',
              fontSize: '18px',
              textTransform: 'lowercase',
              width: '100%',
            }}
          >
            CType
          </Button>
          <Button
            component={Link as React.ElementType<any>}
            to='/databases'
            sx={{
              color: 'white',
              fontSize: '18px',
              textTransform: 'lowercase',
              width: '100%',
            }}
          >
            DBs
          </Button>
          <Button
            component={Link as React.ElementType<any>}
            to={`/settings?tab=projects`}
            sx={{
              color: 'white',
              fontSize: '18px',
              textTransform: 'lowercase',
              width: '100%',
            }}
          >
            Setting
          </Button>
          <Button
            sx={{
              color: 'white',
              fontSize: '18px',
              textTransform: 'lowercase',
              width: '100%',
            }}
          >
            {currentProject}
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}

export default Navbar