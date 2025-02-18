import React from 'react';
import logo from '../assets/logo.png';
import Img from '../assets/img1.jpg';
import { Link } from 'react-router-dom';
const SplashPage: React.FC = () => {
    return (
        <div className="w-full h-screen flex flex-col">
            {/* Logo Section */}
            <div className="flex justify-center m-6">
                <img src={logo} alt="Logo" className="w-32 sm:w-40 md:w-56" />
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row m-6 md:m-20 lg:m-24 justify-between items-center">
                {/* Image Section */}
                <img 
                    src={Img} 
                    alt="Cryptic Art" 
                    className="w-full sm:w-80 md:w-96 lg:w-104 border-amber-50 rounded-2xl" 
                />

                {/* Text Section */}
                <div className="mt-6 md:m-12 lg:m-30 text-center md:text-left">
                    <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-blue-300">
                        Dive into Cryptic:
                    </h1>
                    <h2 className="font-semibold text-fuchsia-400 text-md sm:text-lg md:text-xl">
                        Unlock the secrets hidden in Image sight. Explore the art of Encryption of steganography with us.
                    </h2>
                    <Link to='/home'>
                    <button className="btn btn-soft btn-accent border-blue-300 mt-4 px-4 py-2 text-sm sm:text-base md:text-lg">
                        Explore ➡️
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SplashPage;
