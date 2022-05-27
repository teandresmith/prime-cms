import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material'
import { useState } from 'react'
import { useAppDispatch } from '../hooks/reduxHooks'
import { MHFTextField } from 'mui-hook-form-mhf'
import { useForm } from 'react-hook-form'
import { addCollection } from '../redux/states/cmState'

const NoCollectionSelected = () => {
  const [open, setOpen] = useState(false)
  const methods = useForm()

  const dispatch = useAppDispatch()

  const handleAddCollection = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = (data: any) => {
    console.log(data)
    dispatch(addCollection({ collection: data?.name }))
    methods.setValue('name', '')
  }

  return (
    <Box component='div' sx={{ pl: 4, pt: 2, width: '75%' }}>
      <Typography variant='h5'>Please select a collection</Typography>
      <Button variant='outlined' onClick={handleAddCollection}>
        + New Collection
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Collection</DialogTitle>

        <Box component='form' onSubmit={methods.handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText sx={{ pb: 1 }}>
              Please enter in a name of your new collection.
            </DialogContentText>
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <MHFTextField
                  name='name'
                  control={methods.control}
                  label={'Collection Name'}
                  fullWidth
                />
              </Grid>
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
    </Box>
  )
}

export default NoCollectionSelected
