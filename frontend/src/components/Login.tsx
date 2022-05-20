import { Box, Button, Stack, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { MHFTextField } from 'mui-hook-form-mhf'

type FormData = {
  email: string
  password: string
}

type Props = {}

const Login = (props: Props) => {
  const methods = useForm<FormData>()

  const imageUrl =
    'https://images.unsplash.com/photo-1507237998874-b4d52d1dd655?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80'

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <Box
      component='div'
      sx={{
        backgroundImage: `url(${imageUrl})`,
        height: '100vh',
        objectPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Box
        component='form'
        onSubmit={methods.handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Stack
          direction='column'
          spacing={1}
          sx={{
            width: 400,
            backgroundColor: '#fff',
            padding: 2,
            borderRadius: 1,
            pb: 3,
          }}
        >
          <Box component='div'>
            <Typography variant='h6'>Welcome to CMS</Typography>
            <Typography variant='body1'>You must login to continue</Typography>
          </Box>
          <Stack direction='column' spacing={1}>
            <MHFTextField
              name='email'
              control={methods.control}
              label='Email'
              type='email'
              required
            />
            <MHFTextField
              name='password'
              control={methods.control}
              type='password'
              label='Password'
              required
            />
          </Stack>
          <Button variant='contained' type='submit'>
            Login
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default Login
