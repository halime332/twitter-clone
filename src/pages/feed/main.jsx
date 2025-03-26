import React, { useEffect, useState } from 'react'
import Form from '../../components/form';
import Post from '../../components/Post';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';

const Main = ({user}) => {
  const [tweets ,setTweets] =useState();

  useEffect(() =>{
    const tweetsCol = collection(db,"tweets");

    const q = query(tweetsCol, orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q ,(snapshot)=>{
      const temp =[];
       snapshot.docs.forEach((doc) =>temp.push({id:doc.id ,...doc.data()}));

       setTweets(temp);
    });

    return () =>unsub();
  },[]);

 console.log(tweets);

  return( 
  <main className='border border-fourth ' >
    <header className='border-b border-fourth p-4 font-bold'>Anasayfa</header>

    <Form user={user}/>

       {tweets.map((tweet ,key) => <Post key={key} tweet={tweet}/>)}  
    
  </main>
  );
  
};

export default Main;