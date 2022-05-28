import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Stack } from '@mui/material'
import Navbar from './Navbar'
import CManageNav from './CM/CManageNav'
import CMViewInfo from './CM/CMViewInfo'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { useGetCollectionContentDataQuery } from '../redux/api/projectContentDataAPI'
import { useGetAllCollectionContentTypesQuery } from '../redux/api/projectContentTypeAPI'
import { Project } from '../redux/Types'

type CMViewProps = {
  project: Project
}

const CMView = ({ project }: CMViewProps) => {
  const params = useParams()

  const currentProjectName = useAppSelector(
    (state) => state.cm.currentProjectName
  )
  const currentCollection = useAppSelector(
    (state) => state.cm.currentCollection
  )

  const { data, isLoading } = useGetCollectionContentDataQuery({
    projectName: currentProjectName,
    collectionName: currentCollection,
    contentId: params?.id,
  })

  const { data: contentType, isLoading: contentLoading } =
    useGetAllCollectionContentTypesQuery({
      projectName: currentProjectName,
      collectionName: currentCollection,
    })

  return (
    <Box
      component='div'
      sx={{ display: 'flex', width: '100%', height: '100%' }}
    >
      <Navbar />
      <Stack direction={'row'} sx={{ width: '95%' }}>
        <CManageNav project={project} />
        {!isLoading && !contentLoading && (
          <CMViewInfo data={data?.result} contentTypes={contentType?.result} />
        )}
      </Stack>
    </Box>
  )
}

export default CMView
