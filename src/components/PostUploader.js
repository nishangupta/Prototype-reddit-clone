import React, { useState } from 'react'
import './PostUploader.css'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import LinearProgress from '@material-ui/core/LinearProgress'
import firebase, { db, auth, storage } from '../fb'

function PostUploader({ loggedUser }) {
  const [progress, setProgress] = useState(0)
  const [caption, setCaption] = useState('')
  const [file, setFile] = useState(null)

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${file.name}`).put(file)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        let progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progress)
      },
      (err) => console.log(err),
      () => {
        storage
          .ref('images')
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            db.collection('posts').add({
              caption,
              imageUrl: url,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              username: auth.currentUser.displayName,
            })
          })
          .then(() => {
            setProgress(0)
            setFile(null)
            setCaption('')
          })
      }
    )
  }

  return (
    <div className="posts__createPost">
      <Card>
        <CardHeader
          avatar={<Avatar>{loggedUser?.displayName?.substr(0, 1)}</Avatar>}
          title={loggedUser.displayName}
        />

        <div className="posts__form">
          <TextField
            variant="outlined"
            placeholder="Title"
            className="posts__caption"
            color="secondary"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <LinearProgress
            variant="determinate"
            color="secondary"
            value={progress}
          />
          <input
            type="file"
            className="posts__fileInput"
            onChange={handleFile}
          />{' '}
          <br /> <br />
          <Button variant="contained" color="secondary" onClick={handleUpload}>
            Post
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default PostUploader
