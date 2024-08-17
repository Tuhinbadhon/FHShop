import React, { useContext, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import Footer from '../Components/Footer/Footer';
import Nav from '../Components/Nav/Nav';
import './loader.css'

const MainLayout = () => {
    const { loading } = useContext(AuthContext);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 2000); // 2 seconds delay

        return () => clearTimeout(timer); // Clear timeout if the component unmounts
    }, []);

    if (showLoader || loading) {
        return (
            <div className="loading-wave mx-auto">
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
            </div>
        );
    }

    return (
        <div>
            <div className='max-w-6xl mx-auto mb-10'>
                <Nav />
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
