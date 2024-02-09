import logoSm from './hdfc-logo-sm.png';
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Footer() {
    const [showmenu, showmenuupdateupdate] = useState(false);
    const usenavigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
      if (location.pathname === '/login' || location.pathname === '/register') {
        showmenuupdateupdate(false);
      } else {
        showmenuupdateupdate(true);
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
          usenavigate('/login');
        }
      }
  
    }, [location])
    return (
    <>
    {showmenu && 
    <div className="w-full pt-10 px-4 pb-5 bg-slate-100 border-t-2 sm:px-6 md:px-8 lg:ps-72">
        <div className='relative'>
                <div className="mx-auto max-w-screen-xl text-center">
                    <a href="#" className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="h-8 w-10" src={logoSm} alt="logo" />
                        HDFC BANK
                    </a>
                    <p className="my-6 text-gray-500 dark:text-gray-400">HDFC Bank Limited is an Indian banking and financial services company headquartered in Mumbai. It is India's largest private sector bank by assets and the world's fifth-largest bank by market capitalization as of August 2023</p>
                    {/* <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
                        <li>
                            <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
                        </li>
                        <li>
                            <a href="#" className="mr-4 hover:underline md:mr-6">Projects</a>
                        </li>
                        <li>
                            <a href="#" className="mr-4 hover:underline md:mr-6">FAQs</a>
                        </li>
                        <li>
                            <a href="#" className="mr-4 hover:underline md:mr-6">Contact</a>
                        </li>
                    </ul> */}
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023-2024 <a href="#" className="hover:underline">HDFC BANK</a>. All Rights Reserved.</span>
                </div>
        </div>
        </div>
}
    </>)
}