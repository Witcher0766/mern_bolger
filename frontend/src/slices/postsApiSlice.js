import { POSTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({pageNumber}) => ({
        url: POSTS_URL,
        params: {
          pageNumber,
        }
      }),
      providesTags: ["Posts"],
      keepUnusedDataFor: 5,
    }),
    getPostsById: builder.query({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createPosts: builder.mutation({
      query: (data) => ({
        url: POSTS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),
    updatePost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/${data.postId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),
    uploadPostImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostsByIdQuery,
  useCreatePostsMutation,
  useUpdatePostMutation,
  useUploadPostImageMutation,
  useDeletePostMutation,
} = postsApiSlice;
