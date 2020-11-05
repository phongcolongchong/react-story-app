import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
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
          case 'auth/invalid-email':
            signInForm.setFields([
              {
                name: 'email',
                errors: ['The email address is badly formatted']
              }
            ]);
          break;
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            signInForm.setFields([
              {
                name: 'email',
                errors: ['The account does not exist']
              }
            ]);
          break;
          case 'auth/wrong-password':
            signInForm.setFields([
              {
                name: 'email',
                errors: [''],
              },
              {
                name: 'password',
                errors: ['The password is invalid']
              }
            ]);
          break;
        }
        console.log("onSignIn -> error", error)
    });
  }

  return (
    <div className="sign-in-container">
      <div className="sign-in-form-container" >
        <div className="sign-in-header">
          SIGN IN
        </div>
        
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          form={signInForm} 
          onFinish={(values) => onSignIn(values)}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input 
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />} 
              placeholder="Email"
              onChange={(e) => {onEmailChange(e)}}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={(e) => {onPasswordChange(e)}}
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="login-form-button"
              size="large"
            >
              Log in
            </Button>
            <div>
              <Link to={'/sign_up'} style={{color: '#607D8B'}}>Don't have an account, Sign up</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default SignIn;
