import React from 'react'
import { Box, Stack, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const SettingNav = () => {
  return (
    <Box
      component='div'
      sx={{
        width: '20%',
        borderRight: '2px solid rgba(0,0,0,0.1)',
        pt: 2,
      }}
    >
      <Stack direction='row' sx={{ pl: 2 }}>
        <Typography variant='h5'>Settings</Typography>
      </Stack>
      <Stack direction='column' sx={{ pt: 1 }}>
        <ul>
          <li>
            <Button
              component={Link as React.ElementType<any>}
              to='/settings?tab=projects'
              sx={{ textTransform: 'none', color: 'black' }}
            >
              Projects
            </Button>
          </li>
        </ul>
      </Stack>
    </Box>
  )
}

export default SettingNav
