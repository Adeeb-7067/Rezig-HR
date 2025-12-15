import React, { useState } from "react";
import signinBanner from "../Assets/SignIn.png";
import satyaKabir from "../Assets/image 2.png";
import RezigLogo from "../Assets/SigninLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { setDomain, setEmail, setPassword } from "../Redux/Features/userslice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { email, password, domain } = useSelector((state) => state.user);

  const handleEmailChange = (e) => {
    dispatch(setEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    dispatch(setPassword(e.target.value));
  };

  const handleDomainChange = (e) => {
    dispatch(setDomain(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Domain:", domain);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-3 dark:bg-white">
      {/* Left Banner Section */}
      <div className="hidden md:flex items-center justify-center col-span-2">
        <img
          src={signinBanner}
          alt="banner"
          className="p-6 md:p-10 object-contain h-[80%] w-[80%]"
        />
      </div>

      {/* Right Form Section */}
      <div className="col-span-1 w-full bg-[#7548C7]  border-l-2 border-[#7548C7] rounded-none md:rounded-l-4xl relative flex items-center justify-center px-4 sm:px-6 md:px-10 py-8">
        {/* Corner Image */}
        <div className="h-[40px] w-[120px] sm:h-[65px] sm:w-[150px] right-3 top-3 md:right-1 md:top-1 absolute hidden md:block">
          <img className="h-full w-full" src={RezigLogo} alt="satyakabir" />
        </div>

        {/* Form Container */} 
        <div className="w-full max-w-[330px] mb-4 flex flex-col justify-center">
          <div className = 'flex justify-center'>
            {/* Logo */}
            <div className="h-[60px] w-[140px] sm:h-[70px] sm:w-[160px]  ">
              <img
                src={RezigLogo}
                alt="Logo"
                className="h-full w-full object-contain"
              />
            </div>
            {/* <h1 className="text-[#FFFF] text-base sm:text-xl font-bold text-center md:text-left mb-3">
              Let's Connect
            </h1> */}
          </div>

          {/* Title */}
          <div className="flex flex-col mt-3 sm:mt-4">
            {/* Form Fields */}
            <div className="flex flex-col mt-2 space-y-1 ">
              {/* Email */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-[#FFFF] mb-1 text-base sm:text-[0.8rem] font-semibold"
                >
                  User Id / E-Mail
                </label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your User Id / E-Mail"
                  className="bg-white border border-[#9853F9] text-gray-600 rounded-sm px-3 sm:px-4 py-2  w-full text-[0.7rem] sm:text-[0.8rem] font-semibold"
                />
              </div>

              {/* Password */}
              <div className="relative flex flex-col">
                <label
                  htmlFor="password"
                  className="text-[#FFFF] mb-1 text-base sm:text-[0.8rem] font-semibold"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your Password"
                  className="bg-white border border-[#9853F9] text-gray-600 rounded-sm px-3 sm:px-4 py-2  w-full text-sm sm:text-[0.8rem] font-semibold"
                />
                <span
                  className="absolute right-3 sm:right-4 top-8  cursor-pointer text-[#58585A] opacity-80"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <AiOutlineEye size={20} />
                  ) : (
                    <AiOutlineEyeInvisible size={20} />
                  )}
                </span>
              </div>

              {/* Domain */}
              <div className="flex flex-col">
                <label
                  htmlFor="domain"
                  className="text-[#FFFF] mb-1 text-base sm:text-[0.8rem] font-semibold"
                >
                  Domain
                </label>
                <input
                  type="text"
                  name="domain"
                  value={domain}
                  onChange={handleDomainChange}
                  placeholder="Enter your Domain"
                  className="bg-white border border-[#9853F9] text-gray-600 rounded-sm px-3 sm:px-4 py-2  w-full text-sm sm:text-[0.8rem] font-semibold"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Link to="/Dashboard">
              <button
              onClick={()=>toast.success('Sign-in Complete')}
              className="w-full text-[#FFFFF] text-sm sm:text-base md:text-[0.8rem] py-3 sm:py-2 px-6 sm:px-10 cursor-pointer rounded-sm bg-[#FACC16] font-semibold border border-[#FACC16] mt-5">
                Sign In
              </button>
            </Link>

            {/* Forgot Password */}
            <Link to="/forgot-password">
              <span className="flex justify-end mt-3 text-[#FFFF] text-xs sm:text-sm md:text-[0.8rem] opacity-80 cursor-pointer hover:underline font-semibold">
                Forgot Password?
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
