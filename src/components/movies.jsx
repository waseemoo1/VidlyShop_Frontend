import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';

class Movies extends Component {
  state = {
    movies: getMovies(),
  }

  render() {
    const { length: count } = this.state.movies;

    if (count === 0) return <p>There are no movies in the database.</p>
    return (
      <React.Fragment>
        <p>Showing {count} movies in the database</p>
        {this.table()}
      </React.Fragment>
    );
  }

  table = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.renderMovies()}
        </tbody>
      </table>
    )
  }

  checkMovieExistence() {
    if (this.state.movies.length === 0) {
      return (<h2 style={{ paddingTop: 40, }}>No movie available</h2>)
    } else {
      return (<h2 style={{ paddingTop: 40, }}>Showing {this.state.movies.length} movies</h2>)
    }
  }

  renderMovies = () => {
    return this.state.movies.map(movie =>
      <tr key={movie._id}>
        <td>{movie.title}</td>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td><Like liked={movie.liked} onClick={() => { this.handleLike(movie) }} /></td>
        <td>
          <button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm" key={movie._id}>
            Delete
          </button>
        </td>

      </tr>
    )
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter(m => m._id !== movie._id)
    this.setState({ movies })
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  }
}


export default Movies;