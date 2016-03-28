import React from 'react'
import { connect } from 'react-redux'
import 'sharedStyles/styles.css'
import { container, innerContainer } from './styles.css'
import { Navigation } from 'components'
import { checkIfAuthed } from 'helpers/auth'

const MainContainer = React.createClass({
  render () {
    return (
      <div className={container}>
        <Navigation isAuthed={this.props.isAuthed} />
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  },
})

export default connect(
  (state) => ({isAuthed: state.isAuthed})
)(MainContainer)
