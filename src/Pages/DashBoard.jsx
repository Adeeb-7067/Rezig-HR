import React from "react";
import { Link } from "react-router-dom";
import Stat01 from "../Assets/Stats-1.png";
import Stat02 from "../Assets/Stats-02.png";
import Stat03 from "../Assets/Stats-3.png";
import Stat04 from "../Assets/Stats-4.png";
import Stat05 from "../Assets/Stats-5.png";
import Stat06 from "../Assets/Stats-6.png";
import Stat07 from "../Assets/Stats-7.png";
import Stat08 from "../Assets/Stats-8.png";
import { IoIosArrowForward } from "react-icons/io";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
} from "recharts";

const DashBoard = () => {
  const attendanceData = [
    { name: "Present", value: 35, color: "#10B981" },
    { name: "Leave", value: 30, color: "#3B82F6" },
    { name: "Absent", value: 15, color: "#EF4444" },
    { name: "Late", value: 20, color: "#F59E0B" },
  ];
  const employeData = [
    {
      id: 1,
      name: "Justin Lipshutz",
      department: "UI/UX designer",
      age: 22,
      discipline: "100%",
      daily_attendance: "Present",
      profile_image: "https://i.pravatar.cc/101",
    },
    {
      id: 2,
      name: "Rick thakur",
      department: "Marketing",
      age: 32,
      discipline: "92%",
      daily_attendance: "Absent",
      profile_image: "https://i.pravatar.cc/102",
    },
    {
      id: 3,
      name: "Muskan verma",
      department: "develop",
      age: 45,
      discipline: "95%",
      daily_attendance: "Leave",
      profile_image: "https://i.pravatar.cc/103",
    },
    {
      id: 4,
      name: "justine river",
      department: "Graphic designer",
      age: 23,
      discipline: "87%",
      daily_attendance: "Late",
      profile_image: "https://i.pravatar.cc/104",
    },
    {
      id: 5,
      name: "Rehana Lipsh",
      department: "Front desk",
      age: 25,
      discipline: "99%",
      daily_attendance: "Present",
      profile_image: "https://i.pravatar.cc/100",
    },
    {
      id: 6,
      name: "Rehana Lipsh",
      department: "Sale manager",
      age: 29,
      discipline: "100%",
      daily_attendance: "Present",
      profile_image: "https://i.pravatar.cc/107",
    },
  ];
  const monthlyData = [
    {
      id: 1,
      name: "Jan", // Using 'name' to match your JSX
      department: "UI/UX designer",
      performance_score: "XSW", // Using consistent property name
    },
    {
      id: 2,
      name: "Feb",
      department: "Marketing",
      performance_score: "92%",
    },
    {
      id: 3,
      name: "Muskan verma",
      department: "develop",
      performance_score: "95%",
    },
    {
      id: 4,
      name: "justine river",
      department: "Graphic designer",
      performance_score: "87%",
    },
    {
      id: 5,
      name: "Rehana Lipsh",
      department: "Front desk",
      performance_score: "99%",
    },
    {
      id: 6,
      name: "Rehana Lipsh",
      department: "Sale manager",
      performance_score: "100%",
    },
  ];

  const EmployeeGrowthChart = () => {
    const data = [
      { month: "Jan", employees: 8 },
      { month: "Feb", employees: 12 },
      { month: "Mar", employees: 18 },
      { month: "Apr", employees: 28 },
      { month: "May", employees: 35 },
      { month: "Jun", employees: 54 },
      { month: "Jul", employees: 61 },
      { month: "Aug", employees: 69 },
      { month: "Sep", employees: 73 },
      { month: "Oct", employees: 82 },
      { month: "Nov", employees: 91 },
      { month: "Dec", employees: 95 },
    ];

    return (
      <div className=" h-[351px] drop-shadow-sm ">
        <div className="">
          {/* Chart Container */}
          <div className="bg-white dark:bg-gray-800 rounded-md  p-3 drop-shadow-xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-[1rem] font-bold dark:text-gray-400 text-[#333333] text-center mb-2">
              Employee Growth Graph
            </h2>

            <div className="w-full h-74">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="0"
                    stroke="#e0e0e0"
                    strokeWidth={1}
                    horizontal={true}
                    vertical={true}
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#666666",
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                    dy={10}
                  />
                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#666666",
                      fontSize: 10,
                      fontWeight: 500,
                    }}
                    dx={-10}
                  />
                  <Line
                    type="monotone"
                    dataKey="employees"
                    stroke="#9376CA"
                    strokeWidth={1}
                    isAnimationActive={false}
                    dot={{
                      fill: "#FFFFFF",
                      strokeWidth: 1,
                      stroke: "#9376CA",
                      r: 3,
                    }}
                    activeDot={{
                      r: 4,
                      fill: "#8b5cf6",
                      stroke: "#9376CA",
                      strokeWidth: 1,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
  const StatsCard = ({ title, img, heading1, heading2, data, color }) => {
    return (
      <div
        className="w-full  md:w-[100%]   bg-white dark:bg-gray-800 border-t-4 rounded-lg drop-shadow-md py-1   px-4 h-30  transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        style={{ borderTopColor: color }}
      >
        <h2 className="text-[0.9rem] text-[#464549] font-bold mb-2 flex  ">{title}</h2>
        <div className="flex items-center gap-4">

          <div className="flex items-center gap-4 w-full">
            <img src={img} alt={heading1} className="w-8 h-8 mb-2" />
            <div className="">

              <h4 className="text-[10px]  xl:text-[0.7rem]  text-[#464549] dark:text-gray-400 font-semibold line-clamp-1">
                {heading1}
              </h4>
              <p className="text-[0.9rem] text-[#9376CA] font-bold">{data}</p>
              <h4 className="text-[10px]  xl:text-[0.7rem]  text-[#464549] dark:text-gray-400 font-semibold line-clamp-1">
                {heading2}
              </h4>
              <p className="text-[0.9rem] text-[#9376CA] font-bold">{data}</p>
            </div>
          </div>
          <div className="h-[20px] w-[20px]">
            <IoIosArrowForward />
          </div>
        </div>
      </div>
    );
  };
  const CustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={"middle"}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex  justify-center mt-6 space-x-3 gap-3 lg:space-x-1  flex-col md:flex-row">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center space-x-1">
            <div
              className="h-2 w-2  xl:w-2 xl:h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-[#8A8A8A] dark:text-gray-400 text-xs  xl:text-[0.7rem] font-medium">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const Chart = () => (
    <div className="w-full h-[220px] xl:h-[202px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={attendanceData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={CustomLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {attendanceData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          {/* Add Tooltip here */}
          <Tooltip
            formatter={(value, name, props) => [
              `${value}`,
              `${props.payload.name || props.payload.value}`,
            ]}
            contentStyle={{
              backgroundColor: "#1F2937", // dark-gray background for modern look
              color: "#F9FAFB", // light text for contrast
              borderRadius: "8px",
              padding: "8px 12px",
              fontSize: "0.875rem", // slightly bigger
              fontWeight: "500",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)", // subtle shadow
              border: "1px solid #374151", // subtle border for depth
              minWidth: "80px",
              textAlign: "center",
            }}
            itemStyle={{
              color: "#F9FAFB", // ensure item text is readable
              margin: "2px 0",
            }}
          />

        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  const today = new Date();
  const formatted = `${today.getDate()}-${today.getMonth() + 1
    }-${today.getFullYear()}`;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4   ">
        <StatsCard
          title={"Active Employees"}
          img={Stat01}
          heading1={"New  Joiners"}
          heading2={"Resigned Employees"}

          data={"400"}
          color={"#007AFF"}
        />
        <StatsCard
          img={Stat02}
          title={"Statutory Applied"}
          heading1={"Not  Applied"}
          heading2={"PT Location Change"}

          data={"55/60"}
          color={"#34C759"}
        />
        <StatsCard
          img={Stat03}
          title={"Attendence Present"}
          heading1={"On Leave "}
          heading2={"Long Absentee"}

          data={"04"}
          color={"#FF3B30"}
        />
        <StatsCard
          img={Stat04}
          title={"Wishes Birthday"}
          heading1={"New joiners"}
          heading2={"Work Anniversary"}

          data={formatted}
          color={"#9376CA"}
        />
        <StatsCard
          img={Stat05}
          title={"Total Investment"}
          heading1={"New Regime"}
          heading2={"Old Regime"}

          data={"24"}
          color={"#FFCC00"}
        />
        <StatsCard
          img={Stat06}
          title={"Salary Change"}
          heading1={"Increment"}
          heading2={"Deduction"}

          data={"03"}
          color={"#17A2B8"}
        />
        <StatsCard
          img={Stat07}
          title={"Leave Requests"}
          heading1={"Approved Leaves"}
          heading2={"Declined Leaves"}

          data={"03"}
          color={"#6C757D"}
        />
        <StatsCard
          img={Stat08}
          title={"New Hires"}
          heading1={"Onboarding"}
          heading2={"Background Check"}

          data={"05"}
          color={""}
        />
      </div>

      <div className="grid grid-cols-1  xl:grid-cols-3  gap-4 mt-6 ">
        <div className="col-span-1 bg-[#FFFFFF] dark:bg-gray-800 xl:h-[322px]   mt-12 rounded-md drop-shadow-sm  border-gray-200 dark:border-gray-700 border p-5 md:px-12   ">
          <h1 className="text-center dark:text-gray-400 font-bold text-[1rem] mb-4">
            HR Analytics Overview
          </h1>
          <Chart />
          <CustomLegend
            payload={attendanceData.map((item) => ({
              value: item.name,
              color: item.color,
            }))}
          />
        </div>
        <div className=" col-span-2  overflow-x-auto bg-[#FFFFFF] dark:bg-gray-800 mt-12 border border-gray-200 dark:border-gray-700 drop-shadow-md rounded-lg  lg:overflow-hidden lg:w-full">
          <table className="min-w-xl [@media(min-width:1440px)]:min-w-[700px] over-x-auto  w-full  text-sm text-left">
            <thead className="bg-[#8629DF] dark:bg-gray-500 text-[14px] text-white py-[6px] px-[10px]  rounded-t-2xl   ">
              <tr>
                <th className="px-6 py-2 text-[0.7rem] font-medium text-center ">
                  Employee Name
                </th>
                <th className="px-6 py-2 text-[0.7rem] font-medium text-center">
                  Department
                </th>
                <th className="px-6 py-2 text-[0.7rem] font-medium text-center">
                  Age
                </th>
                <th className="px-6 py-2 text-[0.7rem] font-medium text-center">
                  Discipline
                </th>
                <th className="px-6 py-2 text-[0.7rem] font-medium text-center ">
                  Daily Attendance
                </th>
              </tr>
            </thead>
            <tbody>
              {employeData.map((item) => (
                <tr
                  key={item.id}
                  className="leading-tight text-[#58585A] dark:text-gray-400 text-[0.7rem] "
                >
                  <td className="py-[6px] px-[10px] flex items-center gap-2">
                    <div className="flex gap-2 ">
                      <div className="w-8.5 h-8.5  rounded-full">
                        <img
                          src={item.profile_image}
                          alt={item.name}
                          className="h-[100%] w-[100%] object-cover rounded-full"
                        />
                      </div>
                    </div>
                    {item.name}
                  </td>
                  <td className="p-2   text-center">{item.department}</td>
                  <td className="p-2  text-center">{item.age}</td>
                  <td className="p-2  text-center text-green-400 ">
                    {item.discipline}
                  </td>
                  <td className="p-2 text-center flex justify-evenly ">
                    <button
                      className={`px-6  w-fit  py-1 rounded-sm  text-center   ${item.daily_attendance === "Present"
                        ? "text-[#34C759]  bg-[#34C75933]"
                        : item.daily_attendance === "Leave"
                          ? "text-[#007BFF] bg-[#007BFF33]"
                          : item.daily_attendance === "Absent"
                            ? "text-[#FF3B30]  bg-[#FF3B3033]"
                            : "text-[#FF9800]  bg-[#FF980033]"
                        }`}
                    >
                      {item.daily_attendance}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-14">
        <div className="col-span-1 ">
          <EmployeeGrowthChart />
        </div>
        <div className="cols-span-1  overflow-x-auto bg-white dark:bg-gray-800 drop-shadow-sm rounded-sm h-fit">
          <div className="w-full text-[0.7rem] text-center rounded-sm     border border-gray-200 dark:border-gray-700   ">
            <div className="grid grid-cols-3 bg-[#8629DF] dark:bg-gray-500 text-white font-medium rounded-t-sm">
              <div className="px-6 py-2">Month</div>
              <div className="px-6 py-2">Department</div>
              <div className="px-6 py-2">No. of Employee</div>
            </div>

            {/* Body */}
            <div className="dark:bg-gray-800">
              {monthlyData.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-3 text-center text-[#58585A] dark:text-gray-400  border-gray-200 dark:border-gray-700"
                >
                  <div className="px-4 py-2 text-[0.7rem]">{item.name}</div>
                  <div className="px-4 py-2 text-[0.7rem]">
                    {item.department}
                  </div>
                  <div className="px-4 py-2 text-[0.7rem] text-[#34C759]">
                    {item.performance_score}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
