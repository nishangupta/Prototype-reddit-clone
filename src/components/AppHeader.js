import React from 'react'
import './AppHeader.css'
import IconButton from '@material-ui/core/IconButton'
import RedditIcon from '@material-ui/icons/Reddit'
import ForumIcon from '@material-ui/icons/Forum'
import PersonIcon from '@material-ui/icons/Person'

function AppHeader() {
  return (
    <header className="appheader">
      <IconButton>
        <RedditIcon fontSize="large" />
      </IconButton>
      <div>
        <IconButton>
          <PersonIcon className="header__icon" fontSize="large" />
        </IconButton>
        <IconButton>
          <ForumIcon className="header__icon" fontSize="large" />
        </IconButton>
      </div>
    </header>
  )
}

export default AppHeader
