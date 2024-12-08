import React, { useEffect, useState } from 'react';
import Post from '../../component/post/Post';
import axios from 'axios';

const IndexPage = () => {
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const loading = false;

  useEffect(() => {
    const fetchPosts = async () => {
      const {data} = await axios.get('api/posts');
      setPosts(data);
    }
    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  console.log("post data", posts)

  return (
    <>
     <div className='px-0 md:px-10'>
     {posts.map(post => (
        <Post key={post._id} {...post} />
      ))}
     </div>
    </>
  );
};

export default IndexPage;
