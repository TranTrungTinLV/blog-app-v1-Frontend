import React from 'react'
import PublicNavbar from '../components/Navigation/Public/PublicNavbar'
import PrivateNavbar from './Navigation/Private/PrivateNavbar'
import AdminNavbar from './Navigation/Admin/AdminNavbar'
import { useSelector } from 'react-redux'
import AccountVerificationAlertWarning from './Navigation/Alerts/AccountVerificationAlertWarning'
import AccountVerificationSuccessAlert from './Navigation/Alerts/AccountVerificationSuccessAlert'

export default function Navbar(props) {
  console.log("props",props)
  //get user from store
  const state = useSelector(state=>state.users);
  console.log(state)
  const {userAuth,profile} = state;
  console.log(userAuth)
  const isAdmin = userAuth?.isAdmin;
  console.log('---',profile)
    //get user from store
    const account = useSelector(state=>state?.accountVerication);
    const {token,loading,appErr,serverErr} = account;
    console.log('token',token);
    
  return (
    <>
      {isAdmin ? <AdminNavbar isLogin={userAuth}/> : userAuth ? <PrivateNavbar isLogin={userAuth}/> : <PublicNavbar/>}
      {/* Alert display */}
      {userAuth && !profile?.isAccountVerified && <AccountVerificationAlertWarning />}
      {/* Alert success */}
      {loading && <h2 className='text-center text-red-500'>Loading please wait</h2>}
      {token && <AccountVerificationSuccessAlert/>}
    </>
  )
}
