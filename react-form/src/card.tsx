import React from 'react';

interface CardInterface {
  name: string,
  surname: string,
  birth: Date,
  country: string,
  agree: boolean,
  zip: string,
  delivery: Date,
  gender: string,
  notifications: boolean
};
function Card({values}: {values: CardInterface}) {
  const { name, surname, birth, country, agree, zip, delivery, gender, notifications} = values;
  return (
    <div className="card" >
      <span>name: {name}</span>
      <span>surname: {surname}</span> 
      <span>birthday: {birth}</span>
      <span>country: {country}</span>
      <span>zip code: {zip}</span>
      <span>delivery: {delivery}</span>
      <span>gender: {gender}</span>
      <span>notifications: {notifications}</span>
      <span>agree: {String(agree)}</span>
    </div>
  )
}

export default Card;