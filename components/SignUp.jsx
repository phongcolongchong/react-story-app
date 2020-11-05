import React, { useState } from 'react';
import { 
  Input, 
  Button,
  Select,
  Checkbox,
  Form 
} from 'antd';

import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { auth } from '../firebase';
import { navigate, Link } from "@reach/router";

const formItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signUpForm] = Form.useForm();
  
  const onEmailChange = (e) => setEmail(e.target.value); 
  const onPasswordChange = (e) => setPassword(e.target.value); 

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
        <Option value="85">+85</Option>
        <Option value="86">+86</Option>
      </Select>
    </Form.Item>
  );
  
  const onSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(function(result) {
        navigate(`/stories/${result.user.uid}/posts`);
      })
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
      <div className="sign-up-form-container">
        <div className="sign-up-header">
          SIGN UP
        </div>

        <Form
          {...formItemLayout}
          className="signup-form"
          form={signUpForm}
          name="register"
          onFinish={onSignUp}
          initialValues={{
            prefix: '84',
          }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
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
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              onChange={(e) => {onPasswordChange(e)}}
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords that you entered do not match!');
                },
              }),
            ]}
          >
            <Input.Password 
              size="large"
              placeholder="Confirm Password"
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input 
              size="large"
              placeholder="Phone Number"
              addonBefore={prefixSelector} 
              style={{ width: '100%' }} 
            />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject('Should accept agreement'),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <Link to={'/sign_up'} style={{color: '#607D8B'}}>agreement</Link>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button 
              type="primary" 
              htmlType="submit"
              className="logout-form-button"
              size="large"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
