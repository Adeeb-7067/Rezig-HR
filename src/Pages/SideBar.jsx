import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiLayout, FiUser } from "react-icons/fi";
import { HiOutlineDuplicate } from "react-icons/hi";
import { RiExternalLinkLine } from "react-icons/ri";
import { SlDirections } from "react-icons/sl";
import { TbMessage } from "react-icons/tb";
import {
  TfiArchive,
  TfiBarChart,
  TfiCheckBox,
  TfiFaceSmile,
  TfiLayoutMenuV,
  TfiPencilAlt,
  TfiRulerPencil,
  TfiUser,
} from "react-icons/tfi";

const SideBar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <FiLayout className="h-5 w-5" />,
      path: "/dashboard",
    },
    {
      name: "EmployeList",
      icon: <FiUser className="h-5 w-5" />,
      path: "/EmployeeList",
    },

    {
      name: "Widgets",
      icon: <HiOutlineDuplicate className="h-5 w-5" />,
      path: "/",
    },
    {
      name: "Graphs & Charts",
      icon: <TfiRulerPencil className="h-5 w-5" />,
      path: "/",
    },
    {
      name: "Calender View",
      icon: <TfiArchive className="h-5 w-5" />,
      path: "/",
    },
    {
      name: "Form Elements",
      icon: <TfiCheckBox className="h-5 w-5" />,
      path: "/",
    },
    { name: "Editors", icon: <TfiPencilAlt className="h-5 w-5" />, path: "/" },
    { name: "Charts", icon: <TfiBarChart className="h-5 w-5" />, path: "/" },
    { name: "Tables", icon: <TfiLayoutMenuV className="h-5 w-5" />, path: "/" },
    {
      name: "Popups",
      icon: <RiExternalLinkLine className="h-5 w-5" />,
      path: "/",
    },
    {
      name: "Notifications",
      icon: <TbMessage className="h-5 w-5" />,
      path: "/",
    },
    { name: "Icons", icon: <TfiFaceSmile className="h-5 w-5" />, path: "/" },
    { name: "Maps", icon: <SlDirections className="h-5 w-5" />, path: "/" },
    { name: "User Pages", icon: <TfiUser className="h-5 w-5" />, path: "/" },
  ];

  return (
    <div className="bg-[#FFFFFF] dark:bg-gray-900  flex flex-col gap-1 mt-3 mx-4 h-120 overflow-y-auto no-scrollbar">
      {menuItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-2 text-[0.7rem] p-2 rounded-sm cursor-pointer font-semibold w-full
         ${
           isActive 
             ? "bg-[#8629DF] text-white"
             : "text-[#111111]/90 dark:text-white hover:bg-[#8629DF] dark:hover:bg-gray-600 hover:text-[#ffff]"
         }`
          }
        >
          {item.icon}
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default SideBar;
