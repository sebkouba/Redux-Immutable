import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import 'sharedStyles/styles.css'
import { container, innerContainer } from './styles.css'
import { Navigation } from 'components'
import { checkIfAuthed } from 'helpers/auth'
import * as modalActionCreators from 'redux/modules/modal'
import * as ducksActionCreators from 'redux/modules/ducks'

const MainContainer = React.createClass({
  propTypes: {
    authedUser: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
    duck: PropTypes.string.isRequired,
    duckFanout: PropTypes.func.isRequired,
    isAuthed: PropTypes.bool.isRequired,
    isOpen: PropTypes.bool.isRequired,
    openModal: PropTypes.func.isRequired,
    updateDuck: PropTypes.func.isRequired,
  },
  formatDuck (text) {
    const { name, uid, avatar } = this.props.authedUser
    return {
      avatar,
      name,
      uid,
      text,
      numberOfLikes: 0,
      numberOfReplies: 0,
      timestamp: Date.now()
    }
  },
  submitDuck () {
    this.props.duckFanout(this.formatDuck(this.props.duck))
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
    authedUser: users[users.authedId].info,
    duck: modal.duck,
    isAuthed: users.isAuthed,
    isOpen: modal.isOpen,
  }),
  (dispatch) => bindActionCreators({...modalActionCreators, ...ducksActionCreators}, dispatch)
)(MainContainer)
