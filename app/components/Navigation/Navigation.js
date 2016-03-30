import React, { PropTypes } from 'react'
import { container, navContainer, link, darkBtn } from './styles.css'
import { Link } from 'react-router'
import Modal from 'react-modal'

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

function ActionLinks ({isAuthed, closeModal, openModal, isOpen}) {
  return isAuthed === true
    ? <ul>
        <li>
          <span className={darkBtn}>
            <span onClick={openModal}>Duck</span>
            <Modal style={{color: 'red'}} isOpen={isOpen} onRequestClose={closeModal}>Duck</Modal>
          </span>
        </li>
        <li><Link to='/logout' className={link}>Logout</Link></li>
      </ul>
    : <ul>
        <li><Link to='/' className={link}>Home</Link></li>
        <li><Link to='/auth' className={link}>Authenticate</Link></li>
      </ul>
}

export default function Navigation (props) {
  return (
    <div className={container}>
      <nav className={navContainer}>
        <NavLinks isAuthed={props.isAuthed} />
        <ActionLinks {...props} />
      </nav>
    </div>
  )
}

Navigation.PropTypes = {
  isAuthed: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
}
