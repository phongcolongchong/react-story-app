import React, { useState, useEffect } from 'react';
import PostSnippet from './PostSnippet';
import _ from 'lodash';
import db from '../firebase';

function Posts(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let userId = props?.user.uid ? props?.user.uid : props.uid

    db.collection('users')
      .doc(userId)
      .collection('posts')
      .onSnapshot(async posts => {
        let postData = await posts.docs.map(post => {
          let data = post.data();
          let { id } = post;
          
          let payload = {
            id,
            ...data
          };
          
          return payload;
        });
        
        console.log("Posts -> postData", postData)
        setPosts(postData);
      })
    db.collection('users')
      .doc(userId)
      .collection('posts')
      .onSnapshot(async posts => {
        let postData = await posts.docs.map(post => {
          let data = post.data();
          let { id } = post;
          
          let payload = {
            id,
            ...data
          };
          
          return payload;
        });
        
        console.log("Posts -> postData", postData)
        setPosts(postData);
      })
  }, []);

  return (
    <div className="posts-container">
      <div className="articles-container">
        {
          _.map(posts, (article, index) => {
            return (
              <PostSnippet
                key={index}
                id={article.id}
                url={article.url}
                title={article.title} 
                content={`${article.content.substring(1, 600)} ...`}
                now={article.now}
                user={props.user}
                uid={props.uid}
              />
            )
          })
        }
      </div>
    </div>
  );
}

export default Posts;