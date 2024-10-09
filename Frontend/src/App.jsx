import React from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { useState } from 'react'
import Refresh from './refresh/Refresh'

function App() {

  const [auth,setAuth] = useState(false);
  const PrivateRoute = ({element}) => {
    return auth ? element : <Navigate to='/login' />
  } 

  return (
    <div>
      <Refresh setAuth={setAuth}/>
      <Routes>
        <Route path='/home' element={<PrivateRoute element={<Home/>}/>} />
        <Route path='/' element={<Signup/>} />
        <Route path='/login' element={<Login  />} />
      </Routes>
    </div>
  )
}

export default App