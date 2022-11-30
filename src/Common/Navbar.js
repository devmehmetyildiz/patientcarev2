import React, { useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'

export default function Navbar(props) {
  const { iconOnly, seticonOnly, history } = props

  return (
    <nav
      className=" w-[100%] h-[58.61px] bg-[#2b7694] dark:bg-Contentfg mx-auto flex flex-row justify-between items-center fixed top-0 pl-[20px]">
      <div className='group flex flex-col cursor-pointer justify-center items-center' onClick={() => { seticonOnly(!iconOnly) }}>
        <div className='h-[2px] group-hover:bg-[#747474] bg-white dark:bg-[#3d3d3d]  w-[20px]' />
        <div className='h-[2px] group-hover:bg-[#747474] bg-white dark:bg-[#3d3d3d] my-[3px] w-[20px]' />
        <div className='h-[2px] group-hover:bg-[#747474] bg-white dark:bg-[#3d3d3d]  w-[20px]' />
      </div>
      < div className='p-2 w-[250px] flex justify-center items-center' >
        <p className='select-none m-0 font-Common font-bold text-[1.84em] line-none text-white dark:text-TextColor'>
          AR
          <span className='text-[#c5a47e]'>MS</span>
        </p>
      </div >
      <div className='flex flex-row justify-center items-center'>
        <FaUserAlt className='text-white' onClick={() => { seticonOnly(!iconOnly) }} />
        <div className={`h-[58.61px] text-white mx-4 my-auto transition-all ease-in-out duration-500  text-center flex flex-col justify-center items-center `}>
          <p className='m-0 text-sm font-semibold tracking-wider font-Common '>Henry Klein</p>
          <p className='m-0 text-xs text-white dark:text-TextColor  '>Gold Member</p>
        </div>
      </div>
    </nav >
  )
}
