import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';

class Movies extends Component {

  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>
    return (
      <React.Fragment>
        <p>Showing {count} movies in the database</p>
        {this.table()}
        <Pagination
          itemCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
          onNextClick={this.handleNextClick}
          onPervClick={this.handlePrevClick}
        />
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

    const { pageSize, currentPage, movies: allMovies } = this.state;

    const movies = paginate(allMovies, currentPage, pageSize);

    return movies.map(movie =>
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

  handlePageChange = (pageNum) => {
    this.setState({ currentPage: pageNum });
  }

  handleNextClick = () => {
    this.setState({ currentPage: this.state.currentPage + 1 })
  }

  handlePrevClick = () => {
    this.setState({ currentPage: this.state.currentPage - 1 })
  }
}


export default Movies;