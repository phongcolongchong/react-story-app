import React, { useState, useEffect } from 'react';
import { PageHeader, Card } from 'antd';
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
      <div className="page-header-container">
        <PageHeader
          className="site-page-header"
          title={title}
        />
      </div>

      <img 
        src={url || 'http://via.placeholder.com/600'} 
        alt='image' width='600px' 
        style={{marign: '0 auto'}}
      />

      <div className="post-content-container">
        <Card style={{ marginTop: '20px' }}>
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