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
    duck: PropTypes.string.isRequired,
    isAuthed: PropTypes.bool.isRequired,
    isOpen: PropTypes.bool.isRequired,
    openModal: PropTypes.func.isRequired,
    updateDuck: PropTypes.func.isRequired,
  },
  submitDuck () {
    console.log(this.props.duck)
  },
  render () {
    return (
      <div className={container}>
        <Navigation
          closeModal={this.props.closeModal}
          duck={this.props.duck}
          isAuthed={this.props.isAuthed}
          isOpen={this.props.isOpen}
          isSubmitDisabled={this.props.duck.length <= 0 || this.props.duck.length > 140}
          openModal={this.props.openModal}
          submitDuck={this.submitDuck}
          updateDuck={this.props.updateDuck} />
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  },
})

export default connect(
  ({users, modal}) => ({
    duck: modal.duck,
    isAuthed: users.isAuthed,
    isOpen: modal.isOpen,
  }),
  (dispatch) => bindActionCreators(modalActionCreators, dispatch)
)(MainContainer)
