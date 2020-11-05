import React, { useState, useEffect } from 'react';
import { PageHeader, Input, Button, Progress } from 'antd';
import db from '../firebase';
import { storage } from '../firebase';
import { navigate } from "@reach/router";

const { TextArea } = Input;

function UpdatePost(props) {
  console.log("UpdatePost -> props", props)
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let postRef = db
      .collection('users')
      .doc(props.user.uid)
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

  const onEditPost = () => {
    let postRef = db
      .collection('users')
      .doc(props.user.uid)
      .collection('posts')
      .doc(props.id);

    let payload = {title, content, url};

    postRef
      .update(payload)
      .then(() => {
        console.log("Document updated with ID: ", props.id);
      })
    
    navigate(`/stories/${props.user.uid}/posts`);
  }
   
  return (
    <div className="edit-post-container">
      <div className="edit-post-title">
        <h2>Edit Post</h2>
      </div>

      <div className="edit-main-container">
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

            <img 
              src={url || 'http://via.placeholder.com/300'} 
              alt='image' width='300px' 
              style={{marginBottom: '20px'}}
            />

            <div className="post-input-image">
              <div className="post-input">
                <input 
                  type="file"
                  onChange={(e) => onImageChange(e)} 
                />
              </div>
              <div className="post-progress">
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
              onClick={() => onEditPost()}
            >
              Edit Post
            </Button>
          </div>
        </div>

        <div className="edit-post-cover-image"></div>
      </div>
    </div>
  );
}

export default UpdatePost;
