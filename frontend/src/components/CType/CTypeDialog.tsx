import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  Grid,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { MHFTextField, MHFSelect } from 'mui-hook-form-mhf'
import { useForm } from 'react-hook-form'
import { addContentType } from '../../redux/states/cmState'

type CTypeDialogProps = {
  handleClose: any
  open: boolean
}

const CTypeDialog = ({ handleClose, open }: CTypeDialogProps) => {
  const methods = useForm()
  const dispatch = useAppDispatch()
  const currentCollection = useAppSelector(
    (state) => state.cm.currentCollection
  )

  const onSubmit = (data: any) => {
    console.log(data)
    dispatch(addContentType({ type: data }))
    methods.setValue('name', '')
    methods.setValue('type', '')
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{currentCollection?.name} Collection - New Type</DialogTitle>
      <Box component='form' onSubmit={methods.handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <MHFTextField
                name='name'
                control={methods.control}
                label='Name'
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <MHFSelect
                name='type'
                control={methods.control}
                label='Type'
                labelId='type-label'
                selectItemList={[
                  'text',
                  'string',
                  'datetime',
                  'image',
                  'file',
                  'boolean',
                  'number',
                ]}
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
  )
}

export default CTypeDialog
