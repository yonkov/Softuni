import React, { Component } from 'react';

class Register extends Component {

  constructor(props){
    super(props)
    this.state ={
      userId: null,
      username:null,
      password: null
    }
    this.handleChange = props.handleChange.bind(this);
    
  }

  render() {
    return (
        <main className="text-center form">
        <form className="submit-form" onSubmit={(e)=>this.props.handleSubmit(e, this.state, true)}>
          <h1 className="h3 mb-3 font-weight-normal">Register</h1>
          <label htmlFor="inputUsername" className="sr-only">Username</label>
          <input type="username" onChange={this.handleChange} id="inputUsername" name="username" className="form-control" placeholder="Username" required autoFocus />
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input type="email" onChange={this.handleChange} id="inputEmail" name="email" className="form-control" placeholder="Email address" required autoFocus />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" onChange={this.handleChange} id="inputPassword" name="password" className="form-control" placeholder="Password" required />
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" defaultValue="remember-me" /> Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        </form>
        <div>
          <span className="txt1">
            Already have an account? 
          </span>
          <a href="/login" className="txt2"> Sign in</a>
        </div>
      </main>
    );
  }
}

export default Register;
