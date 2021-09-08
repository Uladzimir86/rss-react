import React, { ReactElement } from 'react';
import cards from './cards';
import Card from './card';

const SearchBar = () => (
  <div className="searchBar">
    <input type="text" className="searchBar__input" placeholder="Search" />
  </div>
);
const Main = () => {
  const cardsArray = cards[1].map((item) => (
    <Card
      key={item.word}
      image={item.image}
      word={item.word}
      translation={item.translation}
    />
  ));
  return <div className="main">{cardsArray}</div>;
};
const App = (): ReactElement => (
  <div>
    <SearchBar />
    <Main />
  </div>
);
export default App;
