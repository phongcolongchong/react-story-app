import React from 'react';
import { Link } from '@reach/router';
import { Menu } from 'antd';
import { ReadOutlined, FormOutlined } from '@ant-design/icons';

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
            : <a style={{float: 'right'}} onClick={() => {props.onSignOut()}}>Sign Out</a>
        }
      </Menu>
    </div>
  );
}

export default Nav;