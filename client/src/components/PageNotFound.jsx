import React from 'react'

const PageNotFound = () => {
    return (
        <div className='flex flex-grow text-6xl w-full items-center justify-center bg-base-100 flex-col gap-10'>

            <p>
                404 | Page Not Found
            </p>

            <a href='/home'>
                <button className='btn btn-primary btn-outline tracking-widest'>
                    Go back to Homepage
                </button>
            </a>
        </div>
    )
}

export default PageNotFound
