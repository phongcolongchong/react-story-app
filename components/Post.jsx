import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import db from '../firebase';

function Post(props) {
  console.log("Post -> props", props)
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    let postRef = db
      .collection('users')
      .doc(props.uid)
      .collection('posts')
      .doc(props.id);

    postRef
      .get()
      .then((doc) => {
        let { title, content, url } = doc.data();
        setTitle(title);
        setContent(content);
        setUrl(url);
      })
  }, [])

  return (
    <div className="post-container">
      <div className="post-title">
        <h2>{title}</h2>
      </div>

      <img 
        src={url || 'http://via.placeholder.com/600'} 
        alt='image' 
      />

      <div className="post-content-container">
        <Card className="post-card-container">
          {
            content.split('\n').map((paragraph, index) => {
              return (
                <p key={index}>
                  {paragraph}
                </p>
              )
            })
          }
        </Card>
      </div>
    </div>
  );
}

export default Post;