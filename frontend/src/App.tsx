import { Box } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import CM from './components/CM'
import Settings from './components/Settings'
import CType from './components/CType'
import CMView from './components/CMView'

const App = () => {
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
        <Route path='/content-management' element={<CM />} />
        <Route path='/content-management/:id' element={<CMView />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/content-type' element={<CType />} />
        {/* <Route path='/' index element={() => (<div>404</div>)} */}
      </Routes>
    </Box>
  )
}

export default App
