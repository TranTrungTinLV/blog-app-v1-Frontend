import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HeartIcon,
  EmojiSadIcon,
  UploadIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { MailIcon, EyeIcon } from "@heroicons/react/solid";
import { userProfileAction, followUserAction, unfollowUserAction } from "../../../redux/slices/users/usersSlices";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DateFormatter from "../../../utils/DateFormatter";
import LoadingComponent from "../../../utils/LoadingComponent";
export default function Profile() {

  const { id } = useParams();
  // console.log('id ne', id);
  const dispatch = useDispatch();
  //History
  const navigate = useNavigate();
  // console.log("yes sir", navigate);

 

  //User data from store
  const users = useSelector(state => state?.users);
  const { profile, loading, profileAppErr, profileServerErr, followed, unFollowed, userAuth } = users;
  // console.log("profile nè", users)
   //send mail handle click
   const sendMailNavigate = () => {
    navigate('/send-mail', { state: { email: profile?.email, id: profile?._id } });
  }
  //fetch user profile
  useEffect(() => {
    dispatch(userProfileAction(id));
  }, [id, dispatch, followed, unFollowed]);
  // console.log("view", profile?.viewedBy)
  //isLogin
  const isLogginUser = userAuth?._id === profile?._id;
  // console.log("hở???", isLogginUser);
  return (
    <>
      <div className="min-h-screen">
        {loading ? <LoadingComponent /> : profileAppErr || profileServerErr ? <div className="flex h-screen items-center justify-center p-5 w-full bg-white">
          <div className="text-center">
            <div className="inline-flex rounded-full bg-sky-100 p-4">
              <div className="rounded-full stroke-sky-600 bg-sky-200 p-4">
                <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 6L10.5 10.5M6 6H3L2 3L3 2L6 3V6ZM19.259 2.74101L16.6314 5.36863C16.2354 5.76465 16.0373 5.96265 15.9632 6.19098C15.8979 6.39183 15.8979 6.60817 15.9632 6.80902C16.0373 7.03735 16.2354 7.23535 16.6314 7.63137L16.8686 7.86863C17.2646 8.26465 17.4627 8.46265 17.691 8.53684C17.8918 8.6021 18.1082 8.6021 18.309 8.53684C18.5373 8.46265 18.7354 8.26465 19.1314 7.86863L21.5893 5.41072C21.854 6.05488 22 6.76039 22 7.5C22 10.5376 19.5376 13 16.5 13C16.1338 13 15.7759 12.9642 15.4298 12.8959C14.9436 12.8001 14.7005 12.7521 14.5532 12.7668C14.3965 12.7824 14.3193 12.8059 14.1805 12.8802C14.0499 12.9501 13.919 13.081 13.657 13.343L6.5 20.5C5.67157 21.3284 4.32843 21.3284 3.5 20.5C2.67157 19.6716 2.67157 18.3284 3.5 17.5L10.657 10.343C10.919 10.081 11.0499 9.95005 11.1198 9.81949C11.1941 9.68068 11.2176 9.60347 11.2332 9.44681C11.2479 9.29945 11.1999 9.05638 11.1041 8.57024C11.0358 8.22406 11 7.86621 11 7.5C11 4.46243 13.4624 2 16.5 2C17.5055 2 18.448 2.26982 19.259 2.74101ZM12.0001 14.9999L17.5 20.4999C18.3284 21.3283 19.6716 21.3283 20.5 20.4999C21.3284 19.6715 21.3284 18.3283 20.5 17.4999L15.9753 12.9753C15.655 12.945 15.3427 12.8872 15.0408 12.8043C14.6517 12.6975 14.2249 12.7751 13.9397 13.0603L12.0001 14.9999Z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <h1 className="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px] text-red-400">{profileServerErr}</h1>
            <p className="text-slate-600 mt-5 lg:text-lg">Oops something went wrong. Try to refresh this page or <br /> feel free to contact us if the problem presists.</p>
          </div>
        </div>
          : <div className=" flex overflow-hidden bg-white">
            {/* Static sidebar for desktop */}

            <div className="flex flex-col min-w-0 flex-1 overflow-hidden h-screen">
              <div className="flex-1 relative z-0 flex overflow-hidden">
                <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
                  <article>
                    {/* Profile header */}
                    <div>
                      <div >
                        <img
                          className="h-36 w-full object-cover lg:h-48"
                          src={profile?.profilePhoto}
                          alt={profile?.firstName}
                        />
                      </div>
                      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                          <div className="flex -mt-20">
                            <img
                              className="h-24 w-24 rounded-full  ring-4 ring-white sm:h-32 sm:w-32"
                              src={profile?.profilePhoto}
                              alt={profile?.firstName}
                            />
                          </div>
                          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                            <div className=" flex flex-col 2xl:block mt-10 min-w-0 flex-1">
                              <h1 className="text-2xl font-bold text-gray-900 ">
                                {profile?.firstName}{" "}
                                {profile?.lastName}

                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                  {profile?.accountType}
                                </span>
                                {/* Display if verified or not */}
                                {profile?.isAccountVerified ? <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-green-600 text-gray-300">
                                  Account Verified
                                </span> : <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-red-600 text-gray-300">
                                  Unverified Account
                                </span>}



                              </h1>
                              <p className="m-3 text-sm font-bold">
                                Date Joined:{" "}
                                <DateFormatter date={profile?.createdAt} />{" "}
                              </p>
                              <p className="text-green-400 mt-2 mb-2">
                                {profile?.post?.length} posts{" "}
                                {profile?.followers?.length} followers{" "}
                                {profile?.following?.length} following
                              </p>
                              {/* Who view my profile */}
                              <div className="flex items-center  mb-2">
                                <EyeIcon className="h-5 w-5 " />
                                <div className="pl-2">
                                  {profile?.viewedBy?.length}{" "}
                                  <span className="text-indigo-400 cursor-pointer hover:underline">
                                    users viewed your profile
                                  </span>
                                </div>
                              </div>

                              {/* is login user */}
                              {/* Upload profile photo */}
                              {isLogginUser &&  <Link
                                to={`/upload-profile-photo`}
                                className="inline-flex justify-center w-48 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                              >
                                <UploadIcon
                                  className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span>Upload Photo</span>
                              </Link>}
                             
                            </div>

                            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                              {/* // Hide follow button from the same */}
                              {!isLogginUser && <div>
                                {profile?.isFollowing ? <button
                                  onClick={() =>
                                    dispatch(unfollowUserAction(id))
                                  }
                                  className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                >
                                  <EmojiSadIcon
                                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span>Unfollow</span>
                                </button> : <button
                                  onClick={() => { dispatch(followUserAction(id)) }}
                                  type="button"
                                  className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                >
                                  <HeartIcon
                                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span>Follow </span>
                                  <span className="ml-2"></span>
                                </button>
                                }


                              </div>}

                              {/* Update Profile */}

                              <>
                              {isLogginUser &&   <Link
                                  to={`/update-profile/${profile?._id}`}
                                  className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                >
                                  <UserIcon
                                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span>Update Profile</span>
                                </Link>}
                              </>
                              {/* Send Mail */}
                              <button
                                onClick={sendMailNavigate}
                                className="inline-flex justify-center bg-indigo-900 px-4 py-2 border border-yellow-700 shadow-sm text-sm font-medium rounded-md text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                              >
                                <MailIcon
                                  className="-ml-1 mr-2 h-5 w-5 text-gray-200"
                                  aria-hidden="true"
                                />
                                <span className="text-base mr-2  text-bold text-yellow-500">
                                  Send Message
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="hidden sm:block mt-6 min-w-0 flex-1">
                          <h1 className="text-2xl font-bold text-gray-900 truncate">
                            {profile?.firstName}{" "}
                            {profile?.lastName}

                          </h1>
                        </div>
                      </div>
                    </div>
                    {/* Tabs */}
                    <div className="mt-6 sm:mt-2 2xl:mt-5">
                      <div className="border-b border-red-900">
                        <div className="max-w-5xl mx-auto "></div>
                      </div>
                    </div>
                    <div className="flex justify-center place-items-start flex-wrap  md:mb-0">
                      <div className="w-full md:w-1/3 px-4 mb-4 md:mb-0">
                        <h1 className="text-center text-xl border-gray-500 mb-2 border-b-2">
                          Who viewed my profile : {profile?.viewedBy?.length}
                        </h1>

                        {/* Who view my post */}
                        <ul className="">
                          {profile?.viewedBy?.length <= 0 ? <h1>No viewer</h1> : [profile?.viewedBy?.map(user => (
                            <li>
                              <Link>
                                <div className="flex mb-2 items-center space-x-4 lg:space-x-6">
                                  <img
                                    className="w-16 h-16 rounded-full lg:w-20 lg:h-20"
                                  src={user.profilePhoto}
                                  alt={user?._id}
                                  />
                                  <div className="font-medium text-lg leading-6 space-y-1">
                                    <h3>
                                      {user?.firstName} {user?.lastName}
                                    </h3>
                                    <p className="text-indigo-600">
                                      {user?.accountType} 
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            </li>
                          ))]}
                        </ul>
                      </div>
                      {/* All my Post */}
                      <div className="w-full md:w-2/3 px-4 mb-4 md:mb-0">
                        <h1 className="text-center text-xl border-gray-500 mb-2 border-b-2">
                          My Post - {profile?.post?.length}
                        </h1>
                        {/* Loop here */}
                        {profile?.post?.length <= 0 ? <h2 className="text-center text-xl">No Post Found</h2> : profile?.post?.map(post => (<div className="flex flex-wrap  -mx-3 mt-3  lg:mb-6">
                          <div className="mb-2   w-full lg:w-1/4 px-3">
                            <Link>
                              <img
                                className="object-cover h-40 rounded"
                                src={post?.image}
                                alt="poster"
                              />
                            </Link>
                          </div>
                          <div className="w-full lg:w-3/4 px-3">
                            <Link
                              // to={`/posts/${post?._id}`}
                              className="hover:underline"
                            >
                              <h3 className="mb-1 text-2xl text-green-400 font-bold font-heading">
                                {/* {capitalizeWord(post?.title)} */} {post?.title}
                              </h3>
                            </Link>
                            <p className="text-gray-600 truncate">
                              {post?.description}
                            </p>
                            <Link
                              className="text-indigo-500 hover:underline"
                              to={`/posts/${post?._id}`}
                            >
                              Read more
                            </Link>
                          </div>
                        </div>))}
                      </div>
                    </div>
                  </article>
                </main>
              </div>
            </div>
          </div>}
      </div>
    </>
  );
}
