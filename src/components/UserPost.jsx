import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import LibraryAddRoundedIcon from '@mui/icons-material/LibraryAddRounded';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import userContext from '../context/userContext';

function UserPost() {

    const userData = useContext(userContext)

    const location = useLocation();
    let path = location.pathname.split("/")[3]
    // console.log(path);

    const [userPost, setUserPost] = useState(null)

    function handlePosts() {
        fetch(`https://blog-app-backend-1-xnlz.onrender.com/userPost/${path}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${userData.user.token}`
            }
        })
            .then(response => response.json())
            .then((posts) => {
                // console.log(posts);
                setUserPost(posts.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        handlePosts()
    }, [])

    
    function handleLogOut() {
        let reload = window.confirm("Are you logout ?")
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
                                <button className="p-2 w-20 hover:bg-blue-500 bg-blue-600 border-2 rounded-lg text-white border-none"
                                    onClick={handleLogOut}>
                                    logOut
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className='mt-6 mb-5'>
                    <h1 className='font-bold text-2xl text-black'><u>posts</u></h1>
                </div>
                {
                    userPost ? (
                        userPost.length > 0 ? (
                            userPost.map((post, index) => {
                                return (
                                    <div key={index} className=' w-[70%] h-fit ml-4 mt-2 mb-3 flex shadow-md bg-neutral-100 rounded-md max-sm:inline-block'>
                                        <div className='w-[28%] h-54 rounded-lg overflow-hidden max-sm:w-full'>
                                            <img className='w-full h-full object-fit' src={post.image} alt={post.title} />
                                        </div>
                                        <div className='w-[68%] h-54 pt-2 max-sm:w-full max-sm:mt-2 ml-3'>
                                            <div className='font-bold px-3'>
                                                <h1 className='text-lg text-black truncate max-sm:text-center'>{post.title}</h1>
                                                <div className='w-fit max-sm:w-full max-sm:flex max-sm:items-center max-sm:flex-col max-sm:mt-3 max-sm:mb-5'>
                                                    <h1 className='font-semibold text-black text-xs py-1 rounded-md'>{post.category}</h1>
                                                </div>
                                                <p className='h-[70px] overflow-hidden mt-2 font-semibold max-sm:text-center max-sm:h-[45px]'>
                                                    {post.content}
                                                </p>
                                            </div>
                                            <div className='p-3 font-bold max-sm:w-full max-sm:flex max-sm:items-center max-sm:flex-col w-full'>
                                                <p>{new Date(post.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                                <Link to={`/blogs/${post._id}`}><button className='w-52 mt-5 h-10 bg-blue-600 rounded-lg text-white max-sm:mr-4'>View</button></Link>
                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                        ) :
                        (
                            <div className='font-bold w-full h-[500px] text-xl flex justify-center items-center animate-pulse'>
                                He did't post anything...
                            </div>
                        )
                    ) :
                    (
                        <div className='flex w-full h-full justify-center'>
                            <p className='font-bold text-3xl mt-40 animate-pulse'>No blogs available.</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default UserPost