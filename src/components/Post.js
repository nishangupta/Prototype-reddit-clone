import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import './Post.css'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import { makeStyles } from '@material-ui/core/styles'
import AddCommentIcon from '@material-ui/icons/AddComment'
import { Input, Typography, CardContent, Button } from '@material-ui/core'
import firebase, { db } from '../fb'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: 'lightblue',
  },
  username: {
    fontWeight: 'bold',
  },
  comment: {
    color: 'grey',
    paddingLeft: '5px',
  },
  cardImage: {
    width: '100%',
    objectFit: 'contain',
  },
}))
function Post({ loggedUser, post }) {
  const classes = useStyles()
  const currentPost = post.post

  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

  useEffect(() => {
    let unsubs
    unsubs = db
      .collection('posts')
      .doc(post.id)
      .collection('comments')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()))
      })
    return () => {
      unsubs()
    }
  }, [post.id])

  const addComment = (e) => {
    e.preventDefault()
    if (comment.trim() === '') return
    db.collection('posts')
      .doc(post.id)
      .collection('comments')
      .add({
        text: comment,
        username: loggedUser.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(
        () => {
          setComment('')
        },
        (err) => console.log(err.message)
      )
  }

  return (
    <div className="post">
      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar className={classes.avatar}>R</Avatar>}
          title={currentPost.username}
          subheader="September 14, 2016"
        />

        <CardContent>
          <img
            className={classes.cardImage}
            src={currentPost.imageUrl}
            alt=""
          />
          <Typography variant="body1" color="textSecondary" component="p">
            {currentPost.caption}
          </Typography>
        </CardContent>
        {loggedUser ? (
          <>
            <div className="post__cardCommentInput">
              <Input
                type="text"
                placeholder="Comments.."
                className="commentInput"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button onClick={addComment}>
                <AddCommentIcon />
              </Button>
            </div>

            <div className="post__commentBox">
              {comments?.map((c) => (
                <div className="post__comment" key={c.text}>
                  <p className={classes.userame}>{c.username} :- </p>
                  <p className={classes.comment}>{c.text}</p>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </Card>
    </div>
  )
}

export default Post
