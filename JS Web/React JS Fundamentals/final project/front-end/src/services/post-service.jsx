import React from 'react' 
import {get} from '../data/remote.js'
 async function postService() {
      try {
        const res = await fetch('http://localhost:9999/feed/posts')
        return res.json()
        
      } catch (error) {
        console.error(error);
      }
    }
   export default postService

