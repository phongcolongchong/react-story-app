import React, { useState, useEffect } from 'react';
import { PageHeader, Input, Button } from 'antd';
import db from '../firebase';
import { navigate } from "@reach/router";

const { TextArea } = Input;

function UpdatePost(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    let postRef = db
      .collection('users')
      .doc(props.user.uid)
      .collection('posts')
      .doc(props.id);

    postRef
      .get()
      .then((doc) => {
        let { title, content } = doc.data();
        setTitle(title);
        setContent(content);
      })
  }, [])

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);

  const onEditPost = () => {
    let postRef = db
      .collection('users')
      .doc(props.user.uid)
      .collection('posts')
      .doc(props.id);
      
    let payload = {title, content};

    postRef
      .update(payload)
      .then(() => {
        console.log("Document updated with ID: ", props.id);
      })
    
    navigate(`/posts`);
  }
   
  return (
    <div className="create-post-container">
      <div className="page-header-container">
        <PageHeader
          className="site-page-header"
          title="Edit Post"
        />
      </div>

      <div className="post-inputs-container">
        <div className="post-input-container">
          <div className="post-input-title">
            <h2>Post Title</h2>
          </div>
          <div className="post-input">
            <Input 
              placeholder="Post title" 
              value={title} 
              onChange={(e) => onTitleChange(e)} 
            />
          </div>
        </div>

        <div className="post-input-container">
          <div className="post-input-title">
            <h2>Post Content</h2>
          </div>
          <div className="post-input">
            <TextArea 
              rows={10} 
              value={content}
              onChange={(e) => onContentChange(e)}
            />
          </div>
        </div>

        <div className="post-input-button">
          <Button type="primary" onClick={() => onEditPost()}>
            Edit Post
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UpdatePost;