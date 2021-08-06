import React, { ReactElement, useState } from 'react';
import Form from './form';
import Card from './card';

const App = (): ReactElement => {
  const [cardsArray, setCardsArray] = useState([]);
  const cards = cardsArray.map((item) => <Card key={item} values={item}/>)

  return (
    <>
      <Form setCardsArray={setCardsArray} />
      <main className="main">
        { cards }
      </main>
    </>
  )
}

export default App;
