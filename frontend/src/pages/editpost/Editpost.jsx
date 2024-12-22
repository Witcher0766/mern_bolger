import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Editpost.module.css';
import ReactQuill from 'react-quill';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useUpdatePostMutation, useGetPostsByIdQuery } from '../../slices/postsApiSlice';


const Editpost = () => {

  const {id: postId} = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const cover = "daatat";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updatePost, {isLoading: loadingUpdate}] = useUpdatePostMutation();
  const {data: post, isLoading, error} = useGetPostsByIdQuery(postId);

  useEffect(() => {
    if(post){
      setTitle(post.title);
      setSummary(post.summary);
      setContent(post.content);
      setFiles(post.files);
    }
  }, [post]);

  console.log("updata", post)

const updatePostHandler = async (e) => {
  e.preventDefault();
  const updatePostData = {
    postId,
    title,
    summary,
    content,
    cover,
  }
  const result = await updatePost(updatePostData);
  if(result.error){
    toast.error(result.error);
  } else {
    toast.success('Post updated');
    navigate('/');
  }
}

  return (
    <>
    <div className={styles["post"]}>
        <form onSubmit={updatePostHandler}>
            <input 
            type="title" 
             placeholder={'Title'}   
             value={title}
             onChange={e => setTitle(e.target.value)}
            />
            <input 
            type="summary"
            placeholder={'Summary'}
            value={summary}
            onChange={e => setSummary(e.target.value)}
             />
            <input 
            type="file" 
            // value={files}
             onChange={e => setFiles(e.target.files)}   
            />
            <ReactQuill 
            value={content} 
            className={styles["tupe"]} 
            theme="snow"
            onChange={setContent} 
            />
            <button className='btn'>Update post</button>
        </form>
        </div>
    </>
  )
}

export default Editpost