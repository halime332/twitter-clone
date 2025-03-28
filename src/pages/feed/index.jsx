import React from "react";
import Aside from "./aside";
import Main from "./main";
import Nav from "./nav";
import { useOutletContext } from "react-router-dom";




const Feed = () => {
  //outlet componentinden gönderlen context prop'una 
  const user =useOutletContext();
 
   
  

   return (
    <div className="h-screen bg-primary overflow-hidden text-secondary grid 
    grid-cols-[1fr_minmax(300px,600px)_1fr]">
     <Nav user={user}/>
     <Main user={user}/>
     <Aside/>
    </div>
  );
};

export default Feed;