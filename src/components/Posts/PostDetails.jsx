import React, { useEffect } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import './PostDetails.css'
import { deletePostAction, fetchPostDetailsAction } from "../../redux/slices/posts/PostsSlices";
import { useDispatch, useSelector } from 'react-redux'
import DateFormatter from "../../utils/DateFormatter";
import LoadingComponent from "../../utils/LoadingComponent";
import AddComments from "../Coments/AddComments";
import CommentsList from "../Coments/CommentsList";

const PostDetails = () => {
    // console.log(props)
    const { id } = useParams();
    // console.log(id)
    const dispatch = useDispatch();
    //select post detail from store
    const post = useSelector(state => state?.post);
    const { postDetails, loading, appErr, serverErr, isDeleted } = post;
    // console.log('post né', postDetails?.comments)
    // console.log(postDetails?.user?._id);

    //comment
    const comment = useSelector(state => state?.comment);
    // console.log('comment ne', comment);
    const { commentCreated, commentDeleted } = comment;
    // console.log('tao ne', commentCreated)

    useEffect(() => {
        dispatch(fetchPostDetailsAction(id))
    }, [id, dispatch, commentCreated, commentDeleted]);



    //get login user
    const user = useSelector(state => state.users)
    const { userAuth } = user;

    // console.log(_id)

    const isCreateBy = postDetails?.user?._id === userAuth?._id;
    // console.log(isCreateBy)
    if (isDeleted) return <Navigate to='/posts' />
    return (

        <div className="post">
            {loading ? <LoadingComponent /> : appErr || serverErr ? <h1>{appErr} {serverErr}</h1> : <section className="py-20 2xl:py-40 bg-gray-800 sm:w-ful w-auto overflow-hidden animate-fadeIn">
                <div class="container px-4 mx-auto">
                    {/* Post Image */}
                    <div className="flex flex-col items-center"> {/* This will stack items vertically and center them */}
                        <div className="hover:scale-105 transition-transform duration-300 ease-in-out">
                            <img
                                className="mb-12 md:mb-24 w-full h-96 object-cover"

                                src={postDetails?.image}
                                alt=""
                            />
                        </div>
                    </div>
                    <div class="max-w-2xl mx-auto text-center mt-3">
                        <h2 class="mt-7 mb-14 text-4xl md:text-6xl lg:text-7xl text-white font-bold font-heading">
                            {postDetails?.title}
                        </h2>
                        {/* User */}
                        <div class="inline-flex pt-14 mb-14 items-center border-t border-gray-500 my-3">
                            <div className="hover:scale-110 transition-transform duration-300 ease-in-out">
                                <img
                                    class="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full mt-3"
                                    src={postDetails?.user?.profilePhoto}
                                    alt=""
                                />
                            </div>
                            <div class="text-left pl-3">
                                <Link to={`/profile/${postDetails?.user?._id}`}>
                                    <h4 class="mb-1 text-2xl font-bold text-gray-50">
                                        <span class="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600">
                                            {postDetails?.user?.lastName}{" "}
                                            {postDetails?.user?.firstName}
                                        </span>
                                    </h4>
                                </Link>
                                <p class="text-gray-500">
                                    <DateFormatter date={post?.createdAt} />
                                    created At
                                </p>
                            </div>
                        </div>
                        {/* Post description */}
                        <div class="max-w-xl mx-auto">
                            <p class="mb-6 text-left  text-xl text-white">
                                {postDetails?.description}

                                {/* Show delete and update btn if created user */}
                                {isCreateBy ? <div className="flex justify-center space-x-4">
                                    <Link to={`/update-post/${postDetails?._id}`} className="hover:text-yellow-400 transition-colors duration-300">
                                        <PencilAltIcon className="h-8 text-yellow-300" />
                                    </Link>
                                    <button onClick={() => { dispatch(deletePostAction(postDetails?._id)) }} className="hover:text-red-700 transition-colors duration-300">
                                        <TrashIcon className="h-8 text-red-600" />
                                    </button>
                                </div> : null}
                            </p>
                        </div>
                    </div>
                </div>
                {/* Add comment Form component here */}
                <AddComments postId={id} />
                <div className="flex justify-center  items-center">
                    {/* <CommentsList comments={post?.comments} postId={post?._id} /> */}
                    <CommentsList comments={postDetails?.comments} />
                </div>
            </section>}

        </div>
    );
};


export default PostDetails;


