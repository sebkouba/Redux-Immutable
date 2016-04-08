import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Modal } from 'components'
import * as modalActionCreators from 'redux/modules/modal'
import * as ducksActionCreators from 'redux/modules/ducks'

function mapStateToProps ({modal, users, authedUser}, props) {
  const duckText = modal.get('duckText')
  return {
    user: users.getIn([users.get('authedId'), 'info']),
    duckText,
    isOpen: modal.get('isOpen'),
    isSubmitDisabled: duckText.length <= 0 || duckText.length > 140,
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
