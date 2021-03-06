import { Delete } from '@mui/icons-material'
import { Checkbox, Grid, IconButton, SxProps, Theme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'
import { useDeleteCollectionContentDataMutation } from '../../redux/api/projectContentDataAPI'

type CollectionCardProps = {
  name: string
  createdAt: string | number
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

  const currentCollection = useAppSelector(
    (state) => state.cm.currentCollection
  )
  const currentProjectName = useAppSelector(
    (state) => state.cm.currentProjectName
  )

  const [deleteCollectionContentData] = useDeleteCollectionContentDataMutation()

  const handleClick = () => {
    if (url) {
      navigate(url)
    }
  }

  const handleDeleteEntry = () => {
    if (window.confirm(`Delete Entry - ID: ${id}?`) === true) {
      deleteCollectionContentData({
        projectName: currentProjectName,
        collectionName: currentCollection,
        contentId: id,
      })
    }
  }

  const truncate = (input: string) => {
    return input.length >= 20 ? `${input.substring(0, 20)}...` : input
  }

  let dateText = createdAt
  if (typeof createdAt === 'number') {
    const date = new Date(createdAt)
    dateText = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
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
          {truncate(name)}
        </Grid>
        <Grid item xs={4}>
          {dateText}
        </Grid>
      </Grid>
      <Grid item xs={1}>
        <IconButton disabled={disabled} onClick={() => handleDeleteEntry()}>
          <Delete />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default CollectionCard
