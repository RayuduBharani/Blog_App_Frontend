import { Route, Routes} from 'react-router-dom'
import './App.css'
import Login from './components/login'
import Register from './components/register'
import NonePage from './components/404'
import Home from './components/Home'
import {useEffect, useState } from 'react'
import userContext from './context/userContext'
import Private from './components/Private'
import Post from './components/Post'
import User from './components/User'
import Blog from './components/Blog'
import Dashboard from './components/Dashboard'
import blogPost from './components/blogPost'
import EditPost from './components/EditPost'
import UserPost from './components/UserPost'

function App() {

  let [user,setUser] = useState(JSON.parse(localStorage.getItem("blog")))
  
  useEffect(()=>{
    console.log(user);
  },[])

  return (
    <userContext.Provider value={{user,setUser}}>
      <Routes>
        <Route path='/*' element={<NonePage/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Private Component={Home}/>}/>
        <Route path='/post' element={<Private Component={Post}/>}/>
        <Route path='/users' element={<Private Component={User}/>}/>
        <Route path='/blogs' element={<Private Component={Blog}/>}/>
        <Route path='/dashboard' element={<Private Component={Dashboard}/>}/>
        <Route path='/blogs/:id' element={<Private Component={blogPost}/>}/>
        <Route path="/editpost/:id" element={<Private Component={EditPost}/>}/>
        <Route path="/user/post/:id" element={<Private Component={UserPost}/>}/>
      </Routes>
    </userContext.Provider>
  )
}

export default App
