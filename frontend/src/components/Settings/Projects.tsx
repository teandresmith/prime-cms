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
import { useAppSelector } from '../../hooks/reduxHooks'
import { MHFTextField } from 'mui-hook-form-mhf'
import { useForm } from 'react-hook-form'
import {
  useAddProjectMutation,
  useGetProjectsQuery,
} from '../../redux/api/projectApi'
import ProjectCard from './ProjectCard'
import Loader from '../Loader'
import { Collection, Project } from '../../redux/Types'
import CollCard from './CollCard'

type FormData = {
  name: string
}

type ProjectsProps = {
  project?: Project
}

const Projects = ({ project }: ProjectsProps) => {
  const methods = useForm<FormData>()
  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const { data, isLoading } = useGetProjectsQuery('')
  const [addProject] = useAddProjectMutation()

  const currentProject = useAppSelector((state) => state.cm.currentProjectName)

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = (data: FormData) => {
    const project = { name: data.name }
    addProject(project)
    methods.setValue('name', '')
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
        {isLoading ? (
          <Loader />
        ) : (
          <Grid container rowGap={1} columnGap={1}>
            <Grid item xs={3}>
              <ProjectCard
                name={'channel-tech'}
                disabled={true}
                setOpen={setOpen}
              />
            </Grid>
            {data?.result?.map((value: any, index: number) => (
              <Grid item key={index} xs={3}>
                <ProjectCard name={value?.name} setOpen={setOpen} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={`${currentProject} set as current project`}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />

      <Box component='div' sx={{ pt: 3 }}>
        {project && (
          <Typography variant='h6' sx={{ pb: 2 }}>
            Current selected project collections
          </Typography>
        )}
        <Grid container rowGap={1} columnGap={1}>
          {project &&
            project?.collections?.map((value: Collection, index: number) => (
              <Grid item xs={3} key={index}>
                <CollCard name={value?.name} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default Projects
