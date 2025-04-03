import React, { useState } from 'react';
import {doc, updateDoc} from "firebase/firestore";
import Modal from ".";
import {db} from "../../firebase/index";
import uploadToStorage from '../../firebase/uploadToStorage';

const EditModal = ({isOpen,close,tweet}) => {
  const [isPicDeleting , setIsPicDeleting] =useState();
  //form gönderilince
  const handleSubmit = async(e) =>{
    e.preventDefault();

 //inputtaki verilere eriş

    const text = e.target[0].value;
    const file =e.target[1].files[0];

    //güncellenicek dökümanın referansını al
    const tweetRef = doc(db ,"tweets" ,tweet.id);

    //belgeyi güncellenicek bilgileri
    let updatedData ={
      "content.text" :text,
      isEdited:true,
    };
    //fotoğraf silinecekse
    if(isPicDeleting){
      updatedData["content.image"] = null;
    }

    // yeni dosya yüklenecekse 
    if(file){
      const imageUrl =await uploadToStorage(file);
      updatedData["content.image"] =imageUrl;
           
    }

    

    //belgeyi güncelle
    await updateDoc(tweetRef,updatedData);
    //state'i sıfırla ve modalı kapat
    setIsPicDeleting(false);
    close();
  };


  return (
    <Modal isOpen={isOpen} close={close}>

       <h1 className='text-2xl'>Tweet'i düzenle</h1>

       <form onSubmit={handleSubmit} className='flex flex-col mt-10'>
        <label>İçeriği Değiştir</label>
        <textarea type="text" className='mt-3 input resize-y min-h-12 max-h-[250px]' 
        defaultValue={tweet.content.text}/>

        <label className='flex justify-end gap-5 mt-10'> Fotoğraf ekle / Değiştir</label>

       {!isPicDeleting && tweet.content.image ?(
        <button type='button' className='bg-fourth p-1 rounded-md transition hover:bg-fourth/50'
           onClick={() =>setIsPicDeleting(true)}>
          Resmi Kaldır
        </button>
       ):(
        <input type="file" />
       )}
      
      
        <div className='flex justify-end gap-5 mt-10'>
            <button type='button' onClick={close}>Vazgeç</button>
            <button type='submit' className='bg-secondary text-black transition
             px-3 py-1 rounded-md'>
              Kaydet
            </button>
        </div>
     </form>
    </Modal>
  );
};

export default EditModal;