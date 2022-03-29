import React from 'react'
import { Link } from 'react-router-dom'

const ForgotPass: React.FC =()=> {
  return (
    <div className={`h-screen w-screen flex flex-col justify-center items-center gap-2`}>
        <h1 className={`text-red-400 text-lg tracking-wide`}>This feature is temporary unavailable.</h1>
        <span className={`text-gray-800 text-14px`}>Contact System Adminstrator</span>
        <Link
          to={`/`}
          className={`block text-center bg-normalBlue py-1 outline-none rounded-full duration-150 hover:bg-primaryBlue text-gray-50 mb-10 px-10 text-13px`}
        >
          <button className={``}>
            <i className={`fa fa-external-link`} /> Back to Login
          </button>
        </Link>

    </div>
  )
}

export default ForgotPass