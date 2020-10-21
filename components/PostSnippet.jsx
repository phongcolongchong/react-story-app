import React from 'react';
import { Card } from 'antd';
import { Link } from '@reach/router';
import db from '../firebase';


function PostSnippet(props) {
  const onPostDelete = () => {
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
    <div className="post-snippet-container">
      <Card
        style={{ marginTop: 32 }} 
        type="inner"
        title={props.title}
        extra={
          <div className="post-snippet-links" style={{ display: 'flex' }}>
            <Link to={`/stories/${props.uid}/post/${props.id}`} style={{ marginRight: '15px' }}>
              Read more
            </Link>
            {
              (props.user) && 
                <div className="post-edit-links">
                  <Link to={`/update_post/${props.id}`} style={{ marginRight: '15px' }}>
                    Edit
                  </Link>
                  <a onClick={() => {onPostDelete()}}>
                    Delete
                  </a>
                </div>
            }
          </div>
        }
      >
        <div className="article-content-container">
          <img 
            src={props.url || 'http://via.placeholder.com/300'} 
            alt='image' width='300px' 
            style={{marginRight: '20px'}}
          />
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
        </div>
      </Card>
    </div>
  );
}

export default PostSnippet;