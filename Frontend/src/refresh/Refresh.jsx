import React, { useEffect } from 'react'
import { replace, useLocation, useNavigate } from 'react-router-dom'


function Refresh({setAuth}) {
    
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            setAuth(true);
            if(location.pathname === '/' || location.pathname === '/login' )
            {
                navigate('/home',{replace:false});
            }
        }
    }, [location,navigate,setAuth])
    
  return (
    null
  )
}

export default Refresh