import React from 'react'
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav style={{ margin: 0, padding: 5 }} className="navbar navbar-expand-sm navbar-dark bg-dark" aria-label="Third navbar example">
      <div className="container-fluid">
        <Link to={'/'} className="navbar-brand">Vidly</Link>

        <div className="collapse navbar-collapse" id="navbarsExample03">
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            <li className="nav-item">
              <NavLink to={'/movies'} className="nav-link" aria-current="page">
                Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/customers'} className="nav-link">
                Customers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/rentals'} className="nav-link">
                Rentals
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/login'} className="nav-link">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/register'} className="nav-link">
                Register
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;