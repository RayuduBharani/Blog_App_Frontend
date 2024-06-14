import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const navigate = useNavigate()

    const user = useContext(userContext)

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    function handleInput(event) {
        setLoginData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        fetch("https://blog-app-backend-cbu1.onrender.com/login", {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.token != undefined) {
                    localStorage.setItem("blog", JSON.stringify(data))
                    user.setUser(data)
                    navigate("/home")
                }
                else if (data.message === "password is incorrect") {
                    toast.error("password is incorrect")
                }
                else if(data.message === "Email not found"){
                    toast.error("Email not found")
                }
                else{
                    toast.warn("Some err happend please Relogin")
                }
            })
            .catch((err) => {
                console.error(err);
            });
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
                        <li className="cursor-pointer p-4 max-md:hidden max-sm:hidden"  onClick={
                            ()=>{
                                toast.error("You have to login First")
                            }
                        }>Blogs</li>
                        <li className="cursor-pointer p-4 max-md:hidden max-sm:hidden"  onClick={
                            ()=>{
                                toast.error("You have to login First")
                            }
                        }>Dashboard</li>
                        <li className="cursor-pointer p-3">
                            <button className="p-2 w-20 hover:bg-blue-500 bg-blue-600 border-2 rounded-lg text-white border-none">
                                <Link to="/register">
                                    Sign Up
                                </Link>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="w-full h-[90.5%] flex items-center flex-col justify-center">
                <h1 className="text-2xl text-black font-bold pb-4">Sign In</h1>
                <form className="w-[30%] h-3/5 mt-6 text-black max-xl:w-[35%] max-lg:w-[50%] max-md:w-[70%] max-sm:w-[70%]" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="font-medium text-neutral-500">Email Address</label><br />
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email . . ."
                        onChange={handleInput}
                        className="bg-transparent border-gray-300 border-2 w-[100%] mt-2 h-11 rounded-lg outline-none indent-2"
                        name="email"
                        required />
                    <br /><br />
                    <label htmlFor="password" className="font-medium text-neutral-500">Password</label><br />
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password . . ."
                        onChange={handleInput}
                        className="bg-transparent border-gray-300 border-2 w-[100%] mt-2 h-11 rounded-lg outline-none indent-2"
                        name="password"
                        required />
                    <br />
                    <button className="btn w-[100%] mt-5 bg-blue-600 text-white hover:bg-blue-500 border-none rounded-lg h-9">
                        Login
                    </button>
                    <ToastContainer
                        position="bottom-left"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                        transition:Bounce />
                    <p className="mt-5 text-neutral-400 font-semibold">
                        You don't have an account?
                        <Link className="text-blue-700 font-bold" to='/register'>
                            Register now
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
