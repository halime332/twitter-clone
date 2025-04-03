import React, { useRef, useState } from 'react';
import { CiImageOn } from "react-icons/ci";
import { MdOutlineGifBox } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/index';
import uploadToStorage from '../../firebase/uploadToStorage';
import { toast } from 'react-toastify';
import Loader from "../loader";

const Form = ({user}) => {
  const [isLoading ,setIsLoading] =useState(false);
  const [image,setImage] =useState(null);
  const fileInputRef = useRef(null);

  //yeni resim seçildiğinde seçen kullanıcıya önizlemesini göstermek için url'e çevirmek ve state aktar
  const onImageChange =(event) =>{
    if(event.target.files && event.target.files[0]){
     setImage( URL.createObjectURL(event.target.files[0]));
    }
  };

  //çarpıya basıldığında  ekrandaki remi kaldır ve  inputu temizle
  const clearImage= () =>{
    setImage(null);
    fileInputRef.current.value= null;
    fileInputRef.current.files= null;
  };

   //çarpıya basıldığında ekrandaki resmi kaldır ve inputu temizle
   const handlesubmit= async(e) =>{
      e.preventDefault();
      

      //inputlardaki verilere eriş
     const text = e.target.text.value.trim();
     const file = e.target.image.files[0];

     //yazı ve resim içeriğini yoksa hata gönder
     if(!text && !file)
      return toast.warning("Lütfen gönderi içeriğini belirleyiniz ");

     try{
       //yüklenme başladığında isLoadinge güncelle
     setIsLoading(true);
    
     //resmi firebase storage'a yükle
     const imageUrl =await uploadToStorage(file);
     

     //koleksiyonun referansını al
     const tweetsCol =collection(db,"tweets");

     //kolleksiyona yeni tweet belgesi
     await addDoc(tweetsCol,{
      content:{
        text,
        image:imageUrl,
      },

      isEdited:false,
      likes:[],
      user:{
        id:user.uid,
        name:user.displayName,
        photo:user.photoURL,
      },
      createdAt:serverTimestamp(),
     });

     //inputları temizle
     e.target.reset();
     setImage(null);
    }catch(error){
      console.log(error);
    }
    //yükleme bittiğinde isLoadingi güncelle
    setIsLoading(false);

  };

  console.log(image);
    

  return (
    <div className='border-b border-fourth p-4  flex gap-3'>
        <img src={user.photoURL}
         className='size-[35px] md:syize-[45px] rounded-full'/>


        <form className='w-full pt-1' onSubmit={handlesubmit}>
            <textarea type="text" name='text' className='w-full bg-transparent mb-2 md:text-lg
             text-gray-300 outline-none resize-y min-h-[40px] max-h-[300px]' placeholder="Neler oluyor?"
            />
           {image && (
            <div className='relative mb-3'>
              <button type='button' className='absolute top-3 end-3 p-3 bg-primary/90 
                  rounded-full transition hover:bg-zinc-800 ' onClick={clearImage}>
                 <IoMdClose />
              </button>
                <img src={image} />
            </div> 
           ) }

            <div className='flex justify-between'>
              <div  className='text-third text-xl flex gap-4'>
                <label className='form-icon' htmlFor='image'>
                  <input id='image'name='image' type="file" className='hidden' 
                  ref={fileInputRef}
                  onChange={onImageChange}/>
                  <CiImageOn/>
                </label>


                <button type='button' className='form-icon'>
                 <MdOutlineGifBox />
                </button>
                <button type='button' className='form-icon'>
                 <FaRegSmile className='text-lg'/>
                </button>
                            
              </div>

              <button disabled={isLoading} type='submit' className='bg-secondary font-bold px-5 py-[6px]
                  rounded-full text-primary tracking-wide hover:brightness-90 min-w -[100px]'>
                
                {isLoading ? <Loader/> : "Gönder"}
              
              </button>
            </div>
          </form>
    </div>
  );
};

export default React.memo(Form);