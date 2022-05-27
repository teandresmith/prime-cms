import React from 'react'
import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  Button,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useForm } from 'react-hook-form'
import { determineSizeAndComponent } from '../../helpers/formHelper'
import { setCurrentData } from '../../redux/states/cmState'

type Props = {}

const CMViewInfo = (props: Props) => {
  // Fetch -> Refetch
  const [loading, setLoading] = React.useState(true)
  const methods = useForm()
  const currentData = useAppSelector((state) => state.cm.currentData)
  const currentCollection = useAppSelector(
    (state) => state.cm.currentCollection
  )
  const currentProject = useAppSelector((state) => state.cm.currentProject)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 500)
  }, [currentData])

  const onSubmit = (data: any) => {
    console.log(data)
    // if (currentProject === 'channel-tech') {
    //   dispatch(setCurrentData({ data: data }))
    // } else {
    //   dispatch(setCurrentData({ data: data }))
    // }
  }

  return loading ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '75%',
        height: '100vh',
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Box component='div' sx={{ pl: 4, pt: 2, width: '75%' }}>
      <Box component='div'>
        <Box component='div'>
          <Typography variant='body1'>Back</Typography>
          <Typography variant='h2' sx={{ fontSize: 44, ml: 0 }}>
            {currentData[Object.keys(currentData)[1]]}
          </Typography>
        </Box>

        <Paper elevation={4} component='div' sx={{ mt: 3, p: 1 }}>
          <Box component='form' onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid
              container
              rowGap={3}
              alignItems={'center'}
              spacing={1}
              sx={{ pl: 2, pt: 2, pb: 2 }}
            >
              {currentCollection?.contentType?.map((value, index) =>
                determineSizeAndComponent(
                  value.type,
                  value.name,
                  index,
                  methods.control,
                  currentData[value.name]
                )
              )}
            </Grid>
            <Button
              variant='outlined'
              color='info'
              type='submit'
              sx={{ height: 'fit-content', ml: 2 }}
            >
              Save
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default CMViewInfo
