import React from 'react';

const NavBar = ({ onNavBarClick, navStates }) => (
    <ul className='navbar'>
      {
        navStates.map((name, index) => (
          <li key={`ul${index}`} >
            <input
              type="button"
              className='button'
              onClick={ onNavBarClick }
              value={name.toUpperCase()}
            />
          </li>
        ))
      }
    </ul>

);

export default NavBar;


// <a className='button' href="#">{name}</a>