import { CircularProgress, Box } from '@mui/material'

const Loader = () => {
  return (
    <Box component='div'>
      <CircularProgress size={50} />
    </Box>
  )
}

export default Loader
