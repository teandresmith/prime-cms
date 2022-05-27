import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Stack } from '@mui/material'
import Navbar from './Navbar'
import CManageNav from './CM/CManageNav'
import CMViewInfo from './CM/CMViewInfo'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { setCurrentData } from '../redux/states/cmState'

type Props = {}

const CMView = (props: Props) => {
  const params = useParams()

  const dispatch = useAppDispatch()
  const currentCollection = useAppSelector(
    (state) => state.cm.currentCollection
  )
  const currentData = useAppSelector((state) => state.cm.currentData)

  React.useEffect(() => {
    const id = params?.id
    let data = currentCollection?.data?.find(
      (value) => value?.id === parseInt(id as string)
    )

    dispatch(setCurrentData({ data: data }))
  }, [params?.id, dispatch])

  return (
    <Box
      component='div'
      sx={{ display: 'flex', width: '100%', height: '100%' }}
    >
      <Navbar />
      <Stack direction={'row'} sx={{ width: '95%' }}>
        <CManageNav />
        {Object.keys(currentData).length !== 0 && <CMViewInfo />}
      </Stack>
    </Box>
  )
}

export default CMView
