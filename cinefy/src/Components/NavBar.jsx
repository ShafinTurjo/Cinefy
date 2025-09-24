import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react';
import { assets } from '../assets/assets';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';


const NavBar = () => {

  const [isOpen,setIsOpen]=useState(false);
  const {user}=useUser();
  const {openSignIn}=useClerk();
  const navigate =useNavigate();

  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-4 bg-black'>
        <Link to='/' className='flex items-center'>
        <img src={assets.logo} alt="logo" className='w-32 h-auto'/>
        </Link>
        <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-6 md:px-6 py-2 
max-md:h-screen md:rounded-full backdrop-blur bg-black/70 md:bg-white/20 md:border 
border-gray-300/20 overflow-hidden transition-[width] duration-300 ${isOpen ? 'max-md:w-full':'max-md:w-0'}`}>
            <XIcon className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer' onClick={()=>setIsOpen(!isOpen)}/>


            <Link onClick={()=>{scrollTo(0,0);setIsOpen(false)}} to='/'>Home</Link>
            <Link onClick={()=>{scrollTo(0,0);setIsOpen(false)}} to='/movies'>Movies</Link>
            <Link onClick={()=>{scrollTo(0,0);setIsOpen(false)}} to='/theater'>Theaters</Link>
            <Link onClick={()=>{scrollTo(0,0);setIsOpen(false)}} to='/'>Releases</Link>
            <Link onClick={()=>{scrollTo(0,0);setIsOpen(false)}} to='/favorite'>Favorites</Link>

        </div>
        <div className='flex items-center gap-6 md:gap-8'>
            <SearchIcon className='max-md:hidden w-6 h-6 cursor-pointer'/>
            {
              !user ?(
                <button onClick={openSignIn}className='px-4 py-2 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer' >
                  Login
                </button>
              ):
              
              (
                <div className="flex items-center gap-4">
                <UserButton/>
                  <div onClick={()=>navigate('/my-bookings')} className="text-white text-sm hover:underline cursor-pointer flex items-center gap-1">
                    <TicketPlus size={18}/> My Bookings
                  </div>
                </div>
              )
            }
            

        </div>
        <MenuIcon className='max-md:m1-4 md:hidden w-8 h-8 cursor-pointer' onClick={()=>setIsOpen(!isOpen)}/>

    </div>
  );
};

export default NavBar;
