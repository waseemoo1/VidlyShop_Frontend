import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import _ from 'lodash'

class Movies extends Component {

  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: 'title', order: 'asc' },
  };

  componentDidMount() {
    const genres = [{ _id: '', name: 'All Genre' }, ...getGenres()]
    this.setState({ movies: getMovies(), genres })
  }

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn
    } = this.state;

    const filtered = selectedGenre && selectedGenre._id
      ? allMovies.filter(m => m.genre._id === selectedGenre._id)
      : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies }
  }

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      genres,
      sortColumn
    } = this.state;



    if (count === 0) return <p>There are no movies in the database.</p>

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div style={{ margin: 5 }} className='row'>
        <div className='col-2'>
          <ListGroup
            items={genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className='col'>
          <p>Showing {totalCount} movies in the database</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
            onNextClick={this.handleNextClick}
            onPervClick={this.handlePrevClick}
          />
        </div>

      </div>
    );
  }

  checkMovieExistence() {
    if (this.state.movies.length === 0) {
      return (<h2 style={{ paddingTop: 40, }}>No movie available</h2>)
    } else {
      return (<h2 style={{ paddingTop: 40, }}>Showing {this.state.movies.length} movies</h2>)
    }
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

  handleGenreSelect = (genre) => {
    this.setState({ currentPage: 1, selectedGenre: genre });
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn })
  }
}


export default Movies;