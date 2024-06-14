import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import LibraryAddRoundedIcon from '@mui/icons-material/LibraryAddRounded';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import userContext from '../context/userContext';
import HomeIcon from '@mui/icons-material/Home';

function User() {
    const UserData = useContext(userContext)
    const [users, setUsers] = useState([])
    const [searchUser, setSearchUser] = useState("")
    const [searchUsers, setSearchUsers] = useState(null)

    function handleLogOut() {
        let reload = window.confirm("Are you logout ?")
        if (reload) {
            localStorage.removeItem("blog");
            UserData.setUser(null);
            window.location.reload();
        }
    }

    useEffect(() => {
        fetch("https://blog-app-backend-cbu1.onrender.com/users", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${UserData.user.token}`
            }
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setUsers(data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    function handleInput(event) {
        setSearchUser(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        fetch(`https://blog-app-backend-cbu1.onrender.com/userSearch/${searchUser}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${UserData.user.token}`
            }
        })
            .then(response => response.json())
            .then((data) => {
                // console.log(data);
                setSearchUsers(data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className='w-full h-screen bg-white'>
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

                <div className='w-[73%] ml-5 h-fit mt-3'>
                    <div className='w-full'>
                        <form className='mt-10 flex justify-center -ml-7 max-md:mt-7 max-md:ml-0 max-sm:ml-0 max-sm:mt-5' onSubmit={handleSubmit}>
                            <input
                                className='text-black bg-neutral-300 w-[50%] h-10 rounded-md indent-3 outline-none shadow-xl max-lg:w-[68%]'
                                type="text"
                                name='search'
                                placeholder='Search Blog...'
                                onChange={handleInput}
                            />
                            <button className="p-2 w-20 hover:bg-blue-500 bg-blue-600 border-2 rounded-lg text-white border-none ml-4 shadow-2xl">
                                Search
                            </button>
                        </form>
                    </div>

                    <div className='w-full h-fit mt-5 flex justify-center flex-wrap gap-5 p-3'>
                        {
                            searchUsers ? (
                                searchUsers.length > 0 ? (
                                    searchUsers.map((data, id) => (
                                        <div key={id} className='w-fit h-fit flex rounded-lg overflow-hidden p-3 shadow-lg bg-neutral-200 max-sm:inline-block max-sm:w-[100%]'>
                                            <div className='w-12 h-10 rounded-full overflow-hidden mt-2 flex'>
                                                <img className='w-full h-full' src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" alt="Author avatar" />
                                            </div>
                                            <Link to={`/user/post/${data._id}`}>
                                                <div className='ml-5 max-sm:ml-0'>
                                                    <p className='font-bold text-black'>{data.name}</p>
                                                    <p className='font-semibold'>{data.email}</p>
                                                    {/* <button className="w-full px-3 mt-3 py-1.5 w-20 pl-4 hover:bg-blue-500 bg-blue-600 border-2 rounded-lg text-white border-none">
                                                        Posts
                                                    </button> */}
                                                </div>
                                            </Link>
                                        </div>
                                    ))
                                ) :
                                (<div className='font-bold animate-pulse text-xl'>
                                    User Not Found
                                </div>)
                            ) :
                            (
                                users.map((user, index) => (
                                    <div key={index} className='w-fit h-fit flex rounded-lg overflow-hidden p-3 shadow-lg bg-neutral-200 max-sm:inline-block max-sm:w-[100%]'>
                                        <div className='w-12 h-10 rounded-full overflow-hidden mt-2 flex'>
                                            <img className='w-full h-full' src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" alt="Author avatar" />
                                        </div>
                                        <Link to={`/user/post/${user._id}`}>
                                            <div className='ml-5 max-sm:ml-0'>
                                                <p className='font-bold text-black'>{user.name}</p>
                                                <p className='font-semibold'>{user.email}</p>
                                                {/* <button className="w-full px-3 mt-3 py-1.5 w-20 pl-4 hover:bg-blue-500 bg-blue-600 border-2 rounded-lg text-white border-none">
                                                Posts
                                            </button> */}
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User;
