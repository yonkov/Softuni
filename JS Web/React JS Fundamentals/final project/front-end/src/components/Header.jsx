import React from 'react'
import { NavLink } from 'react-router-dom'
import Navigation from './Navigation';
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
              <NavLink  className="absolute-toggle d-block d-md-none" data-toggle="collapse" to="#navbarMenu" role="button" aria-expanded="true" aria-controls="navbarMenu"><span className="burger-lines" /></NavLink>
              <img className="mb-4" src="/images/react-logo.png" alt="react-logo" width={96} height={96} />
              <h1 className="site-logo"><NavLink to="/">My Awesome React Blog</NavLink></h1>
            </div>
          </div>
        </div>
        {/*Navigation*/}
        <Navigation isAuthed={isAuthed} isAdmin={isAdmin} logout={logout}/>
      </header>
    );
};
export default Header;