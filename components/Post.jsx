import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import db from '../firebase';

function Post(props) {
  console.log("Post -> props", props)
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [loveCount, setLoveCount] = useState(0);

  const handleLoveCount = () => {
    setLoveCount(loveCount + 1);
    
    let postRef = db
      .collection('users')
      .doc(props.uid)
      .collection('posts')
      .doc(props.id);

    postRef
      .update({loveCount})
  }

  useEffect(() => {
    let postRef = db
      .collection('users')
      .doc(props.uid)
      .collection('posts')
      .doc(props.id);

    postRef
      .get()
      .then((doc) => {
        let { title, content, url, loveCount } = doc.data();
        setTitle(title);
        setContent(content);
        setUrl(url);
        setLoveCount(loveCount);
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
                <>
                  <p key={index}>
                    {paragraph}
                  </p>
                </>
              )
            })
          }
          <hr style={{opacity: '0.5'}}/>
          <div className="article-love">
            {loveCount}
            <HeartFilled className="love" onClick={() => handleLoveCount()} /> 
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Post;
