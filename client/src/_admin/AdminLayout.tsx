import React from 'react'
import AdminNav from './element/AdminNav'
import AdminPage from './element/AdminPage'

const AdminLayout = () => {
  return (
    <section className=" bg-white">
    <div className="">
        <AdminNav />
    </div>
    <div className="">
        <AdminPage/>
    </div>
 
</section>
  )
}

export default AdminLayout
