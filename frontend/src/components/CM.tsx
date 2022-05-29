import { useEffect, useState } from 'react'
import { Box, Stack } from '@mui/material'
import Navbar from './Navbar'
import CManageNav from './CM/CManageNav'
import CManageInfo from './CM/CManageInfo'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '../hooks/reduxHooks'
import { setCurrentCollection } from '../redux/states/cmState'
import { Project } from '../redux/Types'
import NoCollectionSelected from './NoCollectionSelected'
import { useGetAllCollectionContentDataQuery } from '../redux/api/projectContentDataAPI'
import Loader from './Loader'
import { useGetAllCollectionContentTypesQuery } from '../redux/api/projectContentTypeAPI'

type CMProps = {
  project: Project
}

const CM = ({ project }: CMProps) => {
  const [searchParams] = useSearchParams()
  const [skip, setSkip] = useState(true)
  let collection = searchParams.get('collection')

  const { data, isLoading } = useGetAllCollectionContentDataQuery(
    { projectName: project?.name, collectionName: collection },
    { skip: skip }
  )

  const { data: contentType } = useGetAllCollectionContentTypesQuery(
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
        <CManageNav project={project} />
        {collection === null ? (
          <NoCollectionSelected />
        ) : isLoading ? (
          <Loader />
        ) : (
          <CManageInfo
            contentData={data?.result}
            contentTypes={contentType?.result}
            collectionName={collection}
          />
        )}
      </Stack>
    </Box>
  )
}

export default CM
