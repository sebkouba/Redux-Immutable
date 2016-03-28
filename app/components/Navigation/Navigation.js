import React, { PropTypes } from 'react'
import { container, navContainer, link, darkBtn } from './styles.css'
import { Link } from 'react-router'

function NavLinks ({isAuthed}) {
  return isAuthed === true
    ? (
        <ul>
          <li><Link to='/' className={link}>Home</Link></li>
          <li><Link to='/' className={link}>Notifications</Link></li>
          <li><Link to='/' className={link}>Discover</Link></li>
        </ul>
      )
    : <noscript />
}

function ActionLinks ({isAuthed}) {
  return isAuthed === true
    ? <ul>
        <li><Link to='/' className={darkBtn}>Duck</Link></li>
        <li><Link to='/logout' className={link}>Logout</Link></li>
      </ul>
    : <ul>
        <li><Link to='/' className={link}>Home</Link></li>
        <li><Link to='/auth' className={link}>Authenticate</Link></li>
      </ul>
}

export default function Navigation ({isAuthed}) {
  return (
    <div className={container}>
      <nav className={navContainer}>
        <NavLinks isAuthed={isAuthed}/>
        <ActionLinks isAuthed={isAuthed}/>
      </nav>
    </div>
  )
}

Navigation.PropTypes = {
  isAuthed: PropTypes.bool.isRequired,
}
