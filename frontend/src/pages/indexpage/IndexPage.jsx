import React from 'react';
import Post from '../../component/post/Post';
import { useGetPostsQuery } from '../../slices/postsApiSlice';
import Loader from '../../component/Loader';
import { useParams } from 'react-router-dom';
import Paginate from '../../component/Paginate';

const IndexPage = () => {
  const {pageNumber} = useParams();
  const {data, isLoading, isError} = useGetPostsQuery({pageNumber});
  return (
    <>
    {isLoading ? (
      <Loader/>
    ) : isError ? (
      <div>{isError?.data?.message || isError.error}</div>
    ) : (
      <div className="flex flex-col gap-4 px-4 sm:px-6 lg:px-8 py-4 justify-center ">
      {data.posts.map((post) => (
        <div 
          key={post._id} 
          className="w-full"
        >
          <Post {...post} />
        </div>
      ))}
      <Paginate pages={data.pages} page={data.page}/>
    </div>
    ) }
   
    </>
  );
};

export default IndexPage;
