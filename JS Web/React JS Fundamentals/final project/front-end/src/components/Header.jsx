import React from 'react'
import { NavLink } from 'react-router-dom'
const Header =(props) =>{
  const {isAdmin, isAuthed, logout } = props;
    return(
        <header role="banner">
        <div className="top-bar">
          <div className="container">
            <div className="row">
              <div className="col-9 social">
                <NavLink to="/#"><span className="fa fa-twitter" /></NavLink>
                <NavLink to="/#"><span className="fa fa-facebook" /></NavLink>
                <NavLink to="/#"><span className="fa fa-instagram" /></NavLink>
                <NavLink to="/#"><span className="fa fa-youtube-play" /></NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="container logo-wrap">
          <div className="row pt-5">
            <div className="col-12 text-center">
              <NavLink  className="absolute-toggle d-block d-md-none" data-toggle="collapse" to="#navbarMenu" role="button" aria-expanded="false" aria-controls="navbarMenu"><span className="burger-lines" /></NavLink>
              <img className="mb-4" src="/images/react-logo.png" alt="react-logo" width={96} height={96} />
              <h1 className="site-logo"><NavLink to="/">My Awesome React Blog</NavLink></h1>
            </div>
          </div>
        </div>
        {/*Navigation*/}
        <nav className="navbar navbar-expand-md  navbar-light bg-light">
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarMenu">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                
                  <NavLink exact className="nav-link" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                  {!isAuthed && <NavLink  className="nav-link" to="/login">Login</NavLink>}
                </li>
                <li className="nav-item">
                  {!isAuthed && <NavLink  className="nav-link" to="/register">Register</NavLink>}
                </li>
                <li className="nav-item">
                  {isAuthed && <NavLink  className="nav-link" to="/logout" onClick={logout}>Logout</NavLink>}
                </li>
                <li className="nav-item">
                  {isAdmin && <NavLink  className="nav-link" to="/create">Create</NavLink>}
                </li>
                <li className="nav-item">
                  <NavLink  className="nav-link" to="/about">About</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink  className="nav-link" to="/all">All Posts</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
};
export default Header;