import React from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";


const Feed = () => {
  const handleClick=() =>
    signOut(auth).then(() =>toast.info("Hesaptan çıkış yapıldı"));
  console.log(auth.currentUser);

 
  return (
    <div>
      <h1>Akış sayfası</h1>
      <button onClick={handleClick}>Çıkış Yap</button>
    </div>
  )
};

export default Feed;