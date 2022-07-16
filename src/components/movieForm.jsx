import React, { Component } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MovieForm = () => {
  const param = useParams();
  const history = useNavigate();

  return (
    <div className='container'>
      <h2>MovieForm From {param.id}</h2>
      <button
        className='btn btn-primary'
        onClick={() => history('/movies')}
      >
        Save
      </button>
    </div>

  );
}

export default MovieForm;