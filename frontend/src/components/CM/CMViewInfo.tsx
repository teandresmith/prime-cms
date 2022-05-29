import React from 'react'
import { Box, Stack, Grid, Paper, Typography, Button } from '@mui/material'
import { useAppSelector } from '../../hooks/reduxHooks'
import { useForm } from 'react-hook-form'
import { determineSizeAndComponent } from '../../helpers/formHelper'

import { ContentType, Data } from '../../redux/Types'
import {
  useDeleteCollectionContentDataMutation,
  useEditCollectionContentDataMutation,
} from '../../redux/api/projectContentDataAPI'
import { useNavigate, useParams } from 'react-router-dom'

type CMViewInfoProps = {
  data: Data
  contentTypes: Array<ContentType>
}

const CMViewInfo = ({ data, contentTypes }: CMViewInfoProps) => {
  const methods = useForm()
  const params = useParams()

  const navigate = useNavigate()

  const [editCollectionContentData] = useEditCollectionContentDataMutation()
  const [deleteCollectionContentData] = useDeleteCollectionContentDataMutation()

  const currentCollection = useAppSelector(
    (state) => state.cm.currentCollection
  )
  const currentProjectName = useAppSelector(
    (state) => state.cm.currentProjectName
  )

  const onSubmit = (data: any) => {
    const id = params?.id

    const json = checkForJSON()
    if (json !== undefined) {
      data[json.name] = JSON.parse(data[json.name])
    }

    const contentData = { id, ...data }
    editCollectionContentData({
      projectName: currentProjectName,
      collectionName: currentCollection,
      contentData: { contentData: contentData },
      contentId: id,
    })
  }

  const checkForJSON = () => {
    const json = contentTypes?.find(
      (value: ContentType) => value.type === 'json'
    )
    return json
  }

  const handleDeleteClick = () => {
    const id = params?.id

    if (window.confirm('Do you want to delete this collection item?') == true) {
      deleteCollectionContentData({
        projectName: currentProjectName,
        collectionName: currentCollection,
        contentId: id,
      })
      navigate(-1)
    }
  }

  return (
    <Box component='div' sx={{ pl: 4, pt: 2, width: '75%' }}>
      <Box component='div'>
        <Box component='div'>
          <Button variant='outlined' onClick={() => navigate(-1)}>
            Back
          </Button>
          <Typography variant='h2' sx={{ fontSize: 44, ml: 0 }}>
            {`${currentCollection} - Item id: ${data.id}`}
          </Typography>
        </Box>

        <Paper elevation={4} component='div' sx={{ mt: 3, p: 1, mb: 3 }}>
          <Box component='form' onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid
              container
              rowGap={3}
              alignItems={'center'}
              spacing={1}
              sx={{ pl: 2, pt: 2, pb: 2 }}
            >
              {contentTypes?.map((value: ContentType, index: number) =>
                determineSizeAndComponent(
                  value.type,
                  value.name,
                  index,
                  methods.control,
                  data[value.name]
                )
              )}
            </Grid>
            <Stack direction='row'>
              <Button
                variant='outlined'
                color='info'
                type='submit'
                sx={{ height: 'fit-content', ml: 2 }}
              >
                Save
              </Button>
              <Button
                variant='outlined'
                color='error'
                type='submit'
                sx={{ height: 'fit-content', ml: 2 }}
                onClick={() => handleDeleteClick()}
              >
                Delete
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default CMViewInfo
