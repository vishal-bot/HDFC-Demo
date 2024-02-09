import logo from './hdfc-logo-sm.png';
import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {

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

  }, [location, usenavigate])


  return (
    <>
      {showmenu && <>
        {/* ========== HEADER ========== */}
        <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-blue-700 border-b text-sm py-2.5 sm:py-4 lg:ps-64 dark:bg-gray-800 dark:border-gray-700">
          <nav
            className="flex basis-full items-center
             w-full mx-auto px-4 sm:px-6 md:px-8"
            aria-label="Global"
          >
            <div className="me-5 lg:me-0 lg:hidden">
              <Link to="/"
                className="flex text-xl font-semibold text-white"
                aria-label="Brand"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-10 float-left"
                    src={logo}
                    alt="Your Company"
                  />
                  <span className=''>HDFC BANK</span>
                </div>

              </Link>
            </div>
            <div className="w-full flex items-center justify-end ms-auto sm:justify-between sm:gap-x-3 sm:order-3">

              <div className="hidden sm:block">
                <label htmlFor="icon" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                    <svg
                      className="flex-shrink-0 h-4 w-4 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx={11} cy={11} r={8} />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="icon"
                    name="icon"
                    className="py-2 px-4 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    placeholder="Search"
                  />
                </div>
              </div>
              <div className="flex flex-row items-center justify-end gap-2">

                <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                  <button
                    id="hs-dropdown-with-header"
                    type="button"
                    className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    <img
                      className="inline-block h-[2.375rem] w-[2.375rem] bg-black rounded-full ring-2 ring-white dark:ring-gray-800"
                      src={sessionStorage.getItem('image-url')} alt=''
                    />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700"
                    aria-labelledby="hs-dropdown-with-header"
                  >
                    <div className="py-3 px-5 -m-2 bg-blue-500 rounded-t-lg dark:bg-gray-700">
                      <p className="text-sm text-white dark:text-gray-400">
                        Signed in as
                      </p>
                      <p className="text-sm font-medium text-white dark:text-gray-300">
                        {sessionStorage.getItem('email')}
                      </p>
                    </div>
                    <div className="mt-2 py-2 first:pt-0 last:pb-0">
                      <Link to="/login"
                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      >
                        <svg
                          className="flex-shrink-0 w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx={9} cy={7} r={4} />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        Sign Out
                      </Link>
                    </div>
                  </div>
                </div>
                {/* <div className='hidden md:block'>
                  <div className='rtl:mr-3'>
                    <p className="text-sm font-medium text-white ">{sessionStorage.getItem('username')}</p>
                    <p className="text-sm font-medium text-white ">{sessionStorage.getItem('email')}</p>
                  </div>
                </div> */}
              </div>
            </div>
          </nav>
        </header>
        {/* ========== END HEADER ========== */}
        {/* ========== MAIN CONTENT ========== */}
        {/* Sidebar Toggle */}
        <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center py-4">
            {/* Navigation Toggle */}
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600"
              data-hs-overlay="#application-sidebar"
              aria-controls="application-sidebar"
              aria-label="Toggle navigation"
            >
              <span className="sr-only">Toggle Navigation</span>
              <svg
                className="flex-shrink-0 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1={3} x2={21} y1={6} y2={6} />
                <line x1={3} x2={21} y1={12} y2={12} />
                <line x1={3} x2={21} y1={18} y2={18} />
              </svg>
            </button>
            {/* End Navigation Toggle */}
            {/* Breadcrumb */}
            <ol
              className="ms-3 flex items-center whitespace-nowrap"
              aria-label="Breadcrumb"
            >
              <li className="flex items-center text-sm text-gray-800 dark:text-gray-400">
                Application
                <svg
                  className="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-400 dark:text-gray-600"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
              </li>
              <li
                className="text-sm font-semibold text-gray-800 truncate dark:text-gray-400"
                aria-current="page"
              >
                {location.pathname === '/' ? 'Dashboard' : location.pathname === '/projects' ? 'Projects' : location.pathname === '/about' ? 'About' : 'Contact'}
              </li>
            </ol>
            {/* End Breadcrumb */}
          </div>
        </div>
        {/* End Sidebar Toggle */}
        {/* Sidebar */}
        <div
          id="application-sidebar"
          className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full  transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-blue-700 border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="px-6">
            <Link to="/"
              className="flex-none text-2xl font-semibold text-white dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              aria-label="Brand"
            >
              <div className="flex-shrink-0 justify-between">
                <img
                  className="h-8 w-10 float-left"
                  src={logo}
                  alt="Your Company"
                />
                <span className='inline-block'>HDFC BANK</span>
              </div>
            </Link>
          </div>
          <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
            <ul className="space-y-1.5">
              <li>
                <Link to='/' className={classNames(location.pathname === '/' ? 'flex items-center gap-x-3.5 py-2 px-2.5 bg-blue-600 text-sm text-white rounded-lg' : 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-lg hover:bg-blue-600')}>
                  <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to='/projects' type="button" className={classNames(location.pathname === '/projects' ? 'flex items-center gap-x-3.5 py-2 px-2.5 bg-blue-600 text-sm text-white rounded-lg' : 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-lg hover:bg-blue-600')}>
                  <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                  Projects
                </Link>

              </li>
              <li>
                <Link to='/ToDo' className={classNames(location.pathname === '/oldDashboard' ? 'flex items-center gap-x-3.5 py-2 px-2.5 bg-blue-600 text-sm text-white rounded-lg' : 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-lg hover:bg-blue-600')}>
                  <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                  ToDo App

                </Link>

              </li>

              <li>
                <Link to='/about' type="button" className={classNames(location.pathname === '/about' ? 'flex items-center gap-x-3.5 py-2 px-2.5 bg-blue-600 text-sm text-white rounded-lg' : 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-lg hover:bg-blue-600')}>
                  <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                  About

                </Link>

              </li>
              <li>
                <Link to='/contact' className={classNames(location.pathname === '/contact' ? 'flex items-center gap-x-3.5 py-2 px-2.5 bg-blue-600 text-sm text-white rounded-lg' : 'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-lg hover:bg-blue-600')}>
                  <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                  Contact Us

                </Link>

              </li>
              <li className=''>
                <div className='absolute bottom-16 items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-lg'>
                  <p className="text-sm text-white dark:text-gray-400">
                    Signed in as
                  </p>
                  <p className="text-sm font-medium text-white dark:text-gray-300">
                    {sessionStorage.getItem('email')}
                  </p>
                </div>
              </li>
              <li>
                <Link to="/login"
                  className="absolute bottom-6 flex items-center gap-x-3.5 py-2 px-2.5 rounded-lg text-sm text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                >
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx={9} cy={7} r={4} />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  Sign Out
                </Link>
              </li>
              {/* <li className='absolute bottom-0 left-0 gap-x-3.5 py-2 px-2.5 items-center'>
                <div className="py-3 px-5 -m-2 rounded-t-lg dark:bg-gray-700">
                  <p className="text-sm text-white dark:text-gray-400">
                    Signed in as
                  </p>
                  <p className="text-sm font-medium text-white dark:text-gray-300">
                    {sessionStorage.getItem('email')}
                  </p>
                </div>
                <div className="mt-2 py-2 first:pt-0 last:pb-0">
                  <Link to="/login"
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                  >
                    <svg
                      className="flex-shrink-0 w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx={9} cy={7} r={4} />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    Sign Out
                  </Link>
                </div>
              </li> */}
            </ul>

          </nav>

        </div>
        {/* End Sidebar */}
        {/* Content */}
      </>
      }
    </>
  )
}
