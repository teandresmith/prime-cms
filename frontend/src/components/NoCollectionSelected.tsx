import { Box, Typography } from '@mui/material'

type Props = {}

const NoCollectionSelected = (props: Props) => {
  return (
    <Box component='div' sx={{ pl: 4, pt: 2, width: '75%' }}>
      <Typography variant='h5'>Please select a collection</Typography>
    </Box>
  )
}

export default NoCollectionSelected
