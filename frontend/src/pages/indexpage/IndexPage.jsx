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
      <div className="flex flex-col gap-4 px-4 sm:px-6 lg:px-8 py-4 ">
      {posts.map((post) => (
        <div 
          key={post._id} 
          className="w-full"
        >
          <Post {...post} />
        </div>
      ))}
    </div>
    </>
    ) }
   
    </>
  );
};

export default IndexPage;
