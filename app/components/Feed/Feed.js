import React, { PropTypes } from 'react'
import { newDuckContainer, header } from './styles.css'
import { DuckContainer } from 'containers'

NewDucksAvailable.propTypes = {
  handleClick: PropTypes.func.isRequired,
}

function NewDucksAvailable ({handleClick}) {
  return (
    <div className={newDuckContainer} onClick={handleClick}>
      New Ducks Available
    </div>
  )
}

Feed.propTypes = {
  ducks: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  newDucksAvailable: PropTypes.bool.isRequired,
  resetNewDucksAvailable: PropTypes.func.isRequired,
}

export default function Feed (props) {
  return props.isFetching === true
    ? <h1 className={header}> Fetching </h1>
    : <div>
        {props.newDucksAvailable ? <NewDucksAvailable handleClick={props.resetNewDucksAvailable} /> : null}
        {props.ducks.length === 0
            ? <p className={header}>This is unfortunate. <br /> It appears there are no ducks yet 😞</p>
            : null}
        {props.ducks.map((duck) => (
          <DuckContainer
            duckId={duck.duckId}
            key={duck.duckId}
            handleClick={(e) => props.goToDuckPath(duck, e)} />
        ))}
      </div>
}
