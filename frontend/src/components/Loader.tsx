import React from 'react'
import { CircularProgress, Box } from '@mui/material'

type Props = {}

const Loader = (props: Props) => {
  return (
    <Box component='div'>
      <CircularProgress size={50} />
    </Box>
  )
}

export default Loader
