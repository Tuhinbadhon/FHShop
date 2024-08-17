import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import { MdEmail } from "react-icons/md";
import ReactDOM from 'react-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';


defineElement(lottie.loadAnimation);

const Profile = () => {

    const { user } = useContext(AuthContext);
    const helmetContext = {};


    const photoIcon = <>
        <div className="w-10 rounded-full">
            <lord-icon className='w-full h-full'
                src="https://cdn.lordicon.com/kthelypq.json"
                trigger="loop"
                delay="500"
                colors="primary:#000"
                style={{ width: '40px', height: '40px' }}
            >
            </lord-icon>
        </div>
    </>


    const editProfile = () => {
        <>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn" onClick={() => document.getElementById('my_modal_4').showModal()}>open modal</button>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Click the button below to close</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </>


    }


    return (
        <div className='my-10 p-2'>
             <HelmetProvider context={helmetContext}>
                <Helmet> 
                 <title>Profile</title>  
                </Helmet>
            </HelmetProvider>

            <div className="card bg-blue-300 glass border flex mx-auto flex-col max-w-md p-6 dark:bg-gray-50 dark:text-gray-800">
                {
                    user.photoURL ?
                        <img src={user.photoURL} alt="User" className="flex-shrink-0 object-cover h-64 rounded-sm sm:h-96 dark:bg-gray-500 aspect-square" />
                        :
                        <div className='mx-auto'>
                            {photoIcon}
                        </div>

                }


                <div className='text-center mt-4'>
                    <h2 className="text-xl font-semibold">{user.displayName} </h2>
                    <span className="justify-center pb-2 text-xl dark:text-gray-600 flex flex-row gap-2">
                        <p className='my-auto'><MdEmail /> </p>
                        <p>{user.email} </p>

                    </span>
                  

                    

                </div>
            </div>
        </div>
    );
};

export default Profile;
