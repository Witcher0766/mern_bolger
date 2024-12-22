import { POSTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const postsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => ({
                url: POSTS_URL,
            }),
            providesTags: ['Post'],
            keepUnusedDataFor: 5
        }),
        getPostsById: builder.query({
            query: (postId) => ({
                url: `${POSTS_URL}/${postId}`
            }),
            keepUnusedDataFor: 5
        }),
        createPosts: builder.mutation({
            query: (data) => ({
                url: POSTS_URL,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Post'],
        }),
        updatePost: builder.mutation({
            query: (data) => ({
                url: `${POSTS_URL}/${data.postId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Post'],
        })
    }),
});

export const {useGetPostsQuery, useGetPostsByIdQuery, useCreatePostsMutation, useUpdatePostMutation} = postsApiSlice;