import React, { ReactElement, useState } from 'react';
import Form from './form';
import Card from './card';

// const set = new Set();
// function setId(id) {
//   let value: number;
//   if (set.has(id)) {
//     value = id;
//   }
//   else {
//     value = set.size + 1;
//     set.add(value);
//   }
//   return value;
// }

const App = (): ReactElement => {
  const [cardsArray, setCardsArray] = useState([]);
  const cards = cardsArray.map((item) => <Card key={item.id} values={item}/>)

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
