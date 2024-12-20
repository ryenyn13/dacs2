import React from 'react'
import { Link } from 'react-router-dom'

const AdminNav = () => {
  return (
    <Link to="/">
      <section className="flex w-full h-[50px] bg-white">
        <p className="px-10 flex justify-start items-center text-[20px] font-bold text-black">
          Admin
        </p>
      </section>
    </Link>
  );
}

export default AdminNav
