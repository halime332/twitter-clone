import React, { useState } from 'react';
import Modal from '../../components/modal';


const ForgotPassword = () => {
  const[isOpen,setIsOpen] =useState();
  return (
    <>
    <span className='flex justify-end text-sm text-gray-500 hover:text-gray-400 mt-2 text-end cursor-pointer' onClick={() =>setIsOpen(true)}>Şifreni mi unuttun ?</span>

    {<Modal isOpen={isOpen} close={()=>setIsOpen(false)}>

      <form className=''>
          <h1 className='text-3xl'>Şifreni mi unuttun ?</h1>
           <p className='text-gray-400'>Email adresine bir şifre sıfırlama bağlantısı göndericez</p>

           <input type='text' className='mt-5 input'/>

           <button type='submit' className='bg-white hover:bg-gray-300 transition tex-black rounded-full mt-8 py-1'>Mail Gönder</button>
           <button type='button' className='bg-white hover:bg-gray-300 transition tex-black rounded-full mt-4 py-1'>İptal</button>
      </form>
    </Modal>}
    </>
  )
};

export default ForgotPassword;