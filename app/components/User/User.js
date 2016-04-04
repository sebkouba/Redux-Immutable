import React, { PropTypes } from 'react'
import { DuckContainer } from 'containers'
import { userContainer, avatar, header } from './styles.css'

User.propTypes = {
  name: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  ducksData: PropTypes.shape({
    lastUpdated: PropTypes.number.isRequired,
    ducks: PropTypes.array.isRequired,
  }).isRequired,
  goToDuckPath: PropTypes.func.isRequired,
}

export default function User (props) {
  return (
    <div>
      {props.isFetching === true
        ? <p className={header}>Loading</p>
        : <div>
            <div className={userContainer}>
              <div>{props.name}</div>
            </div>
            {props.ducksData.ducks.map((duck) => (
              <DuckContainer
                duckId={duck.duckId}
                key={duck.duckId}
                handleClick={(e) => props.goToDuckPath(duck, e)} />
            ))}
            {props.ducksData.ducks.length === 0
              ? <p className={header}>
                  {`It looks like ${props.name.split(' ')[0]} hasn't made any ducks yet.`}
                </p>
              : null}
          </div>}
      {props.error ? <p>{props.error}</p> : null}
    </div>
  )
}