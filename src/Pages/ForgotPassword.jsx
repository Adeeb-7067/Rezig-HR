import React from "react";
import satyaKabir from "../Assets/image 2.png";
import Rezig from "../Assets/SigninLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { setEmail } from "../Redux/Features/userslice";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.user);

  const handleEmailChange = (e) => {
    dispatch(setEmail(e.target.value));
  };

  return (
    <div className="flex w-full min-h-screen bg-[#E1DAFC]">
      {/* Left BG & Floating Card */}
      <div className="w-full md:w-1/2 relative left-0  md:left-50 lg:left-65 xl:left-90 flex justify-center items-center bg-[#E1DAFC]">
        <div className="absolute md:static top-10 md:top-0 mx-4 md:mx-0 bg-[#FFFFFF] drop-shadow-2xl  shadow-[#9376CA38] rounded-2xl w-full max-w-md md:max-w-xl p-6 md:pt-10 pb-[60px] z-10">
          <div className="flex flex-col mx-5 ">
            <div className="flex flex-col items-center">
              <img src={Rezig} alt="Rezig logo" className="h-18 w-auto mb-4" />
            </div>
            <h1 className="text-[#58585A] text-[1rem] md:text-base lg:text-xl font-semibold break-all  mb-0 mt-2">
              Forgot Password
            </h1>
            <p className="text-[#828282] text-[0.8rem]  mb-8">
              Start Your Password Recovery
            </p>

            <label
              htmlFor="email"
              className="text-[#153060] mb-1.5 text-[0.8rem] mx-2 font-semibold w-full word-[0.2rem]"
            >
              E-Mail / User Id
            </label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter E-Mail / User Id"
              className="bg-[#FAFAFA] text-[0.8rem] border border-[#8628DF] h-9 rounded-sm px-4 py-2  mb-6 w-full text-gray-600 font-semibold focus:border-[#8628DF] focus:border-2 "
            />

            <Link to="/OTP-verification">
              <button className="w-full px-5 py-2 cursor-pointer rounded-sm bg-[#8629DF] text-[0.8rem]  text-white font-semibold hover:bg-[#7e61b9] transition-all">
                SUBMIT
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
