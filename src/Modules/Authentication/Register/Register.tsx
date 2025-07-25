import logo from '../../../assets/Logo-white.png';
import imgAuth from '../../../assets/Login Image.png';
import img1 from '../../../assets/login.svg';
import img2 from '../../../assets/regist.svg';
import img3 from '../../../assets/input icon.svg';
import img4 from '../../../assets/email-1-svgrepo-com (1).svg';
import img5 from '../../../assets/contact-details-svgrepo-com.svg';
import eye from '../../../assets/eye-svgrepo-com.svg';
import uneye from '../../../assets/eye-off-svgrepo-com.svg';

import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { axiosInstance, USERS_URLS } from '../../../Server/baseUrl';
import { useState } from 'react';
import { validation } from '../../../Server/Validation';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';
import type { UserRegister } from '../../../Interfaces/interfaces';


export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
 

  const {
    register,
    handleSubmit,
    formState: { errors },
   
  } = useForm<UserRegister>();

  const onSubmit = async (data: UserRegister): Promise<void> => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(USERS_URLS.register, data);
      toast.success(res.data.message);
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
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
              Join us and start learning with QuizWiz!
            </h4>

            <div className="flex flex-nowrap gap-6 pt-3 overflow-x-auto">
              <Link to="/login">
                <button className="flex flex-col items-center bg-[#2d2d2d] text-white min-w-[140px] px-6 py-4 rounded-lg hover:bg-[#3a3a3a] transition">
                  <img alt='login' src={img1} className="text-white text-5xl mb-2" />
                  <span className="text-sm">Sign in</span>
                </button>
              </Link>
              <button className="flex flex-col items-center bg-[#2d2d2d] text-white min-w-[140px] px-6 py-4 rounded-lg border-2 border-lime-300 hover:bg-[#3a3a3a] transition">
                <img alt='register' src={img2} className="text-lime-300 text-5xl mb-2" />
                <span className="text-sm">Sign Up</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='pt-2'>
           <div className="flex gap-4">
  
              <div className="w-1/2 mb-4">
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-white">
                  First Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 start-0 flex items-center ps-3">
                    <img alt='passwordl-lock' src={img5} className="text-white w-5 h-5" />
                  </span>
                  <input
                    type="text"
                    id="first_name"
                    className="bg-[#0f172a] border border-white text-white text-sm rounded-md block w-full ps-10 p-2.5 placeholder-white"
                    placeholder="Enter your first name"
                    {...register('first_name', validation.Register.firstNameValidation)}
                  />
                </div>
                {errors.first_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>
                )}
              </div>

              {/* Last Name */}
              <div className="w-1/2 mb-4">
                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-white">
                  Last Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 start-0 flex items-center ps-3">
                    <img alt='passwordl-lock' src={img5} className="text-white w-5 h-5" />
                  </span>
                  <input
                    type="text"
                    id="last_name"
                    className="bg-[#0f172a] border border-white text-white text-sm rounded-md block w-full ps-10 p-2.5 placeholder-white"
                    placeholder="Enter your last name"
                    {...register('last_name', validation.Register.lastNameValidation)}
                  />
                </div>
                {errors.last_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>
                )}
              </div>
            </div>


            {/* Email */}
            <label className="text-white block mb-2">Email</label>
            <div className="relative mb-2">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                 <img alt='passwordl-lock' src={img4} className="text-white w-5 h-5" />
              </div>
              <input
                type="text"
                className="bg-[#0f172a] border border-white text-white text-sm rounded-md block w-full ps-10 p-2.5 placeholder-white"
                placeholder="Enter your email"
                {...register('email', validation.login.email)}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mb-2">{errors.email.message}</p>
            )}

            {/* Password */}
            <label className="text-white block mb-2">Password</label>
            <div className="relative mb-2">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <img alt='passwordl-lock' src={img3} className="text-white w-5 h-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                className="bg-[#0f172a] border border-white text-white text-sm rounded-md block w-full ps-10 p-2.5 placeholder-white"
                placeholder="Enter your password"
                {...register('password', validation.login.password)}
              />
              <div
                className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img alt='eye' src={showPassword ? eye : uneye} className="w-5 h-5" />
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mb-2">{errors.password.message}</p>
            )}

        
           
            {/* Role */}
            <label className="text-white block mb-2">Role</label>
            <select
              className="bg-[#0f172a] border border-white text-white text-sm rounded-md block w-full p-2.5 mb-2"
              {...register('role', validation.Register.roleValidation)}
            >
              <option value="">Select role</option>
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mb-2">{errors.role.message}</p>
            )}

            {/* Submit */}
            <div className="mt-5">
              <button
                type="submit"
                className="bg-white text-black font-bold py-2 px-4 rounded"
              >
                {loading ? <FaSpinner className="animate-spin" /> : 'Sign up'}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side Image */}
        <div className="hidden md:flex md:w-6/12 w-full h-auto justify-center">
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

