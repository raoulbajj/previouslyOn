import React from 'react';

const Navbar = () => {

  if (window.location.pathname === '/logout') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('code');
    window.location.href = '/'
  }

  return (
    <nav>
      <div className="navbar bg-base-200 rounded-none">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a href={`/home`} className='tracking-widest'>Homepage</a></li>
              <li><a href='/favorites' className='tracking-widest'>Favorites</a></li>
              <li><a href={`/friends`} className='tracking-widest'>Friends</a></li>
              <li><a href='/logout' className='tracking-widest'>Logout</a></li>
            </ul>
          </div>
        </div>

        <div className="navbar-center tracking-widest italic">
          <p>
            <span className='text-2xl text-primary'>
              F
            </span>
            ind
            <span className='text-2xl text-primary'>
              Y
            </span>
            our

            <span className='text-2xl text-primary'>
              W
            </span>
            ay
          </p>
        </div>

        <div className="navbar-end">
          <img src="../../src/assets/mando.png" alt="Hey Mandooooo !!!" width='40px' className='m-1' />
        </div>

      </div>
    </nav>
  )
}

export default Navbar
