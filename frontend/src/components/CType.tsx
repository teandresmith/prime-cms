import { Box, Stack } from '@mui/material'
import Navbar from './Navbar'
import CTypeInfo from './CType/CTypeInfo'
import CTypeNav from './CType/CTypeNav'
import { useAppDispatch } from '../hooks/reduxHooks'
import { setCurrentCollection } from '../redux/states/cmState'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import NoCollectionSelected from './NoCollectionSelected'

type Props = {}

const CType = (props: Props) => {
  const [searchParams] = useSearchParams()
  let collection = searchParams.get('collection')

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (collection !== null) {
      dispatch(setCurrentCollection({ collection: collection }))
    }
  }, [collection])
  return (
    <Box
      component='div'
      sx={{ display: 'flex', width: '100%', height: '100%' }}
    >
      <Navbar />
      <Stack direction={'row'} sx={{ width: '95%' }}>
        <CTypeNav />
        {collection !== null ? <CTypeInfo /> : <NoCollectionSelected />}
      </Stack>
    </Box>
  )
}

export default CType
