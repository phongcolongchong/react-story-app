import React, { useState, useEffect } from 'react';
import { PageHeader } from 'antd';
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

        setPosts(postData);
      })
  }, []);

  return (
    <div className="posts-container">
      <div className="page-header-container">
        <PageHeader
          className="site-page-header"
          title="Posts"
        />
      </div>

      <div className="articles-container">
        {
          _.map(posts, (article, index) => {
            return (
              <PostSnippet
                key={index}
                id={article.id}
                url={article.url}
                title={_.capitalize(article.title)} 
                // content={article.content.substring(1, 1000)}
                content={`${article.content.substring(1, 1000)} ...`}
                user={props.user}
                uid={props.uid}
              />
            )
          })
        }
        {/* {
          posts.map((article, index) => {
            return (
              <PostSnippet 
                key={index}
                id={article.id}
                title={article.title} 
                content={article.content.substring(1, 1000)} 
              />
            )
          })
        } */}
      </div>
    </div>
  );
}

export default Posts;