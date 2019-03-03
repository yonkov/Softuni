import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import './public/css/Bootstrap-min.css';
import './public/css/Animate.css';
import './public/css/Owl.carousel.min.css';
import './public/css/Owl.carousel.min.css';
import './public/fonts/ionicons/css/ionicons.min.css';
import './public/fonts/fontawesome/css/font-awesome.min.css';
import './public/fonts/flaticon/font/flaticon.css';
import './public/css/Style.css';
import './public/css/Custom.css';


import Header from './components/Header';
import Footer from './components/Footer';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import About from './views/About/About';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      isAdmin: false,
      posts: []
    }
  }

  handleChange(e, data) {
    this.setState({
      [e.target.name]: e.target.value
    })

  }

  handleSubmit(e, data, isSignUp) {

    
    e.preventDefault()
    
    
    fetch('http://localhost:9999/auth/sign' + (isSignUp ? 'up' : 'in'), {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(
        rawData => rawData.json()
      )
      .then(
        
        body => {
          if (body.username) {
            this.setState({
              username: body.username,
              isAdmin: body.isAdmin
            }) 
            localStorage.setItem('username', body.username)
            localStorage.setItem('isAdmin', body.isAdmin)
            toast.success('Welcome, ' + body.username); 
            this.props.history.push('/')
          }
          else {
            toast.error(body.message);
          }
        }
      )
      .catch(error => console.error(error));


  }


  render() {
    return (
      <Fragment>
        <ToastContainer />
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" render={(props) => <Login
              handleSubmit={this.handleSubmit.bind(this)}
              handleChange={this.handleChange}
              history={this.props.history} />} />
          <Route exact path="/register" render={(props) => <Register
              handleSubmit={this.handleSubmit.bind(this)}
              handleChange={this.handleChange}
              history={this.props.history} />} />
          <Route exact path="/about" component={About} />
        </Switch>
        <Footer />
      </Fragment>
    );
  }
}

export default withRouter (App);
