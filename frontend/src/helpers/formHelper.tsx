import { Control } from 'react-hook-form'
import { Grid } from '@mui/material'
import { MHFTextField, MHFLabeledSwitch } from 'mui-hook-form-mhf'

export const determineSizeAndComponent = (
  type: string,
  name: string,
  key: any,
  control: Control,
  value?: any
) => {
  switch (type) {
    case 'string':
      return (
        <Grid item xs={6} key={key}>
          <MHFTextField
            name={name}
            control={control}
            label={name}
            defaultValue={value}
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
        <Grid item xs={6} key={key}>
          <MHFTextField
            name={name}
            control={control}
            label={name}
            defaultValue={value}
          />
        </Grid>
      )
    case 'number':
      return (
        <Grid item xs={6} key={key}>
          <MHFTextField
            name={name}
            control={control}
            label={name}
            defaultValue={value}
            type='number'
          />
        </Grid>
      )
    case 'image':
      return (
        <Grid item xs={10} key={key}>
          <MHFTextField
            name={name}
            control={control}
            label={name}
            type='file'
          />
        </Grid>
      )
    case 'textfield':
      return (
        <Grid item xs={10} key={key}>
          <MHFTextField name={name} control={control} label={name} multiline />
        </Grid>
      )

    default:
      return 6
  }
}
