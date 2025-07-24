import logo from '../../../assets/Logo-white.png';
import imgAuth from '../../../assets/Login Image.png';
import img1 from '../../../assets/login.svg';
import img2 from '../../../assets/regist.svg';
import img3 from '../../../assets/input icon.svg';
import eye from '../../../assets/eye-svgrepo-com.svg';
import uneye from '../../../assets/eye-off-svgrepo-com.svg';

import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { axiosInstance, USERS_URLS } from '../../../Server/baseUrl';
import { useState } from 'react';
import { validation } from '../../../Server/Validation';
import { toast } from 'react-toastify';
import type { Logged_in_Users } from '../../../Interfaces/interfaces';
import { FaSpinner } from 'react-icons/fa';



export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Logged_in_Users>();

  const onSubmit = async (data: Logged_in_Users): Promise<void> => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(USERS_URLS.login, data);
      toast.success(res.data.message);
      localStorage.setItem('token', res.data.data.accessToken);
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login min-h-screen overflow-hidden bg-[#0f172a]">
      <div className="flex flex-wrap">
        <div className="md:w-6/12 p-10 w-full">
          <div className="loginContant">
            <img src={logo} alt="logo" />
            <h4
              style={{ color: '#C5D86D' }}
              className="font-bold text-1xl mt-10"
            >
              Continue your learning journey with QuizWiz!
            </h4>

            <div className="flex flex-nowrap gap-6 pt-10 overflow-x-auto">
              <button className="flex flex-col items-center bg-[#2d2d2d] text-white min-w-[140px] px-6 py-4 rounded-lg border-2 border-lime-300 hover:bg-[#3a3a3a] transition">
                <img src={img2} className="text-lime-300 text-5xl mb-2" />
                <span className="text-sm">Sign in</span>
              </button>
              <Link to="/register">
                <button className="flex flex-col items-center bg-[#2d2d2d] text-white min-w-[140px] px-6 py-4 rounded-lg hover:bg-[#3a3a3a] transition">
                  <img src={img1} className="text-white text-5xl mb-2" />
                  <span className="text-sm">Sign Up</span>
                </button>
              </Link>

            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="pt-10" action="">
            <label htmlFor="email" className="text-white block mb-2">
              Email
            </label>
            <div className="relative mb-1">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  className="w-5 h-5 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input
                type="text"
                id="email"
                aria-label="Email Address"
                className="bg-[#0f172a] border border-white text-white text-sm rounded-md focus:ring-lime-400 focus:border-lime-400 block w-full ps-10 p-2.5 placeholder-white"
                placeholder="Type your email"
                {...register('email', validation.login.email)}
              />
            </div>
            <div className="min-h-[20px]">
              {errors.email?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {String(errors.email.message)}
                </p>
              )}
            </div>

            <label htmlFor="password" className="text-white block mb-2 mt-4">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <img src={img3} className="text-white w-5 h-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                aria-label="Password"
                className="bg-[#0f172a] border border-white text-white text-sm rounded-md focus:ring-lime-400 focus:border-lime-400 block w-full ps-10 p-2.5 placeholder-white"
                placeholder="Type your password"
                {...register('password', validation.login.password)}
              />
              <div
                className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <img src={eye} className="text-white w-5 h-5" />
                ) : (
                  <img src={uneye} className="text-white w-5 h-5" />

                )}
              </div>
            </div>

            <div className="min-h-[20px]">
              {errors.password?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {String(errors.password.message)}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mt-5">
              <div className="text-sm">
                <button
                  type="submit"
                  className="bg-white text-black font-bold py-2 px-4 rounded"
                >
                  {loading ? (<>
                   <FaSpinner className="animate-spin" />
                  </>


                  ) : (
                    'Sign in'
                  )}

                </button>
              </div>
              <div className="text-sm">
                <p className="font-medium text-white">
                  Forgot your password?
                  <Link
                    className="text-lime-400 hover:text-lime-500"
                    to="/forget-password"
                  >
                    {' '}click here
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>

        <div className="hidden md:flex md:w-6/12 w-full justify-center">
          <div
            style={{ height: '85%' }}
            className="imgAute bg-red-300 w-9/12 flex justify-center rounded-lg mt-12"
          >
            <img
              src={imgAuth}
              alt="imgAuth"
              className="p-8 object-contain max-h-full"
            />
          </div>
        </div>
      </div>
    </div>

  );
}
