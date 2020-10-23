import React from 'react';
import { Link } from '@reach/router';
import { Menu, Avatar } from 'antd';
import { ReadOutlined, FormOutlined, UserOutlined } from '@ant-design/icons';

function Nav(props) {
  return (
    <div className="main-navigation-container">
      <Menu mode="horizontal" className="navigation-container">
        { 
          (props.user) &&
            <>
              <Menu.Item key="posts" icon={<ReadOutlined />}>
                <Link to={`/stories/${props.user.uid}/posts`}>POSTS</Link>
              </Menu.Item>
              <Menu.Item key="create_post" icon={<FormOutlined />}>
                <Link to={"/create_post"}>CREATE POST</Link>
              </Menu.Item>
            </>
        }
        { 
          (!props.user)
            ? <Link to={"/sign_in"} style={{float: 'right', marginRight: '12px'}}>SIGN IN</Link>
            : <div  style={{float: 'right'}}>
                <Avatar icon={<UserOutlined />} style={{marginRight: '12px'}} />
                <a onClick={() => {props.onSignOut()}} style={{marginRight: '12px'}}>SIGN OUT</a>
              </div>
        }
      </Menu>
    </div>
  );
}

export default Nav;