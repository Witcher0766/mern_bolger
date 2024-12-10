import React from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './Postpage.module.css';
import {formatISO9075} from "date-fns";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetPostsByIdQuery } from '../../slices/postsApiSlice';
import Loader from '../../component/Loader';


const Postpage = () => {
  const {id: postId} = useParams();
  const {data: postInfo, isLoading, isError} = useGetPostsByIdQuery(postId);
  // const handleDelete = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_SERVER_URL}post/${id}`, {
  //       method: 'DELETE',
  //       credentials: 'include',
  //       withCredentials: true,
  //     })
  //     if(response.ok) {
  //       toast.success("Your post is deleted successfully..!");
  //     }
  //     else {
  //       toast.error("Post can't be deleted");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleDelete = async () => {

  }
  

  if(!postInfo) return '';
  return (
    <>
    {isLoading ? (
      <Loader/>
    ) : isError ? (
      <div>{isError?.data?.message || isError.error}</div>
    ) : (
      <>
      <div className={styles["main-container"]}>
    <h1>{postInfo.title}</h1>
    <div className={styles["main-title"]}>
    <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
    <p className={styles["author"]}>{`by @${postInfo.author.username}`}</p>
    </div>
    {/* {userInfo.id === postInfo.author._id && ( */}
      <div className={styles["edit-post"]}> 
      <Link to={`/edit/${postInfo._id}`} className={styles["edit-btn"]} ><FontAwesomeIcon icon={faPenToSquare} bounce /></Link>
      <Link to={'/'} className={styles["delete-btn"]} onClick={handleDelete}><FontAwesomeIcon icon={faTrash} bounce /></Link>
      </div>
    {/* )} */}
    <img className={styles["post-img"]} src={`${process.env.REACT_APP_SERVER_URL}${postInfo.cover}`} alt="" />
    <div className={styles["main-content"]} dangerouslySetInnerHTML={{__html:postInfo.content}} />
    </div>
      </>
    ) }
  
    </>
  )
}

export default Postpage