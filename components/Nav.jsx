import React from 'react';
import { Link } from '@reach/router';
import { Menu, Avatar } from 'antd';
import { ReadOutlined, FormOutlined, UserOutlined } from '@ant-design/icons';

function Nav(props) {
  return (
    <div className="app-main-navigation">
      <Menu mode="horizontal">
        { 
          (props.user) &&
            <>
              <Menu.Item key="posts" icon={<ReadOutlined />}>
                <Link to={`/stories/${props.user.uid}/posts`}>Posts</Link>
              </Menu.Item>
              <Menu.Item key="create_post" icon={<FormOutlined />}>
                <Link to={"/create_post"}>Create Post</Link>
              </Menu.Item>
            </>
        }
        { 
          (!props.user)
            ? <Link to={"/sign_in"} style={{float: 'right'}}>Sign In</Link>
            : <div  style={{float: 'right'}}>
                <Avatar icon={<UserOutlined />} style={{marginRight: '12px'}} />
                <a onClick={() => {props.onSignOut()}}>Sign Out</a>
              </div>
        }
      </Menu>
    </div>
  );
}

export default Nav;