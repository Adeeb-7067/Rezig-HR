import React, { useRef } from 'react';
import satyaKabir from "../Assets/image 2.png";
import Rezig from "../Assets/SigninLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { setEmail } from "../Redux/Features/userslice";
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.user);

   const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      e.target.value = value;
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === '') {
      // Allow clearing
    } else {
      e.target.value = '';
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };


  return (
    <div className="flex w-full min-h-screen bg-[#E1DAFC]">
      
      <div className="w-full md:w-1/2 relative left-0  md:left-50 lg:left-65 xl:left-90 flex justify-center items-center bg-[#E1DAFC]">
        <div className="absolute md:static top-10 md:top-0 mx-4 md:mx-0 bg-[#FFFFFF] drop-shadow-2xl shadow-[#9376CA38] rounded-2xl w-full max-w-md md:max-w-xl p-6 md:p-10 z-10">
          <div className="flex flex-col mx-5 ">
            <div className='flex flex-col items-center '>

            <img src={Rezig} alt="Rezig logo" className="h-18 w-auto mb-8" />
            </div>
            <div className = 'flex flex-col justify-center mx-4'>

            <h1 className="text-[#58585A] text-md md:text-xl font-semibold  font-normal  mb-1">
              Verify Code
            </h1>
            <p className="text-[#828282] text-[0.8rem] font-semibold  mb-0">
Enter the code we sent to you email
            </p> 
            <p className='text-[#828282] text-[0.8rem] mb-7 font-normal'>
              OTP has been sent to example@gmail.com
              </p>
            </div>

            <div className="flex flex-wrap items-start justify-evenly  gap-4 sm:gap-0 w-full mb-6">
  {[...Array(6)].map((_, i) => (
    <input
      key={i}
      type="text"
      maxLength={1}
      className="w-7 h-7 sm:w-8 sm:h-8 md:w-[45px] md:h-[45px] text-[24px]  sm:text-[0.8rem] border border-[#8629DF] focus:border-2 text-center text-gray-600 rounded-lg bg-[#FAFAFA] focus:outline-[#9376CA] transition-all duration-200"
      onChange={(e) => handleChange(e, i)}
      onKeyDown={(e) => handleKeyDown(e, i)}
      ref={(el) => (inputRefs.current[i] = el)}
    />
  ))}
</div>

               <Link to="/new-password">
            <button className="w-full py-2 px-8 cursor-pointer rounded-lg bg-[#8629DF] text-white font-semibold hover:bg-[#7e61b9] transition-all">
              Verify

               
            </button>
               </Link>
           <div className='flex flex-col items-center gap-2 mt-6'>
            <span className='text-[0.8rem] text-[#8629DF] underline cursor-pointer'>
                Resend Code
            </span>
                 <Link to="/">
             <span className='text-[0.8rem] text-[#8629DF] underline cursor-pointer'>
                I remembered, i wanna log in.
                 
            </span>
                 </Link>
           </div>
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
