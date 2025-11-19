import React from 'react';
import UserPost from './endpoint/UserPost';
import TokenPost from './endpoint/TokenPost';
import PhotoPost from './endpoint/PhotoPost';
import PhotoGet from './endpoint/PhotoGet';

const Api = () => {
  return (
    <div>
      <h2>Post</h2>
      <UserPost />
      <h2>Token</h2>
      <TokenPost />
      <h2>Postar fotos</h2>
      <PhotoPost />
      <h3>Puxar Fotos</h3>
      <PhotoGet />
    </div>
  );
};

export default Api;
