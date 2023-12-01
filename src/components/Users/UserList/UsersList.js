import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersListHeader from "./UsersListHeader";
import UsersListItem from "./UsersListItem";
import { fetchUsersAction } from "../../../redux/slices/users/usersSlices";
const UsersList = () => {
  //dispatch 
  const dispatch = useDispatch();

  //data from store
  const users = useSelector(state => state?.users);
  const { usersList, appErr, serverErr, loading,block,unblock } = users;
  //fetch all users
  useEffect(() => {
    dispatch(fetchUsersAction())
  },[block,unblock])
  
  console.log(users)
  return (
    <>
      <section class="py-8 bg-gray-900 min-h-screen">
        {loading ? <h1>Loading</h1> : appErr || serverErr ? <h3>{appErr} {serverErr}</h3> : usersList?.length <= 0 ? <h3>No Users Found</h3> : usersList?.map(user => (
          <>
            {/* <UsersListHeader /> */}
            <div class="container px-4 mx-auto">
              <UsersListItem user={user}/>
            </div>
          </>
        ))}
      </section>
    </>
  );
};

export default UsersList;
