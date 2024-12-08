import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './Postpage.module.css';
import {formatISO9075} from "date-fns";
// import { UserContext } from '../../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const Postpage = () => {
  const {id} = useParams();
  console.log("idd", id)
  // const {userInfo} = useContext(UserContext);
  const [postInfo, setPostInfo] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`/api/posts/${id}`);
        console.log("response", data);
        setPostInfo(data);
      } catch (error) {
        console.error("Error fetching post:", error.response?.data || error.message);
      }
    };
    fetchPost();
  }, [id]);


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
  )
}

export default Postpage