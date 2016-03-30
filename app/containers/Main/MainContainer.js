import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import 'sharedStyles/styles.css'
import { container, innerContainer } from './styles.css'
import { Navigation } from 'components'
import { checkIfAuthed } from 'helpers/auth'
import * as modalActionCreators from 'redux/modules/modal'

const MainContainer = React.createClass({
  propTypes: {
    closeModal: PropTypes.func.isRequired,
    isAuthed: PropTypes.bool.isRequired,
    isOpen: PropTypes.bool.isRequired,
    openModal: PropTypes.func.isRequired,
  },
  render () {
    return (
      <div className={container}>
        <Navigation
          closeModal={this.props.closeModal}
          isAuthed={this.props.isAuthed}
          isOpen={this.props.isOpen}
          openModal={this.props.openModal} />
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  },
})

export default connect(
  ({users, modal}) => ({isAuthed: users.isAuthed, isOpen: modal.isOpen}),
  (dispatch) => bindActionCreators(modalActionCreators, dispatch)
)(MainContainer)
