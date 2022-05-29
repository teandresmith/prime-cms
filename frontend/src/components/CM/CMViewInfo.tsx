import { useEffect, useState } from 'react'
import {
  Box,
  Stack,
  Grid,
  Paper,
  Typography,
  Button,
  Snackbar,
  Alert,
} from '@mui/material'
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
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()

  const [editCollectionContentData, { isSuccess }] =
    useEditCollectionContentDataMutation()
  const [deleteCollectionContentData] = useDeleteCollectionContentDataMutation()

  const currentCollection = useAppSelector(
    (state) => state.cm.currentCollection
  )
  const currentProjectName = useAppSelector(
    (state) => state.cm.currentProjectName
  )

  const onSubmit = (formData: any) => {
    const id = params?.id

    const json = checkForJSON()
    if (json !== undefined && formData[json.name] !== '') {
      try {
        formData[json.name] = JSON.parse(formData[json.name])
      } catch (error) {
        console.log(error)
        methods.setError(json.name, { type: 'focus' }, { shouldFocus: true })
        return
      }
    }

    const contentData = { id, createdAt: data?.createdAt, ...formData }
    editCollectionContentData({
      projectName: currentProjectName,
      collectionName: currentCollection,
      contentData: { contentData: contentData },
      contentId: id,
    })
  }

  const handleClose = () => {
    setOpen(false)
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

  useEffect(() => {
    if (isSuccess) {
      setOpen(true)
    }
  }, [isSuccess])

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
          {Object.keys(methods.formState.errors).length !== 0 && (
            <Alert color='error' variant='standard'>
              {`Error with fields - ${Object.keys(
                methods.formState.errors
              ).join(',')}`}
            </Alert>
          )}
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
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={`Successfully saved data`}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
      <Snackbar
        open={Object.keys(methods.formState.errors).length !== 0}
        autoHideDuration={3000}
        onClose={handleClose}
        message={`Something went wrong while saving...`}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </Box>
  )
}

export default CMViewInfo
