import { Check, Delete, Edit } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { useDeleteProjectMutation } from '../../redux/api/projectApi'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { setCurrentProjectName } from '../../redux/states/cmState'

type ProjectCardProps = {
  name: string
  disabled?: boolean
  setOpen: Function
}

const ProjectCard = ({ name, disabled, setOpen }: ProjectCardProps) => {
  const [deleteProject] = useDeleteProjectMutation()

  const dispatch = useAppDispatch()

  const handleProjectDelete = () => {
    if (
      window.confirm('Are you sure you want to delete this project?') === true
    ) {
      deleteProject(name)
    }
  }

  const handleProjectClick = () => {
    dispatch(setCurrentProjectName({ project: name }))
    setOpen(true)
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
          <IconButton onClick={() => handleProjectClick()}>
            <Check />
          </IconButton>
          <IconButton disabled={disabled}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleProjectDelete()} disabled={disabled}>
            <Delete />
          </IconButton>
        </Box>
      </Stack>
    </Box>
  )
}

export default ProjectCard
