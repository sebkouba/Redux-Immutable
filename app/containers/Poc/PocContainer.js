import React, {PropTypes} from 'react'
import { Poc } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as pocActionCreators from 'redux/modules/poc'

const PocContainer = React.createClass({
  propTypes: {
    inputText: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired
  },

  render () {
    return (
      <Poc
        inputText={this.props.inputText}
        handleInputChange={this.props.handleInputChange}
      />
    )
  }
})

function mapStateToProps ({pocReducer}, props) {
  return {
    inputText: pocReducer.inputText
    // inputText: 'hello world'
    // handleInputChange -> goes into dispatch...?!?
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators({
    ...pocActionCreators
  }, dispatch)
}

// export default PocContainer
// since the Container has no lifecycle methods we can simply export Poc

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Poc)
