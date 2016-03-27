import React, { PropTypes } from 'react'
import { centeredContainer, pageHeader } from 'sharedStyles/styles.css'
import { FacebookAuthButton } from 'components/shared'

export default function Authenticate (props) {
  return (
    <div className={centeredContainer}>
      <h1 className={pageHeader}>Authenticate</h1>
      <FacebookAuthButton />
    </div>
  )
}
