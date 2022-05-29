import {
  Box,
  Stack,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material'
import { useAppSelector } from '../../hooks/reduxHooks'
import React from 'react'
import CollectionCard from './../CM/CollectionCard'
import { useForm } from 'react-hook-form'
import { determineSizeAndComponent } from '../../helpers/formHelper'
import { ContentType, Data } from '../../redux/Types'
import { useAddCollectionContentDataMutation } from '../../redux/api/projectContentDataAPI'
import { v4 as uuid } from 'uuid'

type CManageInfoProps = {
  contentData: Array<Data>
  collectionName: string
  contentTypes: Array<ContentType>
}

const CManageInfo = ({
  contentData,
  collectionName,
  contentTypes,
}: CManageInfoProps) => {
  const methods = useForm()
  const [open, setOpen] = React.useState(false)

  const [addCollectionContentData] = useAddCollectionContentDataMutation()
  const currentProjectName = useAppSelector(
    (state) => state.cm.currentProjectName
  )

  const handleAddEntry = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = (data: any) => {
    const id = uuid().slice(0, 12)

    const json = checkForJSON()
    if (json !== undefined && data[json.name] !== '') {
      try {
        data[json.name] = JSON.parse(data[json.name])
      } catch (error) {
        methods.setError(json.name, { type: 'focus' }, { shouldFocus: true })
        return
      }
    }

    const contentData = { id: `${id}`, createdAt: Date.now(), ...data }
    addCollectionContentData({
      projectName: currentProjectName,
      collectionName: collectionName,
      contentData: { contentData: contentData },
    })
    for (let i = 0; i < Object.keys(data).length; i++) {
      methods.setValue(Object.keys(data)[i], undefined)
    }
  }

  const checkForJSON = () => {
    const json = contentTypes?.find(
      (value: ContentType) => value.type === 'json'
    )
    return json
  }

  return (
    <Box component='div' sx={{ pl: 4, pt: 2, width: '75%' }}>
      <Box component='div'>
        <Stack
          direction='row'
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography variant='h2' sx={{ fontSize: 44, ml: 0 }}>
            {collectionName}
          </Typography>
          <Button
            variant='outlined'
            onClick={handleAddEntry}
            sx={{ height: 'fit-content', mr: 5 }}
          >
            + New Entry
          </Button>
        </Stack>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{collectionName} Collection - New Entry</DialogTitle>
          <Box component='form' onSubmit={methods.handleSubmit(onSubmit)}>
            <DialogContent>
              <Grid container rowSpacing={2} columnSpacing={2}>
                {contentTypes?.map((value: ContentType, index: number) =>
                  determineSizeAndComponent(
                    value.type,
                    value.name,
                    index,
                    methods.control
                  )
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type='submit' onClick={handleClose}>
                Submit
              </Button>
            </DialogActions>
          </Box>
        </Dialog>

        <Typography sx={{ fontSize: 20, ml: 0, pb: 1 }}>
          {contentData?.length || '0'} entries found
        </Typography>
        <Typography sx={{ fontSize: 20, ml: 0 }}>
          Click on an entry to view and edit the data
        </Typography>
      </Box>

      <Paper
        elevation={2}
        component='div'
        sx={{ width: '90%', mt: 5, backgroundColor: 'rgba(0,0,0,0.02)' }}
      >
        <CollectionCard
          id='id'
          name={contentTypes?.[0]?.name || ''}
          createdAt='Created At'
          disabled
          gridSx={{
            pl: '16px',
            pr: '16px',
            pt: 0,
            pb: 0,
            borderBottom: '2px solid rgba(0,0,0,.1)',
          }}
        />
        <Stack direction='column' justifyContent={'center'} spacing={0}>
          {contentData?.map((value: Data, index: number) => (
            <CollectionCard
              key={index}
              id={value?.id}
              name={value?.[contentTypes?.[0]?.name] || ''}
              createdAt={value?.createdAt}
              gridSx={{
                pl: '16px',
                pr: '16px',
                pt: 1,
                pb: 1,
                ':hover': {
                  cursor: 'pointer',
                  backgroundColor: 'rgba(0,0,0,0.02)',
                },
              }}
              url={`/content-management/${value?.id}`}
            />
          ))}
        </Stack>
      </Paper>
    </Box>
  )
}

export default CManageInfo
