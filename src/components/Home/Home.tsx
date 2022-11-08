import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    let navigate = useNavigate();
    useEffect(() => {
        navigate('/login')
    }, [])
  return (
    <div></div>
  )
}

export default Home