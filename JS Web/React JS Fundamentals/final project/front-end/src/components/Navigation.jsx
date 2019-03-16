import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    const { isAdmin, isAuthed, logout } = this.props;
    const collapsed = this.state.collapsed;
    const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light nav">
        <div className="container">
          <button onClick={this.toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className={`${classOne}`} id="navbarResponsive">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">

                <NavLink exact className="nav-link" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                {!isAuthed && <NavLink className="nav-link" to="/login">Login</NavLink>}
              </li>
              <li className="nav-item">
                {!isAuthed && <NavLink className="nav-link" to="/register">Register</NavLink>}
              </li>
              <li className="nav-item">
                {isAuthed && <NavLink className="nav-link" to="/logout" onClick={logout}>Logout</NavLink>}
              </li>
              <li className="nav-item">
                {isAdmin && <NavLink className="nav-link" to="/create">Create</NavLink>}
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/all">All Posts</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
export default Navigation;