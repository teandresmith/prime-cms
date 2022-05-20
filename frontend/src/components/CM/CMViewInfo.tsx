import React from 'react'
import { Box, Typography } from '@mui/material'
import { useAppSelector } from '../../hooks/reduxHooks'

type Props = {}

const CMViewInfo = (props: Props) => {
  const currentData = useAppSelector((state) => state.cm.currentData)

  return (
    <Box component='div' sx={{ pl: 4, pt: 2, width: '75%' }}>
      <Box component='div'>
        <Typography variant='body1'>Go Back</Typography>
        <Typography variant='h2' sx={{ fontSize: 44, ml: 0 }}>
          {currentData[Object.keys(currentData)[1]]}
        </Typography>
      </Box>
    </Box>
  )
}

export default CMViewInfo
