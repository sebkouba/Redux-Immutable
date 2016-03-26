import React from 'react'
import 'globalStyles/styles.css'

const MainContainer = React.createClass({
  render () {
    return (
      <div>
        {/*<Navigation isAuthed={true or false} />*/}
        {this.props.children}
      </div>
    )
  },
})

export default MainContainer
