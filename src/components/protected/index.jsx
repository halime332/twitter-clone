import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate , Navigate} from 'react-router-dom';
import {auth}  from "../../firebase";
import PageLoader from '../loader/page-loader';
import { toast } from 'react-toastify';


const Protected = () => {
   const navigate = useNavigate();
   const [user, setUser] =useState(undefined);

  //kullanıcının oturum verilerini al
  useEffect(() =>{
    const unsub = onAuthStateChanged(auth ,(user) =>setUser(user));

    return () =>unsub();
  }, []);

  //oturum verileri gelene kadar yükleniyor bas
  if(user===undefined){
    return <PageLoader/>;
  }
  //eğer kullanıcının oturumu kapalıysa veya epostası doğrulanmamışsa logine yönlendir
  if(user===null  || !user?.emailVerified===false ){
    //epostası doğrulanmışsa bildirim gönder
    if(user?.emailVerified===false)  toast.info("Lütfen mail adresinizi doğrulayınız");
    return <Navigate to= "/" replace/>;
  }
  //eğer kullanıcınn oturumu  açık ama epostası doğrulanmamışsa bildirim gönder
 

  

  //oturumu açık ve epostası doğrulanmışsa sayfayı göster
  //ilgili sayfaya user verilerini gönderiyorum
  return <Outlet context={user}/>;
    
  
};

export default Protected;