import React, { useState, useEffect } from 'react';
import { Router } from '@reach/router';
import { auth } from '../firebase';

import Posts from './Posts';
import Post from './Post';
import CreatePost from './CreatePost';
import UpdatePost from './UpdatePost';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Nav from './Nav';

function App() {
  const [user, setUser] = useState(false);
  
  useEffect(() => {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        setUser(user);
        console.log("user signed in ", user)
      } else {
        console.log("Have no user sign in")
      }
    });
  }, []);

  const onSignOut = () => {
    auth.signOut().then(function() {
      // Sign-out successful.
      setUser(false);
      console.log('Sign-out successful')
    }).catch(function(error) {
      // An error happened.
    });
  }

  return (
    <div className="app-container">
      <Nav user={user} onSignOut={onSignOut} />

      <Router>
        <SignUp path="sign_up" />
        <SignIn path="sign_in" default />
        <Posts path="stories/:uid/posts" user={user} />
        <Post path="stories/:uid/post/:id" user={user} />
        <CreatePost path="create_post" user={user} />
        <UpdatePost path="update_post/:id" user={user} />
      </Router>
    </div>
  );
};

export default App;