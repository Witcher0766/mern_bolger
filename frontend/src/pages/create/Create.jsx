import React, { useState } from 'react'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import styles from './Create.module.css';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCreatePostsMutation, useUploadPostImageMutation } from '../../slices/postsApiSlice';
import Loader from '../../component/Loader';

const Create = () => {

    
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [cover, setCover] = useState('');
    // const cover = "asdfasd";

    const navigate = useNavigate();


    const [createPost, {isLoading: loadingCreate}] = useCreatePostsMutation();
    const [uploadProductImage, {isLoading: loadingUpload}] = useUploadPostImageMutation();


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

    const uploadHandler = async (e) => {
      // console.log(e.target.files[0]);
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      try {
        const res = await uploadProductImage(formData).unwrap();
        toast.success(res.message);
        setCover(res.image);
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
            {/* <input 
            type="file" 
            value={cover}
             onChange={e => setCover(e.target.files)}   
            /> */}

            <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">Upload Image</label>
      <input 
        type="file" 
        onChange={uploadHandler}
        className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-md file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
      />
      {cover && (
        <p className="text-sm text-green-600">
          Selected File: {cover.name}
        </p>
      )}
    </div>
            <ReactQuill 
            value={content} 
            className={styles["tupe"]} 
            theme="snow"
            onChange={setContent} 
            />
            
            <button className='btn'>Create post</button>
          {loadingCreate && <Loader/>}
          {loadingUpload && <Loader/>}
        </form>
        </div>
    </>
  )
}

export default Create