import React, { PropTypes } from 'react'
import {
  newDuckTop, pointer, newDuckInputContainer,
  newDuckInput, submitDuckBtn, darkBtn } from './styles.css'
import { default as ReactModal } from 'react-modal'
import { formatDuck } from 'helpers/utils'

const modalStyles = {
  content: {
    width: 350,
    margin: '0px auto',
    height: 220,
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0,
  },
}

const { object, string, func, bool } = PropTypes
Modal.propTypes = {
  duck: string.isRequired,
  closeModal: func.isRequired,
  isOpen: bool.isRequired,
  isSubmitDisabled: bool.isRequired,
  openModal: func.isRequired,
  updateDuck: func.isRequired,
  user: object.isRequired,
}

export default function Modal (props) {
  function submitDuck () {
    return props.duckFanout(formatDuck(props.duck, props.user))
  }

  return (
    <span className={darkBtn} onClick={props.openModal}>
      {'Duck'}
      <ReactModal style={modalStyles} isOpen={props.isOpen} onRequestClose={props.closeModal}>
        <div className={newDuckTop}>
          <span>{'Compose new Duck'}</span>
          <span onClick={props.closeModal} className={pointer}>{'&#10006;'}</span>
        </div>
        <div className={newDuckInputContainer}>
          <textarea
            onChange={(e) => props.updateDuck(e.target.value)}
            value={props.duck}
            maxLength={140}
            type='text'
            className={newDuckInput}
            placeholder="What's on your mind?" />
        </div>
        <button
          className={submitDuckBtn}
          disabled={props.isSubmitDisabled}
          onClick={submitDuck}>
            {'Duck'}
        </button>
      </ReactModal>
    </span>
  )
}
