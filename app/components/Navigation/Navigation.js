import React, { PropTypes } from 'react'
import { container, navContainer, link, darkBtn, newDuckTop, newDuckInputContainer, newDuckInput, submitDuckBtn } from './styles.css'
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

const modalStyles = {
  content: {
    width: 350,
    margin: '0px auto',
    height: 220,
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0,
  }
}

function ActionLinks ({isAuthed, closeModal, openModal, isOpen}) {
  return isAuthed === true
    ? <ul>
        <li>
          <span className={darkBtn} onClick={openModal}>
            Duck
            <Modal style={modalStyles} isOpen={isOpen} onRequestClose={closeModal}>
              <div className={newDuckTop}>
                <span>Compose new Duck</span>
                <span onClick={closeModal} style={{cursor: 'pointer'}}>&#10006;</span>
              </div>
              <div className={newDuckInputContainer}>
                <textarea
                  maxLength={140} type='text'
                  className={newDuckInput}
                  placeholder="What's on your mind?" />
              </div>
              <button className={submitDuckBtn}>Duck</button>
            </Modal>
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

Navigation.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
}
