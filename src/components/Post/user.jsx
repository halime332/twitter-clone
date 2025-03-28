import React from "react";



const User = ({tweet}) => {
  
    //kullanıcı ismi oluştur
    const username = tweet.user.name?.toLowerCase().replaceAll("","_");
 
  return (
    <div className='flex gap-3 items-center whitespace-nowrap text-garya-400'>
      <p className="text-white">{tweet.user.name}</p>
      <p className="text-sm">@{username}</p>
      <p className="text-sm">tarih</p>
    </div>
  );
};

export default User;