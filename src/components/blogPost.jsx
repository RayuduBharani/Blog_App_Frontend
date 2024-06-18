import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import userContext from '../context/userContext'
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import LibraryAddRoundedIcon from '@mui/icons-material/LibraryAddRounded';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import HomeIcon from '@mui/icons-material/Home';

function BlogPost() {
    const userData = useContext(userContext)

    const location = useLocation()
    let currentId = location.pathname.split("/")[2]

    const [postData, setPostData] = useState([])
    const [Comment, setComment] = useState({
        "postId": currentId,
        'comment': '',
        "userId": userData.user.user_id
    })
    const [allComments, setAllComments] = useState([])

    useEffect(() => {

        fetch(`https://blog-app-backend-cbu1.onrender.com/seePost/${currentId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${userData.user.token}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setPostData(data.data)
                console.log(data.data);
            })
            .catch((err) => {
                console.error(err)
            })
    }
        , [])

    function handleInput(event) {
        setComment((prev) => {
            return { ...prev, [event.target.name]: event.target.value }
        })
        // console.log(Comment);
    }

    function handleSubmit(event) {
        event.preventDefault()
        fetch(`https://blog-app-backend-cbu1.onrender.com/addComment/${currentId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userData.user.token}`
            },
            body: JSON.stringify(Comment)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setComment({
                    "postId": currentId,
                    'comment': '',
                    "userId": userData.user.user_id
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function fetchComment() {
        fetch(`https://blog-backend-vert.vercel.app/getComment/${currentId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${userData.user.token}`
            },
        })
            .then((response) => response.json())
            .then((userComments) => {
                setAllComments(userComments.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchComment()
    }, [allComments])

    
    function handleLogOut() {
        let reload = window.confirm("Are you logout ?")
        if (reload == true) {
            userData.setUser(localStorage.removeItem("blog"))
            location.reload()
        }
    }
    return (
        <div className='bg-white w-full h-screen'>
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
                            <button className="p-2 w-20 hover:bg-blue-500 bg-blue-600 border-2 rounded-lg text-white border-none" onClick={handleLogOut}>
                                logOut
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
            {postData.length > 0 ? (
                postData.map((data, index) => (
                    <div key={index} className='w-full bg-white h-fit flex justify-center mt-10'>
                        <div className='w-[45%] bg-white max-lg:w-[65%] max-md:w-[70%] max-sm:w-[90%]'>
                            <div className='flex'>
                                <div className='w-8 h-8 rounded-full overflow-hidden mt-2 flex'>
                                    <img className='w-full h-full' src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" alt="Author avatar" />
                                </div>
                                <div className='w-[80%]'>
                                    <p className='font-bold text-black ml-3 mt-1'>{data.userId.name.replace(/\b\w/g, char => char.toUpperCase())}</p>
                                    <p className='ml-2 text-xs font-semibold'>{data.category}</p>
                                </div>
                            </div>
                            <div>
                                <Link to='/blogs'><button className='border-b-2 border-black mt-7 ml-9'><i className="fa-solid fa-arrow-left mr-2"></i>Back</button></Link>
                            </div>
                            <div className='w-full h-fit mt-6 rounded-xl overflow-hidden'>
                                <img className='w-full object-contain' src={data.image} alt="" />
                            </div>
                            <div className='w-full h-fit'>
                                <h1 className='mt-5 font-bold text-black text-lg'>{data.title}</h1>
                                <p className='py-5'>{data.content}</p>
                                <p className='text-center pb-3 font-bold truncate text-black'>Created By {data.userId.name} , {new Date(data.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <div>
                                <form className='w-full mb-5 flex flex-col items-center' onSubmit={handleSubmit}>
                                    <textarea onChange={handleInput} value={Comment.comment} name="comment" id="" className='w-full h-32 bg-white border-2 outline-none border-blue-400 rounded-lg p-2 ' placeholder='Leave a Comment . . .' required></textarea>
                                    <button className="p-2 mt-4 w-20 hover:bg-blue-500 bg-blue-600 border-2 rounded-lg text-white border-none">
                                        post
                                    </button>
                                </form>
                            </div>
                            <div className='w-full'>
                                <p className='font-bold text-black text-lg mb-3'>See All Comments  ({allComments.length})</p>
                                {
                                    allComments.length > 0 ? (
                                        allComments.map((comment, index) => {
                                            return (
                                                <div key={index} className='w-full h-fit mb-5'>
                                                    <div className='w-full h-fit p-2 flex'>
                                                        <div className='w-8 h-8 rounded-full overflow-hidden mt-0.5'>
                                                            <img className='w-full h-full' src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" alt="Author avatar" />
                                                        </div>
                                                        <div>
                                                            <p className='text-black text-xs font-bold ml-2'>{comment.userId.name}</p>
                                                            <p className='text-xs font-bold text-neutral-500 ml-2'>{new Date(comment.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                                        </div>
                                                    </div>
                                                    <div className='w-full h-fit px-12 py-1 mb-10'>
                                                        <p className=' text-neutral-500'>{comment.comment}</p>
                                                        {/* <i className="fa-regular fa-pen-to-square mt-3 cursor-pointer"></i>
                                                        <i className="fa-solid fa-trash ml-10 cursor-pointer"></i> */}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <div>
                                            <h1 className='font-bold text-center mt-10 mb-10 animate-pulse'>No Comments</h1>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>

                ))
            ) : (
                <div className='w-full h-screen flex justify-center items-center'>
                    <p className='font-bold text-lg'>Loading...</p>
                </div>
            )}
        </div>
    )
}
export default BlogPost
