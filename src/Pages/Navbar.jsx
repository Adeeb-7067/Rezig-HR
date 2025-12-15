import React from "react";
import Dashboard from "../Assets/DashBoard.png";
import { CiMenuFries } from "react-icons/ci";
import { LogOut } from "lucide-react";
import { useTheme } from "./themeProvider";
import { Button } from "@/components/ui/button";
import RezigLogo from '../Assets/SigninLogo.png'
import { HiMiniBars4 } from "react-icons/hi2";

// shadcn/ui imports
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Link } from 'react-router-dom';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Sun, Moon } from "lucide-react"; 
import toast from "react-hot-toast";

const Navbar = ({ onMenuClick }) => {


const ModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const changeTheme=()=>{
    setTheme(theme === "light" ? "dark"  : "light")
if(theme ==='light'){
  toast('Changed to Dark!',
  {
    icon: <Moon/>,
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  }
);
} else{
  toast('Changed to Light!',
  {
    icon: <Sun/>,
    style: {
      borderRadius: '10px',
      background: '#FFFF',
      color: '#333',
    },
  }
);
} }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={changeTheme }
      className="rounded-full transition-all duration-300"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-400 dark:text-yellow-300" />
      )}
    </Button>
  );
};


  return (
    <div className="bg-[#FFFFFF] dark:bg-gray-900 shadow-md p-4 w-full h-[60px] dark:border dark:border-b-gray-700  ">
      <div className="flex flex-row justify-between items-center gap-4 ">
        {/* Left */}
        <div className="flex items-center gap-4">
          <div className="h-[27px] w-[188px] ml-1 flex gap-4">
            <img
              src={RezigLogo}
              alt="DashBoard"
              className="h-full w-fit object-contain block"
            />
            <button onClick={onMenuClick} className="block cursor-pointer">
              <HiMiniBars4 className="h-5 w-5 dark:text-white" />
            </button>
          </div>
          <h1 className="text-sm md:text-xl font-semibold text-gray-800 dark:text-gray-100 hidden md:block">
            HRM DASHBOARD
          </h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
<ModeToggle/>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer">
                  {/* Avatar */}
                <div className="relative">
                  <Avatar className="h-9 w-9 border border-purple-200 shadow-sm">
                    <AvatarImage src='https://i.pravatar.cc/100' alt='Erica' />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                </div>
                {/* User info */}
                <div className="hidden sm:block text-left ">
                  <p className="text-base font-semibold text-gray-800 dark:text-gray-50">
                    Ericika
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-50">Hr</p>
                </div>

              
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48 mr-4">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
                 <Link to="/">
              <DropdownMenuItem className="text-red-600 flex items-center gap-2 " onClick={()=>toast.success  ('LogOut succesfull')}>
                <LogOut size={16} /> Logout
              </DropdownMenuItem>
                 </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
