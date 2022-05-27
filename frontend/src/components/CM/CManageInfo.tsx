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
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import React from 'react'
import CollectionCard from './../CM/CollectionCard'
import { useForm } from 'react-hook-form'
import { determineSizeAndComponent } from '../../helpers/formHelper'
import { addCollectionEntry } from '../../redux/states/cmState'

type Props = {}

const CManageInfo = (props: Props) => {
  const methods = useForm()
  const [open, setOpen] = React.useState(false)
  const dispatch = useAppDispatch()

  const currentCollection = useAppSelector(
    (state) => state.cm.currentCollection
  )

  const handleAddEntry = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = (data: any) => {
    console.log(data)
    dispatch(addCollectionEntry({ data: data }))
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
            {currentCollection?.name}
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
          <DialogTitle>
            {currentCollection.name} Collection - New Entry
          </DialogTitle>
          <Box component='form' onSubmit={methods.handleSubmit(onSubmit)}>
            <DialogContent>
              <Grid container rowSpacing={2}>
                {currentCollection.contentType?.map((value, index) =>
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

        <Typography sx={{ fontSize: 20, ml: 0 }}>
          {currentCollection?.data?.length} entries found
        </Typography>
      </Box>

      <Paper
        elevation={2}
        component='div'
        sx={{ width: '90%', mt: 5, backgroundColor: 'rgba(0,0,0,0.02)' }}
      >
        <CollectionCard
          id='id'
          name={currentCollection?.contentType?.[0]?.name || ''}
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
          {currentCollection?.data?.map((value: any, index: number) => (
            <CollectionCard
              key={index}
              id={value?.id}
              name={value?.[currentCollection?.contentType?.[0]?.name] || ''}
              createdAt='May 12, 1800'
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
