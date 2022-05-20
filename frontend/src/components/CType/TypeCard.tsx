import { Grid, SxProps, Theme } from '@mui/material'

type TypeCardProps = {
  name: string
  type: string
  gridSx?: SxProps<Theme>
  disabled?: boolean
}

const TypeCard = ({ name, type, gridSx, disabled }: TypeCardProps) => {
  return (
    <Grid container alignItems={'center'} sx={gridSx}>
      <Grid container item xs={11} alignItems={'center'}>
        <Grid item xs={4}>
          {name}
        </Grid>
        <Grid item xs={4}>
          {type}
        </Grid>
      </Grid>
      {/* <Grid item xs={1}>
        <IconButton
          disabled={disabled}
          onClick={(e) => handleDeleteCollection(e, name)}
        >
          <Delete />
        </IconButton>
      </Grid> */}
    </Grid>
  )
}

export default TypeCard
