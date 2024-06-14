import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import LibraryAddRoundedIcon from '@mui/icons-material/LibraryAddRounded';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import userContext from '../context/userContext';
import HomeIcon from '@mui/icons-material/Home';

function EditPost() {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname.split("/")[2];
    const userData = useContext(userContext);

    const categories = [
        { value: 'news', label: 'News' },
        { value: 'opinion', label: 'Opinion' },
        { value: 'how-to', label: 'How-To' },
        { value: 'reviews', label: 'Reviews' },
        { value: 'lifestyle', label: 'Lifestyle' },
        { value: 'technology', label: 'Technology' },
        { value: 'business', label: 'Business' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'education', label: 'Education' },
        { value: 'health-and-fitness', label: 'Health and Fitness' },
        { value: 'food-and-drink', label: 'Food and Drink' },
        { value: 'travel', label: 'Travel' },
        { value: 'finance', label: 'Finance' },
        { value: 'diy-and-crafts', label: 'DIY and Crafts' },
        { value: 'sports', label: 'Sports' },
        { value: 'science', label: 'Science' },
        { value: 'home-and-garden', label: 'Home and Garden' },
        { value: 'career-and-development', label: 'Career and Development' },
        { value: 'parenting', label: 'Parenting' },
        { value: 'humor', label: 'Humor' }
    ];

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: '',
        category: ''
    });

    useEffect(() => {
        fetchData();
        async function fetchData() {
            try {
                const response = await fetch(`https://blog-app-backend-cbu1.onrender.com/singlePost/${path}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${userData.user.token}`
                    }
                });
                const data = await response.json();
                setFormData({
                    title: data.title,
                    content: data.content,
                    image: data.image,
                    category: data.category
                })
            } 
            catch (err) {
                console.error("Failed to fetch post data:", err);
            }
        }
        
    }, []);

    function handleInput(event) {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    async function handleUpdate(event) {
        event.preventDefault();
        try {
            const response = await fetch(`https://blog-app-backend-cbu1.onrender.com/updatepost/${path}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${userData.user.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            setFormData(data);
            navigate("/dashboard");
        } 
        catch (err) {
            console.error("Failed to update post:", err);
        }
    }

    
    function handleLogOut() {
        let reload = window.confirm("Are you logout ?")
        if (reload == true) {
            userData.setUser(localStorage.removeItem("blog"))
            location.reload()
        }
    }
    return (
        <div className="bg-white max-sm:w-full max-sm:h-[930px]">
            <div className="w-full h-fit bg-white">
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

                <section className="w-full h-[90%] bg-white flex flex-col items-center justify-center max-sm:pl-5">
                    <h1 className="font-bold text-2xl text-black text-center pt-10 mr-8">Update your Post</h1>
                    <form className="w-[30%] h-full flex flex-col max-lg:w-[50%] max-md:w-[60%] max-sm:w-[85%]"
                        encType="multipart/form-data"
                        onSubmit={handleUpdate}>
                        <label htmlFor="title" className="font-semibold mt-8 text-md text-neutral-400">Enter Your Title</label>
                        <textarea className="w-[95%] h-16 mt-2 bg-neutral-50 rounded-md indent-3 outline-none  border-2 "
                            id="title"
                            name="title"
                            onChange={handleInput}
                            placeholder="Enter your title here  . . ."
                            value={formData.title}
                            required>
                        </textarea>

                        <label htmlFor="content" className="font-semibold mt-8 text-md text-neutral-400">Enter Your Content</label>
                        <textarea className="w-[95%] h-32 mt-2 bg-slate-50 rounded-md indent-3 border-2 outline-none"
                            id="content"
                            name="content"
                            onChange={handleInput}
                            placeholder="Enter your Content here  . . ."
                            value={formData.content}
                            required>
                        </textarea>

                        <label htmlFor="image" className="font-semibold mt-8 text-md text-neutral-400">Paste your image Link</label>
                        <textarea className="w-[95%] h-16 mt-2 bg-slate-50 rounded-md indent-3 border-2 outline-none"
                            id="image"
                            name="image"
                            onChange={handleInput}
                            placeholder="Paste your url . . ."
                            value={formData.image}
                            required>
                        </textarea>

                        <label className="form-control w-full max-w-xs mt-5">
                            <select
                                className="select select-bordered bg-white text-black font-semibold border-2"
                                name="category"
                                onChange={handleInput}
                                value={formData.category}
                                required>
                                <option value="" disabled>Select a category</option>
                                {categories.map(category => (
                                    <option key={category.value} value={category.value}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <button className="p-2 w-[94%] hover:bg-blue-500 bg-blue-600 border-2 rounded-lg text-white border-none mt-8 mb-20">Submit</button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default EditPost;
