import { Box, Stack } from '@mui/material'
import Navbar from './Navbar'
import CTypeInfo from './CType/CTypeInfo'
import CTypeNav from './CType/CTypeNav'
import { useAppDispatch } from '../hooks/reduxHooks'
import { setCurrentCollection } from '../redux/states/cmState'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import NoCollectionSelected from './NoCollectionSelected'
import { Project } from '../redux/Types'
import { useGetAllCollectionContentTypesQuery } from '../redux/api/projectContentTypeAPI'
import Loader from './Loader'

type CTypeProps = {
  project: Project
}

const CType = ({ project }: CTypeProps) => {
  const [searchParams] = useSearchParams()
  const [skip, setSkip] = useState(true)
  let collection = searchParams.get('collection')

  const { data, isLoading } = useGetAllCollectionContentTypesQuery(
    { projectName: project?.name, collectionName: collection },
    { skip: skip }
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (collection !== null && project) {
      setSkip(false)
      dispatch(setCurrentCollection({ collection: collection }))
    }
    if (collection === null || !project) {
      setSkip(true)
    }
  }, [collection, project])
  return (
    <Box
      component='div'
      sx={{ display: 'flex', width: '100%', height: '100%' }}
    >
      <Navbar />
      <Stack direction={'row'} sx={{ width: '95%' }}>
        <CTypeNav project={project} />
        {collection === null ? (
          <NoCollectionSelected />
        ) : isLoading ? (
          <Loader />
        ) : (
          <CTypeInfo contentTypes={data?.result} collectionName={collection} />
        )}
      </Stack>
    </Box>
  )
}

export default CType
