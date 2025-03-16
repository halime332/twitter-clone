import React from 'react'
import { createUserWithEmailAndPassword ,sendEmailVerification,signInWithEmailAndPassword} from 'firebase/auth';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';
import {auth} from "../../firebase";
import ForgotPassword from './forgot-password';



const Form = () => {
  const [isSignUp,setIsSignUp] =useState(false);
 const navigate = useNavigate();

  const formik = useFormik({
  initialValues:{
    email:"",
    password:"",
  },

  onSubmit: ({email,password}) =>{
   if (isSignUp){
    //yeni hesap oluştur
    createUserWithEmailAndPassword(auth ,email ,password)
    .then((res)=>{
      //doğrulama epostası gönder
      sendEmailVerification(res.user);
      toast.info("Mailinize doğrulama epostası gönderildi lütfen kontrol edin");
      navigate("/feed");
    })
    .catch((err) =>toast.error("Hata!" + err.code));
   }else{
    //varolan hesaba giriş yap
    signInWithEmailAndPassword(auth ,email ,password)
    .then(()=>{
      toast.success("Hesaba giriş yapıldı");
      navigate("/feed");
    })
     .catch((err) =>toast.error("Hata!" +err.code));
   }
  },
});

  return (
   <>
     <form className='flex flex-col' onSubmit={formik.handleSubmit}>
      <label>Email</label>
      <input type="email" name="email" className='input'onChange={formik.handleChange} />


      <label className='mt-5'>Şifre</label>
      <input type="text" name="password" className='input'onChange={formik.handleChange} />
      <ForgotPassword/>
      <button className='mt-10  bg-white text-black rounded-full font-bold transition hover:bg-gray-300'>{isSignUp ? "Kaydol" : "Giriş Yap"}</button>

      <p>
        <span className='text-gray-500'>{isSignUp ? "Hesabınız varsa" : "Hesabınız yoksa"}</span>
        <span className='cursor-pointer ms-2 text-blue-500 hover:underline' onClick={() =>setIsSignUp(!isSignUp)}>{isSignUp ? "Giriş yap" :"Kaydolun"}</span>
      </p>
     </form>
   </>
  )
};

export default Form;