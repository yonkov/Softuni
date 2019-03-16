import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'

class Login extends Component {

  constructor(props){
    super(props)
    this.state ={
      userId: null,
      username:null,
      password: null,
    }
    this.handleChange = props.handleChange.bind(this);
    
  }

  render() {
    return (
        <main className="text-center form">
        <form className="submit-form" onSubmit={(e)=>this.props.handleSubmit(e, this.state, false)}>
          <h1 className="h3 mb-3 font-weight-normal">Log in</h1>
          <label htmlFor="inputUsername" className="sr-only">Username</label>
          <input type="text"  onChange={this.handleChange} id="inputUsername" name="username" className="form-control" placeholder="Username" required autoFocus />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password"  onChange={this.handleChange} id="inputPassword" name="password" className="form-control" placeholder="Password" required />
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" defaultValue="remember-me" /> Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
        <div>
          <span className="txt1">
            Don’t have an account? 
          </span>
          <NavLink to="/register" className="txt2"> Sign up</NavLink>
        </div>
      </main>
    );
  }
}

export default Login;
