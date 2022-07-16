import React from 'react'
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark" aria-label="Third navbar example">
      <div class="container-fluid">
        <Link to={'/'} className="navbar-brand">Vidly</Link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarsExample03">
          <ul class="navbar-nav me-auto mb-2 mb-sm-0">

            <li class="nav-item">
              <NavLink to={'/movies'} className="nav-link" aria-current="page">
                Movies
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink to={'/customers'} className="nav-link">
                Customers
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink to={'/rentals'} className="nav-link">
                Rentals
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;