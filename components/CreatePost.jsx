import React, { useState } from 'react';
import { PageHeader, Input, Button } from 'antd';
import db from '../firebase';
import { navigate } from "@reach/router";

const { TextArea } = Input;

function CreatePost(props) {
  console.log("CreatePost -> props", props)
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);

  const onCreatePost = () => {
    let postRef = db
      .collection('users')
      .doc(props.user.uid)
      .collection('posts');

    let payload = {title, content};

    postRef
      .add(payload)
      .then((doc) => {
        console.log("Document written with ID: ", doc.id);
      })
    
    setTitle('');
    setContent('');
    console.log('title, content: ', {title, content} )
    navigate(`/stories/${props.user.uid}/posts`);
  }
   
  return (
    <div className="create-post-container">
      <div className="page-header-container">
        <PageHeader
          className="site-page-header"
          title="Create Post"
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
          <Button type="primary" onClick={() => onCreatePost()}>
            Create Post
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;