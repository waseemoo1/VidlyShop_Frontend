import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav
      style={{ margin: 10 }}
      className="navbar navbar-expand-lg bg-light">
      <Link to={'/'} className="navbar-brand">Vidly</Link>
      <button
        className='navbar-toggler'
        type='button'
        aria-controls='navbarNavAltMarkup'
        aria-expanded="false"
        aria-label='Toggle navigarion'
      >
        <span className='navbar-toggler-icon' />
      </button>

      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink to={'/movies'} className="nav-item nav-link">
            Movies
          </NavLink>
          <NavLink to={'/customers'} className="nav-item nav-link">
            Customers
          </NavLink>
          <NavLink to={'/rentals'} className="nav-item nav-link">
            Rentals
          </NavLink>
        </div>
      </div>

    </nav>
  );
}

export default NavBar;