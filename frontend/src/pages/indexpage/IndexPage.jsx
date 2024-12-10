import React from 'react';
import Post from '../../component/post/Post';
import { useGetPostsQuery } from '../../slices/postsApiSlice';
import Loader from '../../component/Loader';

const IndexPage = () => {

  const {data: posts, isLoading, isError} = useGetPostsQuery();

  return (
    <>
    {isLoading ? (
      <Loader/>
    ) : isError ? (
      <div>{isError?.data?.message || isError.error}</div>
    ) : (
      <>
      <div className='px-0 md:px-10'>
     {posts.map(post => (
        <Post key={post._id} {...post} />
      ))}
     </div>
      </>
    ) }
   
    </>
  );
};

export default IndexPage;
