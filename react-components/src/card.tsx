import React, { ReactElement } from 'react';

const Card = ({key, image, word, translation}: {key: string, image: string, word: string, translation: string}): ReactElement => (
    <div className="card" key={key}>
      <div className="card__foto-container">
        <img src={`./${image}`} alt={word}  className="card__foto"/>
      </div>
      <div className="card__word_en">{word}</div>
      <div className="card__word_ru">{translation}</div>
    </div>
  )

export default Card;
