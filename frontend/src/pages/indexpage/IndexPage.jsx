import React, { useEffect, useState } from 'react';
// import Post from '../../component/post/Post';

const IndexPage = () => {
  const [error, setError] = useState(null);

  const loading = false;
  const posts = [];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
     {/* <div className='px-0 md:px-10'>
     {posts.map(post => (
        <Post key={post._id} {...post} />
      ))}
     </div> */}
     <div>posts</div>
    </>
  );
};

export default IndexPage;
