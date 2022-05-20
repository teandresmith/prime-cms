import { Box, Stack, Typography, Button } from '@mui/material'
import { useAppSelector } from '../../hooks/reduxHooks'
import { useNavigate } from 'react-router-dom'

type Props = {}

const CTypeNav = (props: Props) => {
  const navigate = useNavigate()
  const currentProject = useAppSelector((state) => state.cm.currentProject)
  const project = useAppSelector((state) => state.cm.project)
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
        <Typography variant='h5'>Content Types</Typography>
        <Typography variant='body1'>{project.name}</Typography>
      </Stack>
      <Stack direction='column' sx={{ pt: 1 }}>
        <ul>
          {project.collections.map((value, index: any) => (
            <li key={index}>
              <Button
                sx={{ color: 'black', textTransform: 'none', fontSize: '18px' }}
                onClick={() =>
                  navigate(`/content-type?collection=${value.name}`)
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

export default CTypeNav
