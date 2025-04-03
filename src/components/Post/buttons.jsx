import React from 'react';
import { FaHeart, FaRegComment, FaRegHeart, FaRetweet } from 'react-icons/fa';
import { FaShareNodes } from 'react-icons/fa6';
import {doc ,updateDoc , arrayUnion ,arrayRemove} from "firebase/firestore";
import {db,auth} from "../../firebase/index";


const Buttons = ({tweet}) => {

   //oturumu açık olan kullanıcı bu tweeti likelayanlar arasında mı?
   const isLiked = tweet.likes.includes(auth.currentUser.uid);
  //like butonuna tıklanınca 
  const toggleLike= () =>{
    //güncellenicek elemanın referansını dönderir
    const tweetRef = doc(db, "tweets",tweet.id);

    //like'lamadıysam :kullanıcı id'sini likes dizisine ekle
    //like'ladıysam :kullanıcı id'sini likes dizisinden kaldır
    updateDoc(tweetRef,{
     likes :isLiked ? arrayRemove(auth.currentUser.uid) : arrayUnion(tweet.currentUser.uid),
    });
  };

  return (
    <div className='flex justify-between items-center text-zinc-500 '>
      <button className= "post-icon hover:text-blue-400 hover:bg-blue-400/20">
        <FaRegComment/>
      </button>

      <button className= "post-icon  hover:text-green-400 hover:bg-green-300/20">
        <FaRetweet/>
      </button>

      <button className='flex items-center hover:text-pink-400 relative'
       onClick={toggleLike}>
        
        <div className= "flex items-center gap-1 post-icon  hover:bg-pink-400/20 ">
          {isLiked ? <FaHeart className='text-pink-500'/> : <FaRegHeart/>}
         
        </div>

        <span className={` absolute ${isLiked ? "text-pink-500" :""} absolute -end-1`}>
        {tweet.likes.length}
        </span>
      </button>

      <button className= "post-icon  hover:text-blue-400 hover:bg-blue-400/20">
        <FaShareNodes/>
      </button>
    </div>
  )
};

export default Buttons;