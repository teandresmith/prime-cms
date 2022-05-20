import { Box, Typography, Stack, Button, Snackbar } from '@mui/material'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setCurrentProject } from '../../redux/states/cmState'

type Props = {}

const Projects = (props: Props) => {
  const [open, setOpen] = useState(false)
  const projects = useAppSelector((state) => state.cm.projects)
  const currentProject = useAppSelector((state) => state.cm.currentProject)
  const dispatch = useAppDispatch()

  const handleProjectClick = (value: string) => {
    dispatch(setCurrentProject({ project: value }))
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box
      component='div'
      sx={{ pl: 4, pt: 2, width: '100%', overflowY: 'scroll' }}
    >
      <Box component='div'>
        <Typography variant='h2' sx={{ fontSize: 44, ml: 0 }}>
          Projects
        </Typography>
      </Box>
      <Box component='div' sx={{ pt: 4 }}>
        <Typography variant='h6' sx={{ pb: 2 }}>
          Click to set Project
        </Typography>
        <Stack direction='row' spacing={1}>
          {projects.map((value, index) => (
            <Button
              key={index}
              variant='contained'
              color='inherit'
              sx={{ color: 'black' }}
              onClick={() => handleProjectClick(value)}
            >
              {value}
            </Button>
          ))}
        </Stack>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={`${currentProject} set as current project`}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </Box>
  )
}

export default Projects
