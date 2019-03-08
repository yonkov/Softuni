import React from 'react'
import { toast } from 'react-toastify'


function authenticateUser(data, isSignUp) {
    
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
          }
          else {
            toast.error(body.message);
          }
        }
      )
      .catch(error => console.error(error));
  }
  export{authenticateUser}