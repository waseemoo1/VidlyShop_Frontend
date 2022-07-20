import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/pagination';
import { paginateFunc } from '../utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox';
import _, { curry } from 'lodash'

class Movies extends Component {

  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    sortColumn: { path: 'title', order: 'asc' },
    searchQuery: ''
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
    } = this.state;

    const filtered = this.chooseFilterFunc()(allMovies);
    const sorted = this.orderFunc()(filtered);
    const movies = paginateFunc(currentPage, pageSize)(sorted);

    return { totalCount: filtered.length, data: movies }
  }

  merge = (f1, f2, f3) => (data) => f3(f2(f1(data)))

  chooseFilterFunc = () => {
    const { selectedGenre, searchQuery } = this.state;

    if (searchQuery) return (allMovies) => allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
    if (selectedGenre && selectedGenre._id) return (allMovies) => allMovies.filter(m => m.genre._id === selectedGenre._id);

    return (allMovies) => allMovies;

  }

  orderFunc = () => {
    const { sortColumn } = this.state;
    return (data) => _.orderBy(data, [sortColumn.path], [sortColumn.order])
  }

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1, selectedGenre: null });
  }

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      genres,
      sortColumn,
      searchQuery
    } = this.state;



    if (count === 0) return <p>There are no movies in the database.</p>

    const { totalCount, data: movies } = this.getPagedData();

    return (

      <div style={{ margin: 5 }} className='row m-5'>
        <div className='col-3 mx-auto'>
          <ListGroup
            items={genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className='col'>
          <Link
            className="btn btn-primary"
            to={'/movies/new'}
            role="button"
            style={{ marginBottom: 20 }}
          >New Movie
          </Link>
          <p>Showing {totalCount} movies in the database</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
        <div className='col-2'>
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
    deleteMovie(movie._id);
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
    this.setState({ currentPage: 1, selectedGenre: genre, searchQuery: '' });
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn })
  }
}


export default Movies;