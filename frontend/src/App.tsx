import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import { Login, CM, Settings, CType, CMView, AuthProvider } from './components'
import { useAppSelector } from './hooks/reduxHooks'
import { useGetProjectQuery } from './redux/api/projectApi'

const App = () => {
  const [skip, setSkip] = useState(true)
  const currentProjectName = useAppSelector(
    (state) => state.cm.currentProjectName
  )

  const { data, error } = useGetProjectQuery(currentProjectName, { skip: skip })

  useEffect(() => {
    if (currentProjectName !== null && currentProjectName !== 'channel-tech') {
      setSkip(false)
    }

    if (currentProjectName === 'channel-tech') {
      setSkip(true)
    }
  }, [currentProjectName])

  return (
    <Box
      component='div'
      sx={{
        height: '100%',
        width: '100%',
      }}
    >
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Login />} />

          <Route
            path='/content-management'
            element={<CM project={data?.result} />}
          />
          <Route
            path='/content-management/:id'
            element={<CMView project={data?.result} />}
          />
          <Route
            path='/settings'
            element={<Settings project={data?.result} />}
          />
          <Route
            path='/content-type'
            element={<CType project={data?.result} />}
          />
          {/* <Route path='/' index element={() => (<div>404</div>)} */}
        </Routes>
      </AuthProvider>
    </Box>
  )
}

export default App
