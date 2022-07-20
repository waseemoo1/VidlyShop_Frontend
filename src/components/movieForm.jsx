import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Form from './common/form';
import Joi from 'joi';
import { getMovie, saveMovie } from './../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

// const MovieForm = () => {

//   const param = useParams();
//   const history = useNavigate();

//   return (
//     <div className='container'>
//       <h2>MovieForm From {param.id}</h2>
//       <button
//         className='btn btn-primary'
//         onClick={() => history('/movies')}
//       >
//         Save
//       </button>
//     </div>

//   );

// }

class MovieFormClass extends Form {

  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      rate: ''
    },
    genres: [],
    errors: {}
  }

  schema = Joi.object({
    _id: Joi.string(),
    title: Joi.string().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().min(0).max(100).required().label('Number in Stock'),
    rate: Joi.number().min(0).max(10).required().label('Daily Rental Rate')
  });

  componentDidMount() {
    const { navigate } = this.props;


    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.params.id
    if (movieId === 'new') return;

    const movie = getMovie(movieId);

    if (!movie) {
      return setTimeout(() => navigate('/not-found', { replace: true }));
    }

    this.setState({ data: this.mapToViewModel(movie) })
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      rate: movie.dailyRentalRate
    }
  }

  doSubmit() {
    const { params, navigate } = this.props;
    const { title, genreId, numberInStock, rate } = this.state.data;

    const newMovie = {
      title,
      genreId,
      numberInStock,
      dailyRentalRate: rate
    }

    if (params.id !== 'new') {
      newMovie._id = params.id;
    }

    saveMovie(newMovie);
    navigate('/movies');
  }

  render() {
    return (
      <div style={{ width: '500px', marginTop: 50 }} className='mx-auto container'>
        <h1>New Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number in Stock')}
          {this.renderInput('rate', 'Rate')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }

}

// Wrap and export
function MovieForm(props) {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  return <MovieFormClass {...props} navigate={navigate} params={params} data={location.state} />;

}


export default MovieForm;