import { Delete } from '@mui/icons-material'
import { Checkbox, Grid, IconButton, SxProps, Theme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { deleteCollection } from '../../redux/states/cmState'

type CollectionCardProps = {
  name: string
  createdAt: string
  id?: string | number
  gridSx?: SxProps<Theme>
  disabled?: boolean
  url?: string
}

const CollectionCard = ({
  id,
  name,
  createdAt,
  gridSx,
  disabled,
  url,
}: CollectionCardProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleClick = () => {
    if (url) {
      navigate(url)
    }
  }

  const handleDeleteCollection = (event: any, value: string) => {
    dispatch(deleteCollection({ collection: value }))
  }

  return (
    <Grid container alignItems={'center'} sx={gridSx}>
      <Grid
        container
        item
        xs={11}
        alignItems={'center'}
        onClick={() => handleClick()}
      >
        <Grid item xs={3}>
          <Checkbox disabled={disabled} />
          {id}
        </Grid>
        <Grid item xs={4}>
          {name}
        </Grid>
        <Grid item xs={4}>
          {createdAt}
        </Grid>
      </Grid>
      <Grid item xs={1}>
        <IconButton
          disabled={disabled}
          onClick={(e) => handleDeleteCollection(e, name)}
        >
          <Delete />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default CollectionCard
