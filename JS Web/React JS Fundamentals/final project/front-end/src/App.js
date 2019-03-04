import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
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
import Create from './views/Create/Create';
import PrivateRoute from './components/PrivateRoute';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: null,
      username: null,
      isAdmin: false,
      isAuthed: false,
      posts: []
    }
  }

  componentWillMount() {
    const isAdmin = localStorage.getItem('isAdmin') === "true"
    const isAuthed = !!localStorage.getItem('username');

    if (localStorage.getItem('username')) {
      this.setState({
        userId: localStorage.getItem('userId'),
        username: localStorage.getItem('username'),
        isAdmin,
        isAuthed
      })
    }
    
    this.getPosts()
    
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
            console.log(this.state);
            

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

  getPosts(){
    fetch('http://localhost:9999/feed/posts')
    .then(rawData => rawData.json())
      .then(
      body =>{
        this.setState({
          posts: body.posts
        })
        // if (!body.errors) {
        //   toast.success(body.message);  
        // }
        // else{
        //   toast.error(body.message);
        // }      
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
          
          <Route exact path="/" render={() =>
            <Home 
              posts={this.state.posts} />} />
          
          <Route path="/login" render={() => 
              this.state.isAuthed ? 
                <Redirect to="/" /> 
                :
                <Login
                  handleSubmit={this.handleSubmit.bind(this)}
                  handleChange={this.handleChange}
                  history={this.props.history} />} />
            
          <Route path="/register" render={() => 
              this.state.isAuthed ? 
                <Redirect to="/" /> 
                :
                <Register
                  handleSubmit={this.handleSubmit.bind(this)}
                  handleChange={this.handleChange}
                  history={this.props.history} />} />
          
          <Route path="/logout" render={() => {
            return (<Redirect to="/login" />)}}/>;

          <PrivateRoute path="/create" 
            isAdmin={this.state.isAdmin} render={() =>
            <Create handleSubmit={this.handleCreateSubmit.bind(this)}
              handleChange={this.handleChange}
              history={this.props.history} />} />

          <Route path="/about" component={About} />
        
        </Switch>
        
        <Footer />
      </Fragment>
    );
  }
}

export default withRouter(App);