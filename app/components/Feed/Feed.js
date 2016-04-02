import React, { PropTypes } from 'react'
import { newDuckContainer, header } from './styles.css'
import { Duck } from 'components/shared'

function NewDucksAvailable ({handleClick}) {
  return (
    <div className={newDuckContainer} onClick={handleClick}>
      New Ducks Available
    </div>
  )
}

export default function Feed ({ducks, error, isFetching, newDucksAvailable, resetNewDucksAvailable}) {
  return isFetching === true
    ? <h1 className={header}> Fetching </h1>
    : <div>
        {newDucksAvailable ? <NewDucksAvailable handleClick={resetNewDucksAvailable} /> : null}
        {ducks.length === 0 ? <p className={header}>This is unfortunate. <br /> It appears there are no ducks yet 😞</p> : null}
        {ducks.map((duck) => (
          <Duck
            duck={duck}
            handleClick={() => ({})}
            handleReply={() => ({})}
            handleStar={() => ({})}
            key={duck.uid + duck.timestamp}/>
        ))}
      </div>
}

Feed.propTypes = {
  ducks: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  newDucksAvailable: PropTypes.bool.isRequired,
  resetNewDucksAvailable: PropTypes.func.isRequired,
}