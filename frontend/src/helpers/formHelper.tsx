import { Control } from 'react-hook-form'
import { Box, Grid } from '@mui/material'
import {
  MHFTextField,
  MHFLabeledSwitch,
  MHFDatePicker,
} from 'mui-hook-form-mhf'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers'

export const determineSizeAndComponent = (
  type: string,
  name: string,
  key: any,
  control: Control,
  value?: any
) => {
  switch (type) {
    case 'text':
      return (
        <Grid item xs={5} key={key}>
          <MHFTextField
            name={name}
            control={control}
            label={name}
            defaultValue={value}
            fullWidth
          />
        </Grid>
      )
    case 'boolean':
      return (
        <Grid item xs={6} key={key}>
          <MHFLabeledSwitch
            name={name}
            control={control}
            label={name}
            defaultChecked={value}
          />
        </Grid>
      )
    case 'datetime':
      return (
        <Grid item xs={5} key={key}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <MHFDatePicker
              name={name}
              control={control}
              label={name}
              defaultValue={value}
              fullWidth
            />
          </LocalizationProvider>
        </Grid>
      )
    case 'number':
      return (
        <Grid item xs={5} key={key}>
          <MHFTextField
            name={name}
            control={control}
            label={name}
            defaultValue={value}
            type='number'
            fullWidth
          />
        </Grid>
      )
    case 'file':
      return (
        <Grid item xs={5} key={key}>
          <MHFTextField name={name} control={control} type='file' />
        </Grid>
      )
    case 'textbox':
      return (
        <Grid item xs={11} key={key}>
          <MHFTextField
            name={name}
            control={control}
            label={name}
            defaultValue={value}
            multiline
            fullWidth
            rows={12}
          />
        </Grid>
      )
    case 'json':
      return (
        <Grid item xs={11} key={key}>
          <MHFTextField
            name={name}
            control={control}
            label={`${name} - JSON Object/Array`}
            defaultValue={value ? JSON.stringify(value, undefined, 4) : ''}
            multiline
            fullWidth
            rows={12}
          />
        </Grid>
      )
    case 'image':
      return (
        <Grid item xs={11} key={key}>
          <MHFTextField
            name={name}
            control={control}
            label={name}
            defaultValue={value}
            fullWidth
            type='url'
          />
          <br />
          {value !== undefined && (
            <Box
              component={'img'}
              src={value}
              sx={{ height: 400, objectFit: 'contain', pt: 1 }}
            />
          )}
        </Grid>
      )
    default:
      return 6
  }
}
