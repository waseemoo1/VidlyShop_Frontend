import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Movies from './components/movies';
import NavBar from './components/navBar';
import Customers from './components/customers'
import Rentals from './components/Rentals'
import NotFound from './components/notFound';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import './App.css';

function App() {
  return (
    <div style={{ padding: 0, margin: 0 }}>
      <NavBar />
      <Routes>
        <Route path='/' element={<Navigate to={'/movies'} />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/movies/:id' element={<MovieForm />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/customers' element={<Customers />} />
        <Route path='/rentals' element={<Rentals />} />
        <Route path='/not-found' element={<NotFound />} />
        <Route path='/*' element={<Navigate to={'not-found'} />} />
      </Routes>
    </div>
  );
}

export default App;
