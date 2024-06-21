import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Register() {

    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: ""
    })

    function handleInput(event) {
        setRegisterData((prev) => {
            return {
                ...prev, [event.target.name]: event.target.value
            }
        })
        console.log(registerData);
    }

    function handleSubmit(event) {
        event.preventDefault();
        fetch("https://blog-app-backend-1-xnlz.onrender.com/register", {
            method: 'POST',
            body: JSON.stringify(registerData),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.status === "success") {
                    toast.success('Your are successfully Registered')
                    setRegisterData({
                        name: "",
                        email: "",
                        password: ""
                    })
                }
                else {
                    toast.error('Email already exists!')
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="w-full h-screen bg-gray-50">
            <nav className="w-full h-16 flex justify-around border-b-2">
                <div className="w-32 h-full flex justify-center items-center">
                    <h1 className="text-black font-bold text-3xl ml-10 max-sm:ml-1">TweeT</h1>
                </div>
                <div className="w-[40%] h-full">
                    <ul className="flex font-semibold text-black justify-end">
                        <li className="cursor-pointer p-4 max-sm:hidden" onClick={
                            ()=>{
                                toast.error("You have to login First")
                            }
                        }>Home</li>
                        <li className=" cursor-pointer p-4 max-md:hidden max-sm:hidden"  onClick={
                            ()=>{
                                toast.error("You have to login First")
                            }
                        }>Blog</li>
                        <li className="cursor-pointer p-4 max-md:hidden max-sm:hidden"  onClick={
                            ()=>{
                                toast.error("You have to login First")
                            }
                        }>Dashboard</li>
                        <li className="cursor-pointer p-3">
                            <button className="p-2 w-20 hover:bg-blue-500 bg-blue-600 border-2 rounded-lg text-white border-none"><Link to="/login">Sign in</Link></button>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="w-full h-[90.5%] flex items-center flex-col justify-center">
                <h1 className="text-2xl text-black font-bold pb-4">
                    Sign Up
                </h1>
                <form className="w-[30%] h-3/5 mt-6 text-black max-xl:w-[35%] max-lg:w-[50%] max-md:w-[70%] max-sm:w-[70%]" onSubmit={handleSubmit}>
                    <label htmlFor="name" className="font-medium text-neutral-500"> Name </label><br />
                    <input id="name" type="text" placeholder="Enter your name . . ."
                        className="bg-transparent outline-none indent-2 border-gray-300 border-2 w-[100%] mt-2 h-11 rounded-lg"
                        onChange={handleInput} value={registerData.name} name="name" required />
                    <br /><br />

                    <label htmlFor="email" className=" font-medium text-neutral-500"> Email Address </label><br />
                    <input id="email" type="email" placeholder="Enter your email . . ."
                        className="bg-transparent border-gray-300 border-2 w-[100%] mt-2 h-11 rounded-lg outline-none indent-2"
                        onChange={handleInput} value={registerData.email} name="email" required />
                    <br /><br />

                    <label htmlFor="password" className="font-medium text-neutral-500"> Password </label><br />
                    <input id="password" type="password" placeholder="Enter your password . . ."
                        className="bg-transparent border-gray-300 border-2 w-[100%] mt-2 h-11 rounded-lg outline-none indent-2"
                        onChange={handleInput} value={registerData.password} name="password" required />
                    <br />

                    <button className="btn w-[100%] mt-5 bg-blue-600 text-white hover:bg-blue-500 border-none rounded-lg h-9">
                        Register
                    </button>
                    <ToastContainer
                        position="top-left"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                        transition:Bounce/>

                    <p className="mt-5 text-neutral-400 font-semibold">
                        You have an account ?
                        <Link className="text-blue-700 font-bold" to='/login'>
                            Login now
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register;