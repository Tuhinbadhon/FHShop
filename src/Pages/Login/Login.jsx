import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';


import Swal from 'sweetalert2'
import ReactDOM from 'react-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';


const Login = () => {
    const [showPass, setShowpass] = useState(false);
    const helmetContext = {};
    
    const { signInUser,signInWithGoogle,signInWithGithub } = useContext(AuthContext);
    const navigate= useNavigate(); 
    
    // email login 
    const loginFormHandler = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;


        signInUser(email, password)
            .then(result => {
                Swal.fire({
                    
                    text: 'Successful login',
                    icon: 'success',
                    
                  });
          
                e.target.reset();
                setShowpass(false);
               
                navigate('/');

            })
            .catch(error => {
                Swal.fire({
                    
                    text: error.message,
                    icon: 'error',
                    
                  });
      

                  e.target.password.reset();
            });



    };


    //google login
    const googleLoginHandler=()=>{
        signInWithGoogle()
        .then((result)=>{
            Swal.fire({
                    
                text: 'Successful login',
                icon: 'success',
                
              })
            navigate('/');
        })
        .catch((error)=>{
            Swal.fire({
                    
                text: error.message,
                icon: 'error',
                
              })
        })
    }

    //github login
    const githubLoginHandler=()=>{
        signInWithGithub()
        .then((result)=>{
            const loggedUser = result.user;
            Swal.fire({
                    
                text: 'Successful login',
                icon: 'success',
                
              })
            navigate('/');
        })
        .catch((error)=>{
            Swal.fire({
                    
                text: error.message,
                icon: 'error',
                
              })
          
        })
    }


    return (
        <div className=' p-4'>
             <HelmetProvider context={helmetContext}>
                <Helmet> 
                 <title>Login</title>  
                </Helmet>
            </HelmetProvider>

            <div className="mx-auto w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800">
                <h2 className="mb-3 text-3xl font-semibold text-center">Login to View Products</h2>
            
                <div className="my-6 space-y-4">
                    <button onClick={googleLoginHandler} aria-label="Login with Google" type="button" className="btn btn-warning flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                        <p>Login with Google</p>
                    </button>
                 
                   
                </div>
                <div className="flex items-center w-full my-4">
                    <hr className="w-full dark:text-gray-600" />
                    <p className="px-3 dark:text-gray-600">OR</p>
                    <hr className="w-full dark:text-gray-600" />
                </div>
                <form noValidate="" action="" className="space-y-8" onSubmit={loginFormHandler}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm">Email address</label>
                            <input type="email" name="email" id="email" placeholder="mr.balok019@gmail.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" required />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label htmlFor="password" className="text-sm">Password</label>
                                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-600">Forgot password?</a>
                            </div>
                            <div className='relative'>
                                    <input
                                        type={showPass ? 'text' : 'password'}
                                        name="password"
                                        id="password"
                                        placeholder="*****"
                                        className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                                        required
                                    />
                                    <span
                                        className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'
                                        onClick={() => { setShowpass(!showPass) }}
                                    >
                                        {showPass ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                        </div>
                    </div>
                    <button  className="btn w-full btn-secondary px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">Log in</button>
                </form>
            </div>
    
        </div>
    );
};

export default Login;