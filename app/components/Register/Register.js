import React, { PropTypes } from 'react'
import { centeredContainer, pageHeader } from 'sharedStyles/styles.css'
import { FacebookAuthButton } from 'components/shared'

export default function Register (props) {
  return (
    <div className={centeredContainer}>
      <h1 className={pageHeader}>Register</h1>
      <FacebookAuthButton />
    </div>
  )
}
