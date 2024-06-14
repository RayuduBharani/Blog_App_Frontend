import { useContext } from 'react'
import userContext from '../context/userContext'
import { Navigate } from 'react-router-dom'


function Private(props) {
  const loggedInData = useContext(userContext)
  return (
    loggedInData.user !== null ?
    <props.Component/>:
    <Navigate to='/login'/>
  )
}

export default Private