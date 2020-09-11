import React, { useState, useEffect } from 'react'
import './App.css'
import AppHeader from './components/AppHeader'
import Posts from './components/Posts'
import { db, auth } from './fb'

function App() {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const unsubs = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
    return () => unsubs()
  }, [user])

  useEffect(() => {
    let unsubs
    unsubs = db.collection('posts').onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
    })
    return () => {
      unsubs()
    }
  }, [posts])

  const appLogin = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message))
  }

  const appSignup = (username, email, password) => {
    auth.createUserWithEmailAndPassword(email, password).then(
      (authUser) => {
        authUser.user.updateProfile({
          displayName: username,
        })
      },
      (err) => alert(err.message)
    )
  }

  return (
    <div className="App">
      <AppHeader user={user} appLogin={appLogin} appSignup={appSignup} />
      <Posts user={user} posts={posts} />
    </div>
  )
}

export default App
