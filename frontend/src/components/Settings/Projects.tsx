import {
  Box,
  Typography,
  Stack,
  Button,
  Snackbar,
  Dialog,
  DialogContent,
  Grid,
  DialogActions,
  DialogTitle,
} from '@mui/material'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { addProject, setCurrentProject } from '../../redux/states/cmState'
import { MHFTextField } from 'mui-hook-form-mhf'
import { useForm } from 'react-hook-form'

type Props = {}

const Projects = (props: Props) => {
  const methods = useForm()

  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
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

  const onSubmit = (data: any) => {
    dispatch(addProject({ project: data?.name }))
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  return (
    <Box
      component='div'
      sx={{ pl: 4, pt: 2, width: '100%', overflowY: 'scroll' }}
    >
      <Box component='div'>
        <Stack
          direction='row'
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography variant='h2' sx={{ fontSize: 44, ml: 0 }}>
            Projects
          </Typography>
          <Button
            variant='outlined'
            sx={{ height: 'fit-content', mr: 5 }}
            onClick={handleDialogOpen}
          >
            + New Project
          </Button>
        </Stack>
      </Box>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>New Project</DialogTitle>
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
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button type='submit' onClick={handleDialogClose}>
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
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
