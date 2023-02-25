import React, { useState } from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo.png'
import { useCookies } from 'react-cookie';
import { Link } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();

  const [toggleMenu, setToggleMenu] = useState(false)
  const [user, setUser] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const handleLogout = () => {
    removeCookie('user');
    navigate("/");

  }
  return (
    <div className='navbar'>
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <img src={logo} alt="logo" />
          <Link to="/">
            <h1>Formalin</h1>
          </Link>
        </div>
        <div className="navbar-links_container">
        

          {cookies.user && <Link to="/profile"><p>My Forms</p> </Link>}
          {cookies.user && <p onClick={handleLogout}>Logout</p>}

        </div>
      </div>
      <div className="navbar-sign">
        {cookies.user ? (
          <>
            <Link to="/create">
              <button type='button' className='primary-btn' >Create</button>
            </Link>
            <Link to="/profile">
              <button type='button' className='secondary-btn'>Profile</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <button type='button' className='primary-btn' >Sign In</button>
            </Link>
            <Link to="/register">
              <button type='button' className='secondary-btn'>Sign Up</button>
            </Link>
          </>
        )}



      </div>
      <div className="navbar-menu">
        {toggleMenu ?
          <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className="navbar-menu_container scale-up-center" >
            <div className="navbar-menu_container-links">
            </div>
            <div className="navbar-menu_container-links-sign">
              {cookies.user ? (
                <>
                  <Link to="/create">
                    <button type='button' className='primary-btn' >Create</button>
                  </Link>
                  <Link to="/profile">
                  <button type='button' className='secondary-btn'>Profile</button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button type='button' className='primary-btn'>Sign In</button>
                  </Link>
                  <Link to="/register">
                    <button type='button' className='secondary-btn'>Sign Up</button>
                  </Link>
                </>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
