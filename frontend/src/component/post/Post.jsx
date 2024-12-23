import React from "react";
import styles from "./Post.module.css";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Truncated from "../truncated/Truncated";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Post = ({ _id, title, summary, content, cover, createdAt, author }) => {
  const { userInfo } = useSelector((state) => state.auth);
  let username = userInfo?.username;

  const checkProfile = () => {
    toast.error("please login/register to see post detail");
  };

  return (
    <>
      <div className={styles["blog-data"]}>
        <div className={styles["blog-image"]}>
          <img src={`${cover}`} alt="" />
        </div>
        <div className={styles["blog-content"]}>
          <div className="flex flex-col gap-1 ">
            {username ? (
              <Link className={styles["link-hover"]} to={`/post/${_id}`}>
                <h1 className="text-4xl font-semibold">{title}</h1>
              </Link>
            ) : (
              <Link className={styles["link-hover"]} to={`/`} onClick={checkProfile}>
                <h1 className="text-4xl font-semibold">{title}</h1>
              </Link>
            )}

            <p className="text-base text-gray-400">{summary}</p>
          </div>
          <Truncated paragraph={content} maxLength={300} />
          <div className="flex justify-between w-full px-5">
            <p className="font-medium">
              <Link to="/">{author.username}</Link>
            </p>
            <time className="text-gray-400">
              {format(new Date(createdAt), "MMM d, yyyy HH:mm")}
            </time>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
