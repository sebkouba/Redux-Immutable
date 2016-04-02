import React, { PropTypes } from 'react'
import { centeredContainer, pageHeader } from 'sharedStyles/styles.css'
import { FacebookAuthButton } from 'components'

export default function Authenticate ({onAuth, isFetching, error, user}) {
  return (
    <div className={centeredContainer}>
      <h1 className={pageHeader}>Authenticate</h1>
      {error ? <p>{`Error! ${error}`}</p> : null}
      <FacebookAuthButton onAuth={onAuth} isFetching={isFetching} />
    </div>
  )
}

Authenticate.propTypes = {
  onAuth: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string,
  user: PropTypes.shape({
    lastUpdate: PropTypes.number,
    info: PropTypes.shape({
      name: PropTypes.string,
      uid: PropTypes.string,
      avatar: PropTypes.string,
    })
  })
}