import { Box } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import CM from './components/CM'
import Settings from './components/Settings'
import CType from './components/CType'
import CMView from './components/CMView'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { useEffect, useState } from 'react'
import { useGetProjectQuery } from './redux/api/projectApi'

const App = () => {
  const [skip, setSkip] = useState(true)
  const currentProjectName = useAppSelector(
    (state) => state.cm.currentProjectName
  )

  const { data } = useGetProjectQuery(currentProjectName, { skip: skip })

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (currentProjectName !== null && currentProjectName !== 'channel-tech') {
      setSkip(false)
    }

    if (currentProjectName === 'channel-tech') {
      setSkip(true)
    }
  }, [currentProjectName, dispatch])

  return (
    <Box
      component='div'
      sx={{
        height: '100%',
        width: '100%',
      }}
    >
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
        <Route path='/settings' element={<Settings project={data?.result} />} />
        <Route
          path='/content-type'
          element={<CType project={data?.result} />}
        />
        {/* <Route path='/' index element={() => (<div>404</div>)} */}
      </Routes>
    </Box>
  )
}

export default App
