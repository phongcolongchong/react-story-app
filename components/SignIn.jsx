import React, { useState } from 'react';
import { PageHeader , Input, Button } from 'antd';
import { auth } from '../firebase';
import { navigate, Link } from "@reach/router";

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const onEmailChange = (e) => setEmail(e.target.value); 
  const onPasswordChange = (e) => setPassword(e.target.value); 
  
  const onSignIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(function(result) {
        console.log("onSignIn -> result", result)  
      })
      .catch(function(error) {
        console.log("onSignIn -> error", error)
    });
    console.log('aaaaaaasdfasdfasdfasdfasdfasdfasdfsdf', result.user.uid);
    setEmail('');
    setPassword('');
    navigate(`/stories/${uid}/posts`);
  }

  return (
    <div className="sign-up-container">
      <div className="page-header-container">
        <PageHeader
          className="site-page-header"
          title="Sign In"
        />
      </div>

      <div className="post-input-container" style={{ marginTop: '20px' }}>
        <div className="post-input-title">
          <h2>Email</h2>
        </div>
        <div className="post-input">
          <Input 
            placeholder="Email" 
            onChange={(e) => {onEmailChange(e)}}
          />
        </div>

        <div className="post-input-title" style={{ marginTop: '20px' }}>
          <h2>Password</h2>
        </div>
        <div className="post-input">
          <Input.Password 
            placeholder="Password" 
            onChange={(e) => {onPasswordChange(e)}}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <div>
            <Link to={'/sign_up'}>Don't have an account, Sign up</Link>
          </div>
          <div className="post-input-button">
            <Button type="primary" onClick={() => {onSignIn()}} >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;