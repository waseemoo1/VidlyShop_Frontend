import React from 'react'

const Like = (props) => {
  return (<i
    className={typeOfLike(props)}
    style={{ cursor: 'pointer' }}
    aria-hidden='true'
    onClick={props.onClick}
  >
  </i>);
}

const typeOfLike = (props) => {
  let classes = 'fa fa-heart';
  if (!props.liked) classes += '-o'

  return classes;
}

// <i className="fa fa-heart-o" aria-hidden="true"></i>
// <i class="fa fa-heart" aria-hi dden="true"></i>

export default Like;