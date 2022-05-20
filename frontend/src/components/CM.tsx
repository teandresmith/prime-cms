import { useEffect } from 'react'
import { Box, Stack } from '@mui/material'
import Navbar from './Navbar'
import CManageNav from './CM/CManageNav'
import CManageInfo from './CM/CManageInfo'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { setCurrentCollection } from '../redux/states/cmState'
import NoCollectionSelected from './NoCollectionSelected'

type Props = {}

const CM = (props: Props) => {
  const [searchParams] = useSearchParams()
  let collection = searchParams.get('collection')

  const dispatch = useAppDispatch()

  const currentCollection = useAppSelector(
    (state) => state.cm.currentCollection
  )

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
        <CManageNav />
        {collection !== null ? <CManageInfo /> : <NoCollectionSelected />}
      </Stack>
    </Box>
  )
}

export default CM
