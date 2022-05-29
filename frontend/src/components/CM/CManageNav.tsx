import { Box, Stack, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Collection, Project } from '../../redux/Types'

type CManageNavProps = {
  project?: Project
}

const CManageNav = ({ project }: CManageNavProps) => {
  const navigate = useNavigate()

  return (
    <Box
      component='div'
      sx={{
        width: '20%',
        borderRight: '2px solid rgba(0,0,0,0.1)',
        pt: 2,
      }}
    >
      <Stack sx={{ pl: 2 }}>
        <Typography variant='h5'>Content Management</Typography>
        <Typography variant='body1'>{project?.name}</Typography>
      </Stack>
      <Stack direction='column' sx={{ pt: 1 }}>
        <ul>
          {project?.collections?.map((value: Collection, index: any) => (
            <li key={index}>
              <Button
                sx={{ color: 'black', textTransform: 'none', fontSize: '18px' }}
                onClick={() =>
                  navigate(`/content-management?collection=${value.name}`)
                }
              >
                {value.name}
              </Button>
            </li>
          ))}
        </ul>
      </Stack>
    </Box>
  )
}

export default CManageNav
