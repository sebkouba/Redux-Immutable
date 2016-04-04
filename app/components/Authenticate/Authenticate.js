import React, { PropTypes } from 'react'
import { centeredContainer, pageHeader } from 'sharedStyles/styles.css'
import { FacebookAuthButton } from 'components'

export default function Authenticate ({onAuth, isFetching, error}) {
  return (
    <div className={centeredContainer}>
      <h1 className={pageHeader}>{'Authenticate'}</h1>
      <FacebookAuthButton isFetching={isFetching} onAuth={onAuth} />
      {error ? <p>{error}</p> : null}
    </div>
  )
}

Authenticate.propTypes = {
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
}
