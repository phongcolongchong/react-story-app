import React, { useState } from 'react';
import { PageHeader , Input, Button } from 'antd';
import { auth } from '../firebase';
import { navigate, Link } from "@reach/router";

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const onEmailChange = (e) => setEmail(e.target.value); 
  const onPasswordChange = (e) => setPassword(e.target.value); 
  
  const onSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        console.log("onSignUp -> error", error)
        // Note: need clear fields when there was an error
    });

    setEmail('');
    setPassword('');
    
    console.log("SignUp -> email, password", {email, password})
  }

  return (
    <div className="sign-up-container">
      <div className="page-header-container">
        <PageHeader
          className="site-page-header"
          title="Sign Up"
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
            <Link to={'/sign_in'}>Already have an account, Sign in</Link>
          </div>
          <div className="post-input-button">
            <Button type="primary" onClick={() => {onSignUp()}}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;