import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter, } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import './services/authentication-service'
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import About from './views/About/About';
import Create from './views/Create/Create';
import Details from './views/Details/Details';
import PrivateRoute from './components/PrivateRoute';
import Edit from './views/Edit/Edit';
import { authenticateUser } from './services/authentication-service';
import Delete from './views/Delete/Delete';
import Sidebar from './components/Sidebar';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: null,
      username: null,
      isAdmin: false,
      isAuthed: false,
      posts: [],
      filtered:[]
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  componentDidMount() {
    const isAdmin = localStorage.getItem('isAdmin') === "true"
    const isAuthed = !!localStorage.getItem('username');

    if (isAuthed) {
      this.setState({
        userId: localStorage.getItem('userId'),
        username: localStorage.getItem('username'),
        isAdmin,
        isAuthed,
      })
    }
    this.getPosts();

 
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState== this.state) {
      this.getPosts();
    }
  }


  handleChange(e, data) {

    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSearchChange(e, data){

    let posts =this.state.posts;
    let searchedText = [];
    let filteredPosts = [];
    if (e.target.value) {
      searchedText = e.target.value
      filteredPosts = posts.filter(p=>p.title.toLowerCase().includes(searchedText))
      this.setState({
        posts: filteredPosts
      })
    }
    
  }

  handleSubmit(e, data, isSignUp) {

    e.preventDefault()

    fetch('http://localhost:9999/auth/sign' + (isSignUp ? 'up' : 'in'), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(
        rawData => rawData.json()
      )
      .then(

        body => {

          if (body.username) {
            this.setState({
              userId: body.userId,
              username: body.username,
              isAdmin: body.isAdmin,
              isAuthed: !!body.username
            })


            localStorage.setItem('userId', body.userId)
            localStorage.setItem('username', body.username)
            localStorage.setItem('isAdmin', body.isAdmin)
            localStorage.setItem('isAuthed', !!body.username)

            toast.success('Welcome, ' + body.username);
            this.props.history.push('/')
          }
          else {
            toast.error(body.message);
          }
        }
      )
      .catch(error => console.error(error));
    authenticateUser(data, isSignUp)
    this.props.history.push('/')
  }

  handleCreateSubmit(e, data) {
    e.preventDefault();

    fetch('http://localhost:9999/feed/post/create', {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(
        rawData => rawData.json()
      )
      .then(

        body => {
          if (!body.errors) {
            toast.success(body.message);
            this.props.history.push('/');
            this.getPosts()
          }
          else {
            toast.error(body.message);
          }
        }
      )
      .catch(error => console.error(error));
  }

  getPosts() {
    fetch('http://localhost:9999/feed/posts')
      .then(rawData => rawData.json())
      .then(
        
        body => {
          console.log(body);
          this.setState({
            posts: body.posts
          })
        }
      )
      .catch(error => console.error(error));
  }

  logout() {

    this.setState({
      userId: null,
      username: null,
      isAdmin: false,
      isAuthed: false,
    })
    localStorage.clear();
    toast.success("You have been successfully logged out!")
  }

  render() {
    return (
      <Fragment>
        <ToastContainer />
        <Header username={this.state.username} isAdmin={this.state.isAdmin} isAuthed={this.state.isAuthed} logout={this.logout.bind(this)} />

        <Switch>

          <Route exact path="/" render={(props) => (
              <Home posts={this.state.posts} 
              handleChange={this.handleSearchChange.bind(this)} 
              {...props} />
          )} />

          <Route path="/login" render={(props) =>
            this.state.isAuthed ?
              <Redirect to="/" />
              :
              <Login
                handleSubmit={this.handleSubmit.bind(this)}
                handleChange={this.handleChange}
                history={this.props.history}
                {...props} />} />

          <Route path="/register" render={(props) =>
            this.state.isAuthed ?
              <Redirect to="/" />
              :
              <Register
                handleSubmit={this.handleSubmit.bind(this)}
                handleChange={this.handleChange}
                history={this.props.history}
                {...props} />} />

          <Route path="/logout" render={(props) => {

            return (<Redirect to="/login" />)
          }} />;

          <PrivateRoute path="/create"
            isAdmin={this.state.isAdmin} render={(props) =>
              <Create handleSubmit={this.handleCreateSubmit.bind(this)}
                handleChange={this.handleChange}
                history={this.props.history}
                {...props} />} />

          <Route exact path="/posts/:id" render={(props) =>
            <Details
              isAdmin={this.state.isAdmin}
              posts={this.state.posts}
              {...props} />} />

          <PrivateRoute exact path="/edit/:id" 
            isAdmin={this.state.isAdmin} render={(props) =>
            <Edit
              getPosts = {this.getPosts.bind(this)}              
              handleChange={this.handleChange}
              history={this.props.history}
              {...props} />} />

          <PrivateRoute exact path="/delete/:id" 
          isAdmin={this.state.isAdmin} render={(props) =>
            <Delete
              handleChange={this.handleChange}
              history={this.props.history}
              {...props} />} />

          <Route path="/about" component={About} />
        </Switch>


        <Footer />
      </Fragment>
    );
  }
}

export default withRouter(App);