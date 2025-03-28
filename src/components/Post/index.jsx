import React from 'react';
import Dropdown from './dropdown';
import Content from './content';
import Buttons from './buttons';
import User from './user';




const Post = ({tweet}) => {
  return (
    <div className='border-b border-fourth p-4 flex gap-3'>
      <img src={tweet.user.photo} alt="profile" className='size-12 rounded-full'/>


      <div className='w-full'>
        <div className='flex justify-between'>
          <User tweet={tweet}/>
          <Dropdown/>
        </div>

        <Content/>
        <Buttons/>
      </div>
    </div>
  );
};

export default Post;