import React, { useContext, useEffect, useState } from 'react'
import userContext from '../context/userContext'
import { Link } from 'react-router-dom'
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import LibraryAddRoundedIcon from '@mui/icons-material/LibraryAddRounded';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';

function Home() {

  let logOut = useContext(userContext)

  let [inputData, setInputData] = useState({
    search: ''
  })
  let [searchData, setSearchData] = useState()

  useEffect(() => {
    console.log(searchData);
  })

  function handleInput(event) {
    setInputData((prev) => {
      return { ...prev, [event.target.name]: event.target.value }
    })
    // console.log(inputData);
  }
  function handleSubmit(event) {
    event.preventDefault();
    fetch(`https:blog-backend-vert.vercel.app/search/${inputData.search}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${logOut.user.token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSearchData(data.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleLogOut() {
    let reload = window.confirm("Are you logout ?")
    if (reload == true) {
      logOut.setUser(localStorage.removeItem("blog"))
      location.reload()
    }
  }

  return (
    <div className='bg-white w-full h-screen text-black'>
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
              <li className="cursor-pointer ml-3 mt-2">
                <button onClick={handleLogOut} className="p-2.5 w-20 pl-4 hover:bg-blue-500 bg-blue-600 border-2 rounded-lg text-white border-none">
                  logOut
                </button>
              </li>
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
              <button onClick={handleLogOut} className="p-2 mr-1 w-20 hover:bg-blue-500 bg-blue-600 border-2 rounded-lg text-white border-none">
                logOut
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <section className='example flex w-full h-[600px] justify-center'>
        <div className='w-[47%] h-[85%] max-lg:[20%] max-md:w-[90%] max-sm:w-full'>
          <div className='w-[70%] ml-20 max-lg:w-[90%] max-lg:ml-0 max-md:ml-0 max-md:w-full max-md:flex max-md:flex-col max-md:items-center max-sm:w-full max-sm:ml-0 max-sm:text-center max-sm:p-2'>
            <h1 className='font-bold text-[35px] pt-[91px] max-lg:pt-16 max-md:pt-10 max-md:text-center max-sm:pt-12 max-sm:text-3xl'>Read the most <br /> interesting articles</h1>
            <p className='mt-3 text-neutral-400 max-md:text-center max-md:w-[90%]'>Discover expert insights and practical tips on technology, wellness, travel, and more. Dive into engaging articles that inspire and inform, with fresh content added regularly!</p>
          </div>
          <form className='mt-10 flex justify-center -ml-7 max-md:mt-7 max-md:ml-0 max-sm:ml-0 max-sm:mt-5' onSubmit={handleSubmit}>
            <input className='text-black bg-neutral-300 w-[50%] h-10 rounded-md outline-none shadow-xl max-lg:w-[68%] p-2'
              type="Search"
              name='search'
              value={inputData.search}
              placeholder='Search Blog Category...'
              onChange={handleInput}
            />
            <button className="p-2 w-20 hover:bg-blue-500 bg-blue-600 border-2 rounded-lg text-white border-none ml-4 shadow-xl ">Search</button>
          </form>
          <div className='mt-8 flex w-full h-6 justify-center font-semibold max-md:mt-6 max-sm:mt-4 max-sm:p-2'>
            <h1 className='font-bold -ml-7 mt-1 max-lg:-ml-14 max-sm:ml-0 max-sm:mt-0.5'>Popular Tags :</h1>
            <button className='bg-sky-100 text-blue-700 rounded-sm px-2 h-8 ml-8 cursor-pointer max-lg:ml-5 max-sm:ml-2' onClick={() => {
              setInputData({
                search: "Education"
              })
            }}>Education</button>
            <button className='bg-sky-100 text-blue-700  rounded-sm px-2 h-8  ml-8 cursor-pointer max-lg:ml-5 max-sm:ml-2'
              onClick={() => {
                setInputData({
                  search: "Technology"
                })
              }}>Tech</button>
            <button className='bg-sky-100 text-blue-700  rounded-sm px-2 h-8  ml-8 cursor-pointer max-lg:ml-5 max-sm:ml-2' onClick={() => {
              setInputData({
                search: 'Travel'
              })
            }}>Travel</button>
          </div>
        </div>

        <div className='w-[35%] h-[85%] max-md:hidden max-sm:hidden'>
          <img src="./LIve Chat.jpg" className='mt-32' alt="" />
        </div>
      </section>

      <section className='w-full pl-12 h-fit bg-white -mt-28 flex justify-center gap-10 pb-7 flex-wrap max-md:-mt-[220px] max-sm:-mt-[200px] max-sm:pl-0'>
        {
          searchData ? (
            searchData.map((data, index) => {
              return (
                <div key={index} className='w-[23%] h-[350px] rounded-lg overflow-hidden shadow-2xl bg-white max-lg:w-[30%] max-md:w-[43%] max-sm:w-[70%]'>
                  <div className='w-full h-[50%]'>
                    <img className='w-full h-full object-fill' src={data.image} alt={data.title} />
                  </div>
                  <div className='w-full h-full p-3'>
                    <h1 className='font-bold text-lg text-black truncate'>{data.title}</h1>
                    <p className='overflow-hidden text-xs h-9 mt-1'>{data.content}</p>
                    <div className='flex'>
                      <div className='w-8 h-8 rounded-full overflow-hidden mt-2 flex'>
                        <img className='w-full h-full' src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" alt="Author avatar" />
                      </div>
                      <div className='w-[80%] flex'>
                        <p className="text-xs mt-3.5 ml-2 truncate"><i>{data.userId.name}</i></p>
                        <i className="fa-solid fa-circle-check text-xs mt-3.5 ml-2 text-blue-500"></i>
                      </div>
                    </div>
                    <div className='mt-2'>
                      <Link to={`/blogs/${data._id}`}><button className='w-full h-10 bg-blue-600 rounded-lg text-white'>View</button></Link>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className='animate-pulse mt-10'>
              <p className='font-bold text-neutral-400 text-xl'>Can't find any Posts</p>
            </div>
          )
        }
      </section>
    </div>
  )
}

export default Home;