import React from 'react'
import { Link, useParams } from 'react-router-dom'
import {formatISO9075} from "date-fns";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetPostsByIdQuery, useDeletePostMutation } from '../../slices/postsApiSlice';
import Loader from '../../component/Loader';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Postpage = () => {
  const {id: postId} = useParams();
  const {data: postInfo, isLoading, isError} = useGetPostsByIdQuery(postId);
  const {userInfo} = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [deletePost, {isLoading: loadingDelete}] = useDeletePostMutation();

  const handleDelete = async () => {
    if(window.confirm('Are You Sure?')) {
      try {
        await deletePost(postId);
        toast.success('Post Deleted Successfully');
        navigate('/')
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  }
  
  return (
    <>
    {isLoading ? (
  <Loader />
) : isError ? (
  <div className="text-red-500 text-center mt-4">
    {isError?.data?.message || isError.error}
  </div>
) : (
  <>
    <div className="container mx-auto px-4 py-6">
      <div className="  rounded-lg overflow-hidden">
        <h1 className="text-3xl md:text-4xl font-bold text-center mt-4 mb-2">
          {postInfo.title}
        </h1>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm px-4 mb-4">
          <time className="mb-2 md:mb-0">
            {formatISO9075(new Date(postInfo.createdAt))}
          </time>
          <p className="font-semibold">{`by @${postInfo.author.username}`}</p>
        </div>

        {userInfo._id === postInfo.author._id && (
          <div className="flex justify-end gap-4 px-4 mb-4">
            <Link
              to={`/edit/${postInfo._id}`}
              className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              <FontAwesomeIcon icon={faPenToSquare} bounce />
            </Link>
            <Link
              to={'/'}
              className="w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
              onClick={handleDelete}
            >
              <FontAwesomeIcon icon={faTrash} bounce />
            </Link>
            {loadingDelete && <Loader/>}
          </div>
        )}

        <div className="w-full overflow-hidden mb-6">
          <img
            className="w-full h-64 md:h-96 object-cover"
            src={`${postInfo.cover}`}
            alt="Post Cover"
          />
        </div>

        <div
          className="px-4 md:px-8 text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        />
      </div>
    </div>
  </>
)}

  
    </>
  )
}

export default Postpage