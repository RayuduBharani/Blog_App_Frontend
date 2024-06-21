import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/userContext';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import LibraryAddRoundedIcon from '@mui/icons-material/LibraryAddRounded';
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';


function Blog() {
    const blogs = useContext(UserContext);
    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        if (blogs?.user?.token) {
            fetchBlogs();
        }
    }, [blogs?.user?.token]);

    async function fetchBlogs() {
        try {
            const response = await fetch("https://blog-app-backend-1-xnlz.onrender.com/allblogs", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${blogs.user.token}`
                }
            });
            const data = await response.json();
            console.log(data);
            setBlogData(data);
        } catch (err) {
            console.error('Error fetching blogs:', err);
        }
    }

    function handleLogOut() {
        let reload = window.confirm("Are you logout ?")
        if (reload == true) {
            blogs.setUser(localStorage.removeItem("blog"))
            location.reload()
        }
    }


    return (
        <div className='w-full h-screen bg-white'>
            <div className='bg-white w-full h-fit flex flex-col items-center'>
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

                <div className='w-[77%] ml-5 h-full flex flex-wrap gap-5 justify-center pt-11 pb-10 max-lg:w-[90%] max-md:w-[90%] max-sm:w-full'>
                    {
                        blogData.length > 0 ? (
                            blogData.slice().reverse().map((blog, index) => (
                                <div key={index} className='w-[30%] h-[350px] bg-neutral-50 px-3 shadow-2xl rounded-lg max-md:w-[45%] max-sm:w-[70%]'>
                                    <h1 className='font-bold text-black text-lg truncate pt-3'>{blog.title}</h1>
                                    <p className='text-xs'>{blog.category}</p>
                                    <div className='w-[100%] h-[37%] flex mt-3 justify-center rounded-lg'>
                                        <img className='w-[95%] h-full rounded-lg' src={blog.image} alt="" />
                                    </div>
                                    <h1 className='h-16 text-sm overflow-hidden pt-1'>{blog.content}</h1>
                                    <p className='text-end text-sm mt-2 font-bold truncate'>Created by {blog.userId.name} {new Date(blog.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                    }</p>
                                    <div className='mt-3'>
                                        <Link to={`/blogs/${blog._id}`}><button className='w-full h-10 bg-blue-600 rounded-lg text-white'>View</button></Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='flex w-full h-full justify-center'>
                                <p className='font-bold text-3xl mt-40 animate-pulse'>No blogs available.</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Blog;
