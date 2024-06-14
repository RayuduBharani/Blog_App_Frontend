import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import userContext from '../context/userContext'
import { useContext } from 'react'
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import LibraryAddRoundedIcon from '@mui/icons-material/LibraryAddRounded';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import HomeIcon from '@mui/icons-material/Home';

function Dashboard() {

    let userData = useContext(userContext)
    let [postData, setPostData] = useState([])

    useEffect(() => {
        singleUser()
    }, []);

    async function singleUser() {
        try {
            const response = await fetch(`https://blog-app-backend-cbu1.onrender.com/singlePost/${userData.user.user_id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${userData.user.token}`
                }
            })
            const data = await response.json();
            // console.log(data);
            setPostData(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    async function handleDelete(id) {
        try {
            const response = await fetch(`https://blog-app-backend-cbu1.onrender.com/deletepost/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${userData.user.token}`
                }
            })
            const data = await response.json()
            setPostData(postData.filter(post => post._id !== id));
            // console.log(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    function handleLogOut() {
        let reload = window.confirm("Are you logout ?")
        console.log(reload);
        if (reload == true) {
            userData.setUser(localStorage.removeItem("blog"))
            location.reload()
        }
    }

    return (
        <div className='bg-white w-full h-screen'>
            <div className='w-full h-fit bg-white flex flex-col items-center'>
                <nav className='w-full h-16 flex justify-around border-b-2'>
                    <div className="navbar-start hidden max-md:inline-block max-sm:inline-block">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
                                <li><Link to='/home'><HomeIcon/>Home</Link></li>
                                <li><Link to='/dashboard'><DashboardCustomizeRoundedIcon />Dashboard</Link></li>
                                <li><Link to='/post'><LibraryAddRoundedIcon />Post</Link></li>
                                <li><Link to='/users'><i className="fa-solid fa-users"></i>Users</Link></li>
                                <li><Link to='/blogs'><TravelExploreRoundedIcon />Blogs</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className='w-52 h-full flex justify-center items-center'>
                        <h1 className='text-3xl font-bold text-black'><Link to='/home'>TweeT</Link></h1>
                    </div>
                    <div className='w-[45%] h-full font-semibold'>
                        <ul className='flex justify-around items-center pt-3 text-neutral-400 max-md:hidden max-sm:hidden'>
                            <li className='cursor-pointer hover:text-black'><Link to='/dashboard'><DashboardCustomizeRoundedIcon /></Link></li>
                            <li className='cursor-pointer hover:text-black'><Link to='/post'><LibraryAddRoundedIcon /></Link></li>
                            <li className='cursor-pointer hover:text-black'><Link to='/users'><i className="fa-solid fa-users"></i></Link></li>
                            <li className='cursor-pointer hover:text-black'><Link to='/blogs'><TravelExploreRoundedIcon /></Link></li>
                            <li className="cursor-pointer">
                                <button onClick={handleLogOut} className="p-2 w-20 hover:bg-blue-500 bg-blue-600 border-2 rounded-lg text-white border-none">
                                    logOut
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className='mt-6 mb-5'>
                    <h1 className='font-bold text-2xl text-black'><u>Your posts</u></h1>
                </div>

                {
                    postData.length > 0 ? (
                        postData.slice().reverse().map((post, index) => {
                            return (
                                <div key={index} className=' w-[75%] h-fit ml-4 mt-2 mb-3 flex shadow-md bg-neutral-100 rounded-md max-sm:inline-block'>
                                    <div className='w-[24%] h-54 rounded-lg overflow-hidden max-sm:w-full'>
                                        <img className='w-full h-full object-fit' src={post.image} alt="" />
                                    </div>
                                    <div className='w-[60%] h-54 pt-2 max-sm:w-full max-sm:mt-2'>
                                        <div className='font-bold px-3'>
                                            <h1 className='text-lg text-black truncate max-sm:text-center'>{post.title}</h1>
                                            <div className='w-fit max-sm:w-full max-sm:flex max-sm:items-center max-sm:flex-col max-sm:mt-3 max-sm:mb-5'>
                                                <h1 className='font-semibold text-black bg-blue-400 px-2 py-1 rounded-md'>{post.category}</h1>
                                            </div>
                                            <p className='h-[70px] overflow-hidden mt-2 font-semibold max-sm:text-center max-sm:h-[45px]'>
                                                {post.content}
                                            </p>
                                        </div>
                                        <div className='p-3 font-bold max-sm:w-full max-sm:flex max-sm:items-center max-sm:flex-col'>
                                            <p>{post.userId.email}</p>
                                            <p>{new Date(post.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                                        </div>
                                    </div>
                                    <div className='w-[15%] h-54 flex justify-around items-center rounded-lg max-sm:w-full max-sm:h-fit max-sm:mt-4 max-sm:mb-5'>
                                        <Link to={`/EditPost/${post._id}`}><i className="fa-solid fa-pen-to-square text-green-500 cursor-pointer"></i></Link>
                                        <Link to={`/blogs/${post._id}`}><i className="fa-solid fa-eye text-blue-600 cursor-pointer"></i></Link>
                                        <i className="fa-solid fa-trash text-red-600 cursor-pointer" onClick={() => {
                                            handleDelete(post._id)
                                        }}></i>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className='font-bold w-full h-[500px] flex justify-center items-center'><h1 className='animate-pulse text-2xl'>Your posts are not found</h1></div>
                    )
                }
            </div>
        </div>
    )
}

export default Dashboard;