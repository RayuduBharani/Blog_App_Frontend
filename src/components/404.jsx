import React from 'react'
import { Link } from 'react-router-dom'

const NonePage = () => {
  return (
    <div className='bg-white w-full h-screen flex justify-center items-center flex-col'>
        <p className='font-bold text-3xl'>404 || Page Not Found</p>
        <p className='font-bold mt-4 text-lg'>goto login page <Link className='text-blue-500' to="/login">Click here ?</Link></p>
    </div>
  )
}

export default NonePage

