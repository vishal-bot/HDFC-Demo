
import logo from './HDFC-Bank-Logo.png';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';
// import Loader from './Loader.jsx';
// import {BarLoader} from 'react-spinners';
import { RiseLoader } from 'react-spinners';


function Login() {
  const [capVal, setCapVal] = useState(null)
  const [username, usernameupdate] = useState('');
  const [password, passwordupdate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const usenavigate = useNavigate();
  sessionStorage.clear();


  useEffect(() => { sessionStorage.clear(); }, []);


  const ProceedLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })
      .then(res => res.json())
      .then((resp) => {
        if ('token' in resp) {
          sessionStorage.setItem('username', resp.username);
          sessionStorage.setItem('email', resp.email);
          sessionStorage.setItem('image-url', resp.image);
          setIsLoading(false);
          // sessionStorage.setItem('Token', resp.token);
          usenavigate('/');
        } else {
          setIsLoading(false);
          alert('Error Message: ' + resp.message);
        }
      }).catch((err) => {
        setIsLoading(false);
        alert('Login Failed due to : ' + err.message);
      }
      );
  }

  return (
    <>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm p-5 md:shadow-2xl shadow-[#004C8F] rounded-2xl">
          <img
            className="mx-auto h-10 w-auto"
            src={logo}
            alt="HDFC BANK LOGO"
          />
          <h3 className="mt-5 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h3>
          {/* </div> */}

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={ProceedLogin}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={e => usernameupdate(e.target.value)}
                    autoComplete="username"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-[#004C8F] hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => passwordupdate(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <ReCAPTCHA sitekey="6Lf6YSUpAAAAAL46ZXDfqaEF5WQHBioPdJy44vQp" onChange={(val) => setCapVal(val)} />
              </div>
              <div className='text-center'>
                {isLoading && <RiseLoader color="#004c8f" margin={1} size={10} />}
                {/* {isLoading && <BarLoader color="#004c8f" height={6} width={200} /> } */}
              </div>
              <div className=''>
                <button
                  disabled={!capVal}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[#004C8F] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004C8F]">

                  <span>Sign in</span>
                </button>
                {/* {isLoading ? <Loader /> : '' } */}
              </div>

            </form>
            {/* <div className="text-sm text-end mt-4">
                    <a href="#" className="font-semibold text-[#004C8F] hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div> */}
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link to={'/#'} className="font-semibold leading-6 text-[#004C8F] hover:text-[#004C8F]">
                Click Here to Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;