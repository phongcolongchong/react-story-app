import React from 'react';
import { Card } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { Link } from '@reach/router';
import db from '../firebase';

import moment from 'moment';
moment().format();

function PostSnippet(props) {
  const onPostDelete = (e) => {
    e.preventDefault();
    let docRef = db
      .collection('users')
      .doc(props.user.uid)
      .collection('posts')
      .doc(props.id);
      
    docRef.delete()
      .then(function() {
        console.log("Document successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  }

  return (
    <Link to={`/stories/${props.uid}/post/${props.id}`}>
      <div className="post-snippet-container">
        <Card
          
          type="inner"
          title={props.title}
          extra={
            <div className="post-snippet-links" style={{ display: 'flex' }}>
              {
                (props.user) && 
                  <div className="post-edit-links">
                    <Link to={`/update_post/${props.id}`} style={{ marginRight: '15px', color: '#4d9699' }}>
                      EDIT
                    </Link>
                    <a onClick={(e) => {onPostDelete(e)}} style={{ color: '#4d9699' }}>
                      DELETE
                    </a>
                  </div>
              }
            </div>
          }
        >
          <div className="article-content-container">
            <img 
              src={props.url || 'http://via.placeholder.com/250'} 
              alt='image'
            />
            <div className="article-content-love">
              <p className="article-content">
                {
                  props.content.split('\n').map((paragraph, index) => {
                    return (
                      <p key={index}>
                        {paragraph}
                      </p>
                    )
                  })
                }
              </p>
              <div className="article-love">
                {props.loveCount}
                <HeartFilled className="love" /> 
              </div>
            </div>
          </div>
            {/* {moment().startOf(props.now).fromNow()} */}
        </Card>
      </div>
    </Link>
  );
}

export default PostSnippet;
