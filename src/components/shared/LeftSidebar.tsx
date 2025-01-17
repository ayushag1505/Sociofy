import React from 'react'
import { Link } from 'react-router-dom'

const LeftSidebar = () => {
  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link to="/" className='flex gap-3 items-center'>
          <img src='/assets/images/logo.png' alt='logo'/>
          <h3>Sociofy</h3>
        </Link>
      </div>
    </nav>
  )
}

export default LeftSidebar