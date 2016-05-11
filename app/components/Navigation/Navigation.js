import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { container, navContainer, link } from './styles.css'


export default function Navigation () {
  return (
    <nav className='navbar navbar-default'>
      <div className='container-fluid'>
        <div className='navbar-header'>
          <Link className='navbar-brand' to='/'>PBT</Link>
        </div>

        <div className='navbar-collapse' id='bs-example-navbar-collapse-1'>
          <ul className='nav navbar-nav'>
            <li><Link to='/entry'>+ Entry</Link></li>
            <li><Link to='/recordpb'>Record PB</Link></li>
            <li><Link to='/bodyweight'>BodyWt</Link></li>
            <li><Link to='/recordmeasurements'>MSR</Link></li>
            <li><Link to='/savepics'>Pics</Link></li>
            <li><Link to='/poc'>Poc</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

// Navigation.propTypes = ActionLinks.propTypes = NavLinks.propTypes = {
//   isAuthed: PropTypes.bool.isRequired
// }
//
// function NavLinks ({isAuthed}) {
//   return isAuthed === true
//     ? <ul>
//         <li><Link to='/' className={link}>{'Home'}</Link></li>
//       </ul>
//     : <noscript />
// }
//
// function ActionLinks ({isAuthed}) {
//   return isAuthed === true
//     ? <ul>
//         <li>NEW DUCK</li>
//         <li><Link to='/logout' className={link}>{'Logout'}</Link></li>
//       </ul>
//     : <ul>
//         <li><Link to='/' className={link}>{'Home'}</Link></li>
//         <li><Link to='/auth' className={link}>{'Authenticate'}</Link></li>
//       </ul>
// }
//
// export default function Navigation ({isAuthed}) {
//   return (
//     <div className={container}>
//       <nav className={navContainer}>
//         <NavLinks isAuthed={isAuthed} />
//         <ActionLinks isAuthed={isAuthed} />
//       </nav>
//     </div>
//   )
// }
