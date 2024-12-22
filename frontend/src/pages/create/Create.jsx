import React, { useState } from 'react'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import styles from './Create.module.css';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useCreatePostsMutation } from '../../slices/postsApiSlice';
import Loader from '../../component/Loader';

const Create = () => {

    
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const cover = "asdfasd";

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [createPost, {isLoading: loadingCreate}] = useCreatePostsMutation();
    const {userInfo} = useSelector((state) => state.auth);


    const createPostHandler = async (e) => {
        e.preventDefault();
        try {
          await createPost({title, summary, content, cover}).unwrap();
          navigate('/');
          toast.success("new post is created");
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
    }

  return (
    <>
    <div className={styles["post"]}>
        <form onSubmit={createPostHandler}>
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
            
            <button className='btn'>Create post</button>
          {loadingCreate && <Loader/>}
        </form>
        </div>
    </>
  )
}

export default Create