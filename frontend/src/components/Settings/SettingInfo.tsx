import React from 'react'
import { Box, Typography } from '@mui/material'

const SettingInfo = () => {
  return (
    <Box
      component='div'
      sx={{ pl: 4, pt: 2, width: '100%', overflowY: 'scroll' }}
    >
      <Box component='div'>
        <Typography variant='h2' sx={{ fontSize: 44, ml: 0 }}>
          Settings
        </Typography>
      </Box>
      <Box sx={{ height: '200vh' }}></Box>
      <Box>
        <Typography component='div' id={'projects'}>
          Some Text
        </Typography>
      </Box>
    </Box>
  )
}

export default SettingInfo
