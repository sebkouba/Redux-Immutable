import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Modal } from 'components'
import * as modalActionCreators from 'redux/modules/modal'
import * as ducksActionCreators from 'redux/modules/ducks'

function mapStateToProps ({modal, users, authedUser}, props) {
  const duckLength = modal.duck.length
  return {
    user: users[users.authedId] ? users[users.authedId].info : {},
    duck: modal.duck,
    isOpen: modal.isOpen,
    isSubmitDisabled: duckLength <= 0 || duckLength > 140,
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators({
    ...modalActionCreators,
    ...ducksActionCreators,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal)
