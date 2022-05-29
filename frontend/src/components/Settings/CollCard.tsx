import { Delete, Edit } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { useAppSelector } from '../../hooks/reduxHooks'
import { useDeleteProjectCollectionMutation } from '../../redux/api/projectApi'

type CollCardProps = {
  name: string
}

const CollCard = ({ name }: CollCardProps) => {
  const [deleteProjectCollection] = useDeleteProjectCollectionMutation()

  const currentProjectName = useAppSelector(
    (state) => state.cm.currentProjectName
  )

  const handleProjectDelete = () => {
    if (
      window.confirm('Are you sure you want to delete this collection?') ===
      true
    ) {
      deleteProjectCollection({
        project: currentProjectName,
        collectionName: name,
      })
    }
  }

  return (
    <Box
      component='div'
      sx={{
        p: 1,
        border: '1px solid lightgray',
        borderRadius: 2,
      }}
    >
      <Stack
        direction='row'
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Box component='div'>
          <Typography variant='h6'>{name}</Typography>
        </Box>
        <Box component='div'>
          <IconButton>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleProjectDelete()}>
            <Delete />
          </IconButton>
        </Box>
      </Stack>
    </Box>
  )
}

export default CollCard
