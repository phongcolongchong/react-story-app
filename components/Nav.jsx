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
              <Menu.Item key="logo" id="logo">
                <Link to={`/stories/${props.user.uid}/posts`} style={{color: '#126149'}}>StoryApp</Link>
              </Menu.Item>
              <Menu.Item key="posts" icon={<ReadOutlined />} style={{color: '#126149'}}>
                <Link to={`/stories/${props.user.uid}/posts`} style={{color: '#126149'}}>POSTS</Link>
              </Menu.Item>
              <Menu.Item key="create_post" icon={<FormOutlined />} style={{color: '#126149'}}>
                <Link to={"/create_post"} style={{color: '#126149'}}>CREATE POST</Link>
              </Menu.Item>
            </>
        }
        { 
          (!props.user)
            ? <Link to={"/sign_in"} style={{float: 'right', marginRight: '12px', color: '#126149'}}>SIGN IN</Link>
            : <div  style={{float: 'right'}}>
                <Avatar icon={<UserOutlined />} style={{marginRight: '12px', color: '#126149'}} />
                <a onClick={() => {props.onSignOut()}} style={{marginRight: '12px', color: '#126149'}}>SIGN OUT</a>
              </div>
        }
      </Menu>
    </div>
  );
}

export default Nav;