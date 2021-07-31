import React, { ReactElement } from 'react';
import cards from './cards';
import Card from './card';

const SearchBar = () => {
  return (
    <div className="searchBar">
      <input type="text" className="searchBar__input" placeholder="Search"></input>
    </div>
  )
}
const Main = () => {
  const cardsArray = cards[1].map((item, index) => {
    return(
    <Card key={item.word + index} image={item.image} word={item.word} translation={item.translation}/>
    )
  })
  console.log(cardsArray)
  return (
    <div className="main">
      { cardsArray }
    </div>
  )
}
const App = (): ReactElement => {
  return (
    <div>
      <SearchBar />
      <Main /> 
    </div>
  )
}
export default App;
