import React from 'react'
import "../styles/NotFound.css"
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
    <div className="ntf-gen-div">
        <p className="unhandled-ntf">UNHANDLED THROWN ERROR!</p>
        <p className="page-404">404 Not Found </p>
        <Link to="/" className='back'>Go Back To Home</Link>
    </div>
    </>
  )
}

export default NotFound
