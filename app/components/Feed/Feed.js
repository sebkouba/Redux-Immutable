import React, { PropTypes } from 'react'

export default function Feed (props) {
  return (
    <div>FEED</div>
  )
}

Feed.propTypes = {
  newDucksAvailable: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  ducks: PropTypes.array.isRequired,
}