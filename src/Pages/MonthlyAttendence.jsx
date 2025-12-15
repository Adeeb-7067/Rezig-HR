import React from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'

const MonthlyAttendence = () => {

    const colors=[
        "#FF0000",
        "#0000FF",
        "#008000",
        "#FFA500",
        "#800080",
        "#00FFFF",
        "#FFC0CB",
        "#808080",
        "#FFFF00",
        "#008080",
    ]


    function AttendenceCard({color,heading,paragraph}){
        return(
            <div className='bg-white border-l-8 mb-4  justify-between rounded-lg shadow  w-full  flex p-4 '
            style={{borderLeftColor:color}}
            >
<div>
    <h1 className='text-xl font-bold  text-[#58585A] pb-1'>

    {heading}
    </h1>
    <p className='text-sm text-[#58585A]'>
        {paragraph}
    </p>
</div>
<div className='h-4 w-4 mt-4'>
<MdKeyboardArrowDown />

</div>


            </div>
        )
    }
  return (
   <div>
{colors.map((color,index)=>(
    <AttendenceCard key={index} color={color} heading="Import Monthly Attendance" paragraph="Bulk upload of complete attendance records for all employees for a specific month." />
))}
</div>

  )
}

export default MonthlyAttendence
