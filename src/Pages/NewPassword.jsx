import React, { useState } from 'react';
import satyaKabir from "../Assets/image 2.png";
import Rezig from "../Assets/SigninLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { setNewPassWord, setConfirmPassword } from "../Redux/Features/userslice";
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // ✅ eye icons (lightweight)

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { newPassword, confirmPassword } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (e) => {
    dispatch(setNewPassWord(e.target.value));
  };
  const handleConfirmPasswordChange = (e) => {
    dispatch(setConfirmPassword(e.target.value));
  };

  return (
    <div className="flex w-full min-h-screen bg-[#E1DAFC]">
      {/* Left BG & Floating Card */}
      <div className="w-full md:w-1/2 relative left-0  md:left-50 lg:left-65 xl:left-90 flex justify-center items-center bg-[#E1DAFC]">
        <div className="absolute md:static top-10 md:top-0 mx-4 md:mx-0 bg-[#FFFFFF] drop-shadow-2xl shadow-[#9376CA38] rounded-2xl w-full max-w-md md:max-w-xl p-4 md:p-10 z-10">
          <div className="flex flex-col ">
            <div className='flex flex-col items-center'>
              <img src={Rezig} alt="Rezig logo" className="h-20 w-auto mb-4" />
            </div>
            <h1 className="text-[#58585A] text-[45px] md:text-xl lg:text-xl font-semibold  mb-0">
              Set New Password
            </h1>
            <p className="text-[#58585A] text-[0.8rem]  mb-8">
              Set a new password for your account.
            </p>

            <label
              htmlFor="email"
              className="text-[#153060] mb-1 text-[0.8rem] font-semibold w-full"
            >
              New Password
            </label>
            <div className="relative w-full mb-2">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={newPassword}
                onChange={handlePasswordChange}
                placeholder="*************"
                  className="bg-white border border-[#9853F9] text-gray-600 rounded-sm px-3 sm:px-4 py-2  w-full text-sm sm:text-[0.8rem] font-semibold"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5  text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <label
              htmlFor="email"
              className="text-[#153060] mb-1 text-[0.8rem] font-semibold w-full"
            >
              Confirm Password
            </label>
                      <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="*************"
                  className="bg-white border border-[#9853F9] text-gray-600 rounded-sm px-3 sm:px-4 py-2  w-full text-sm sm:text-[0.8rem] font-semibold"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5  text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Link to="/Dashboard">
              <button className="w-full text-[0.8rem] py-2 px-8 mb-6 mt-4 cursor-pointer rounded-sm bg-[#8629DF] text-white  hover:bg-[#7e61b9] transition-all">
                Set Password
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="hidden md:flex w-1/2 bg-[#E1DAFC] rounded-l-4xl relative">
        <div className="absolute top-4 right-4 h-14 w-auto">
          <img src={satyaKabir} alt="satya kabir" className="h-full w-auto" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
