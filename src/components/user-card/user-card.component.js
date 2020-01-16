import React from 'react';
import PropTypes from 'prop-types';
import './user-card.component.scss';

const UserCard = ({ user }) => (
  <div className="user-card">
    <img alt={`${user.getFullName()}`} src={user.photo}></img>
    <div className="user-card__information">
      <strong> {user.getFullName()} </strong>
      <p className="util-ellipsis" title={user.gender}> {user.gender} </p>
      <p className="util-ellipsis" title={user.region}> {user.region} </p>
      <p className="util-ellipsis" title={user.phone}> {user.phone} </p>
      <p className="util-ellipsis" title={user.email}> {user.email} </p>
      <p className="sensitive"> Password: {user.password} </p>
    </div>
  </div>

);

UserCard.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserCard;
