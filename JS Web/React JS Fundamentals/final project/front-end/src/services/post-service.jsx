import React from 'react' 
import {get} from '../data/remote.js'
    const postService = ()=>(
        fetch('http://localhost:9999/feed/posts')
        .then(rawData => rawData.json())
        .then(
  
          body => {
              console.log();
              
            this.setState({
              posts: body.posts
            })
          }
        )
    )
        .catch(error => console.error(error));
    
export default postService;



