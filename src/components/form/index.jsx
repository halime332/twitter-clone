import React from 'react';
import { CiImageOn } from "react-icons/ci";

const Form = ({user}) => {
  return (
    <div className='border-b border-fourth p-4  flex gap-3'>
        <img src={user?.photoURL} className='size-[35px] md:syize-[45px] rounded-full'/>


        <div className='w-full pt-1'>
            <input type="text" className='w-full bg-transparent mb-2 md:text-lg text-black outline-none ' placeholder="Neler oluyor?" />

            <div className='flex justify-between'>
              <div>
              <CiImageOn className='text-[#1D9BF0]'/>
              </div>

              <button className='bg-white font-bold px-5 py-[6px]
              rounded-full text-black tracking-wide hover:brightness-90'>Gönder</button>
            </div>
        </div>
    </div>
  )
};

export default Form;