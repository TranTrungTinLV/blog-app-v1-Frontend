import React from 'react'
import PublicNavbar from '../components/Navigation/Public/PublicNavbar'
import PrivateNavbar from './Navigation/Private/PrivateNavbar'
import AdminNavbar from './Navigation/Admin/AdminNavbar'
import { useSelector } from 'react-redux'

export default function Navbar() {
  //get user from store
  const state = useSelector(state=>state.users);
  console.log(state)
  const {userAuth} = state;
  console.log(userAuth)
  const isAdmin = userAuth?.isAdmin;
  console.log(isAdmin)
  return (
    <>
      {isAdmin ? <AdminNavbar/> : userAuth ? <PrivateNavbar/> : <PublicNavbar/>}
    </>
  )
}
