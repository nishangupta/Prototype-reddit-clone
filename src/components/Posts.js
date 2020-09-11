import React from 'react'
import './Posts.css'
import Post from './Post'
import PostUploader from './PostUploader'

function Posts({ user, posts }) {
  return (
    <div className="posts">
      <div className="posts__leftRow">
        {user ? <PostUploader loggedUser={user} /> : null}

        {/* post */}
        {!user ? (
          <p style={{ color: 'grey', margin: '2rem 0' }}>
            Login to create post and comment.
          </p>
        ) : null}
        {posts?.map((post) => (
          <Post key={post.id} loggedUser={user} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Posts
