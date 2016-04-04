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

export default function Feed (props) {
  return props.isFetching === true
    ? <h1 className={header}> Fetching </h1>
    : <div>
        {props.newDucksAvailable ? <NewDucksAvailable handleClick={props.resetNewDucksAvailable} /> : null}
        {props.ducks.length === 0 ? <p className={header}>This is unfortunate. <br /> It appears there are no ducks yet 😞</p> : null}
        {props.ducks.map((duck) => (
          <Duck
            duck={duck}
            handleClick={(e) => props.goToDuckPath(duck, e)}
            goToProfile={(e) => props.goToProfile(duck.uid, e)}
            favorite={(e) => props.addAndHandleLike(duck.duckId, e)}
            key={duck.duckId}
            isLiked={props.likes[duck.duckId] === true}
            unfavorite={(e) => props.handleDeleteLike(duck.duckId, e)}/>
        ))}
      </div>
}

Feed.propTypes = {
  addAndHandleLike: PropTypes.func.isRequired,
  ducks: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  handleDeleteLike: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  likes: PropTypes.object.isRequired,
  newDucksAvailable: PropTypes.bool.isRequired,
  resetNewDucksAvailable: PropTypes.func.isRequired,
  setUsersLikes: PropTypes.func.isRequired,
}
