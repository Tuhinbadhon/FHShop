import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from '../../provider/AuthProvider';


import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2'
import ReactDOM from 'react-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';


const Registration = () => {
    const [registerError,setRegisterError]= useState('');
    const [showPass, setShowpass] = useState(false);
    const [showButton,setShowButton] =useState(true);

    const authInfo = useContext(AuthContext);
    const {createUser} = authInfo;
    //console.log(authInfo);

    const helmetContext = {};

    
    const registerFormHandler=e=>{
        e.preventDefault();
        const name=e.target.name.value;
        const photoURL=e.target.photoURL.value;
        const email=e.target.email.value;
        const password=e.target.password.value;

        //create user from firebase by AuthProvider
        if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}/.test(password)) {
            const errorMessage = 'Password must have at least one uppercase letter, one lowercase letter and one number and it must be minimum 6 characters';
            setRegisterError(errorMessage); 
            Swal.fire({
                text: errorMessage,
                icon: 'error',
            });
            return;
        }


         createUser(email,password)
         .then(result=>{
            Swal.fire({
                    
                text: 'Successfuly Registered',
                icon: 'success',
                
              })
            updateProfile(result.user, {
                displayName: name, 
                photoURL: photoURL
              })
              .then(() => {
                
              })
              .catch((error) => {
                Swal.fire({
                    
                    text: error.message,
                    icon: 'error',
                    
                  })
              });

            
            e.target.reset();
            setShowpass(false);
            setShowButton(true);
         })
         .catch(error=>{
            Swal.fire({
                    
                text: error.message,
                icon: 'error',
                
              })
            
         })
        
    }

    return (
        <div>   
            
           
            <div className=' p-4 max-h-max'>
            <HelmetProvider context={helmetContext}>
                <Helmet> 
                 <title>Registration</title>  
                </Helmet>
            </HelmetProvider>
                <div className="mx-auto w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800">
                    <h2 className="mb-3 text-3xl font-semibold text-center">Register NOW!</h2>
                  

                    <form noValidate="" action="" className="space-y-8" onSubmit={registerFormHandler}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="text" className="block text-sm">Your Name</label>
                                <input type="text" name="name" placeholder="Your Name" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="text" className="block text-sm">Photo URL</label>
                                <input type="text" name="photoURL" placeholder="http://www......" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm">Email address</label>
                                <input type="email" name="email" placeholder="mr.balok019@gmail.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" required />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between ">
                                    <label htmlFor="password" className="text-sm ">Password</label>

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
                        <div className='flex gap-2 '>
                                <input type="checkbox" onClick={()=>setShowButton(!showButton)} />
                                <p>I accept all the <a href='' ><u>Terms 
                                    & Conditions</u></a> </p>

                        </div>

                        <button  className="btn w-full btn-secondary px-8 py-3 
                        font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50"
                        disabled={showButton}>Register</button>
                    </form>
                </div>
            </div>
         
        </div>
        
    );
};

export default Registration;