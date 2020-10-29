import React, { useState } from 'react';
import { Input, Button, Progress } from 'antd';
import db from '../firebase';
import { storage } from '../firebase';
import { navigate } from "@reach/router";

import moment from 'moment';
moment().format();

const { TextArea } = Input;

function CreatePost(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);
  // const [love, setLove] = useState(0);


  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);

  const onImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  const onImageUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
          });
      }
    )
  }
  
  const onCreatePost = () => {
    let postRef = db
    .collection('users')
    .doc(props.user.uid)
    .collection('posts');
    
    // let now = moment();
    let payload = {title, content, url };

    postRef
      .add(payload)
      .then((doc) => {
        console.log("Document written with ID: ", doc.id);
      })
    
    setTitle('');
    setContent('');
    console.log('title, content: ', {title, content, url} )
    navigate(`/stories/${props.user.uid}/posts`);
  }
   
  return (
    <div className="create-post-container">
      <div className="post-inputs-container">
        <div className="post-input-container">
          <div className="post-input-title">
            <h4>Post Title:</h4>
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
            <h4>Post Content:</h4>
          </div>
          <div className="post-input">
            <TextArea 
              rows={10} 
              value={content}
              onChange={(e) => onContentChange(e)}
            />
          </div>
        </div>

        <div className="post-input-container">
          <div className="post-input-title">
            <h4>Post Image:</h4>
          </div>
          
          {/* <progress value={progress} max='100' /> */}
          <div className="post-input-image">
            <div className="post-input">
              <input 
                type="file"
                onChange={(e) => onImageChange(e)} 
              />
            </div>
            <div style={{ marginRight: '20px' }}>
              <Progress type="circle" percent={progress} width={80} max='100' />
            </div>
            <div>
              <Button 
                type="primary" 
                className="post-input-button"
                onClick={() => onImageUpload()}
              >
                Upload
              </Button>
            </div>
          </div>
        </div>

        <div>
          <Button 
            type="primary" 
            className="post-input-button"
            onClick={() => onCreatePost()}
          >
            Create Post
          </Button>
        </div>
      </div>

      <div className="create-post-cover-image"></div>
    </div>
  );
}

export default CreatePost;