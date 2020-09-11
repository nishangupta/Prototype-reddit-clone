import React, { useState } from 'react'
import './AppHeader.css'
import IconButton from '@material-ui/core/IconButton'
import RedditIcon from '@material-ui/icons/Reddit'
// import ForumIcon from '@material-ui/icons/Forum'
// import PersonIcon from '@material-ui/icons/Person'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/modal'
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { auth } from '../fb'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'fixed',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #F50057',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

//AppheaderComponent starts here
function AppHeader({ appSignup, appLogin, user }) {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [signupModal, setSignupModal] = useState(false)
  const [loginModal, setLoginModal] = useState(false)

  //functions for modal
  const signup = () => {
    appSignup(username, email, password)
    setSignupModal(false)
  }
  const login = () => {
    appLogin(email, password)
    setLoginModal(false)
  }

  return (
    <header className="appheader">
      <Modal open={signupModal} onClose={() => setSignupModal(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <IconButton>
              <RedditIcon fontSize="large" color="secondary" />
            </IconButton>
            <p style={{ color: 'grey' }}>Use fake email and password</p>
            <br />
            <form className="appheader__signup">
              <Input
                placeholder="username"
                type="text"
                value={username}
                color="secondary"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder="email"
                type="text"
                value={email}
                color="secondary"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                value={password}
                color="secondary"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <Button variant="contained" color="secondary" onClick={signup}>
                Sign up
              </Button>
            </form>
          </center>
        </div>
      </Modal>
      <Modal open={loginModal} onClose={() => setLoginModal(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <RedditIcon fontSize="large" color="secondary" />

            <form className="appheader__signup">
              <Input
                placeholder="email"
                type="text"
                value={email}
                color="secondary"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                value={password}
                color="secondary"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <Button variant="contained" color="secondary" onClick={login}>
                Sign In
              </Button>
            </form>
          </center>
        </div>
      </Modal>

      <IconButton>
        <RedditIcon fontSize="large" color="secondary" />
      </IconButton>
      {/* 
      <IconButton>
        <ArrowBackIosIcon color="secondary" />
      </IconButton> */}

      {/* <div>
        <IconButton>
          <PersonIcon className="header__icon" fontSize="large" />
        </IconButton>
        <IconButton>
          <ForumIcon className="header__icon" fontSize="large" />
        </IconButton>
      </div> */}
      <div className="appheader__buttons">
        {user ? (
          <Button
            variant="outlined"
            color="secondary"
            onClick={(e) => auth.signOut()}
          >
            Logout
          </Button>
        ) : (
          <>
            <Button
              variant="outlined"
              color="secondary"
              onClick={(e) => setLoginModal(true)}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={(e) => setSignupModal(true)}
            >
              Signup
            </Button>
          </>
        )}
      </div>
    </header>
  )
}

export default AppHeader
