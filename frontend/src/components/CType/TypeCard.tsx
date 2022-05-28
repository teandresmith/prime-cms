import { Delete } from '@mui/icons-material'
import { Grid, SxProps, Theme, IconButton } from '@mui/material'
import { useAppSelector } from '../../hooks/reduxHooks'
import { useDeleteCollectionContentTypeMutation } from '../../redux/api/projectContentTypeAPI'

type TypeCardProps = {
  name: string
  type: string
  gridSx?: SxProps<Theme>
  disabled?: boolean
}

const TypeCard = ({ name, type, gridSx, disabled }: TypeCardProps) => {
  const currentCollection = useAppSelector(
    (state) => state.cm.currentCollection
  )
  const currentProjectName = useAppSelector(
    (state) => state.cm.currentProjectName
  )

  const [deleteCollectionContentType] = useDeleteCollectionContentTypeMutation()

  const handleDeleteType = () => {
    if (window.confirm(`Delete ${name} type?`) == true) {
      deleteCollectionContentType({
        projectName: currentProjectName,
        collectionName: currentCollection,
        contentId: name,
      })
    }
  }

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
      <Grid item xs={1}>
        <IconButton disabled={disabled} onClick={() => handleDeleteType()}>
          <Delete />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default TypeCard
