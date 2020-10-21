import React, { useState } from 'react';
import { PageHeader , Input, Button, Form } from 'antd';
import { auth } from '../firebase';
import { navigate, Link } from "@reach/router";

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signInForm] = Form.useForm();
  
  const onEmailChange = (e) => setEmail(e.target.value); 
  const onPasswordChange = (e) => setPassword(e.target.value); 
  
  const onSignIn = (values) => {
    console.log("onSignIn -> values", values)
    const { email, password } = values;
    auth
      .signInWithEmailAndPassword(email, password)
      .then(function(result) {
        console.log("onSignIn -> result", result)  
        navigate(`/stories/${result.user.uid}/posts`);
        setEmail('');
        setPassword('');
      })
      .catch(function(error) {
        switch (error.code) {
          case 'auth/wrong-password':
            signInForm.setFields([{
              name: 'password',
              errors: ['The password is invalid']
            }]);
          break;
          case 'auth/invalid-email':
            signInForm.setFields([{
              name: 'email',
              errors: ['The email address is badly formatted']
            }]);
          break;
          case 'auth/user-not-found':
            signInForm.setFields([{
              name: 'email',
              errors: ['The account does not exist']
            }]);
          break;
        }
        console.log("onSignIn -> error", error)
    });
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
        <Form form={signInForm} onFinish={(values) => onSignIn(values)}>
          <div className="post-input-title">
            <h2>Email</h2>
          </div>
          <div className="post-input">
            <Form.Item name="email">
              <Input 
                placeholder="Email" 
                onChange={(e) => {onEmailChange(e)}}
              />
            </Form.Item>
          </div>

          <div className="post-input-title" style={{ marginTop: '20px' }}>
            <h2>Password</h2>
          </div>
          <div className="post-input">
            <Form.Item name="password">
              <Input.Password 
                placeholder="Password" 
                onChange={(e) => {onPasswordChange(e)}}
              />
            </Form.Item>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <div>
              <Link to={'/sign_up'}>Don't have an account, Sign up</Link>
            </div>
            <div className="post-input-button">
              <Button type="primary" htmlType="submit" >
                Sign In
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignIn;