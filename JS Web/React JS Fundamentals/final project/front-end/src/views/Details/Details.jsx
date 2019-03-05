import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: props.posts.find(p => p._id === this.props.match.params.id) 
    }
  }
  render() {
    return (
      <div>{console.log(this.state.post)}</div>
    );
  }
}

export default Details;