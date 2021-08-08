import React, { useState, ReactElement } from 'react';
import Table from './table';



const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [checkSubmit, setCheckSubmit] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if(checkSubmit) setCheckSubmit(false)
    if (/\w/.test(search)) {
      setLoading(true);
      fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=5ada2f2e485b4f11b600736fa619867c`)
        .then(resp => resp.json())
        .then(obj => {
          setLoading(false);
          setArticles(obj.articles);
        })
    } else setCheckSubmit(true);
  }
  return (
    <>
    <form className="searchBar" onSubmit={handleSubmit}>
      {checkSubmit && <span className="error">Please, enter letters or digits!</span>}
      <input type="text" className="searchBar__input" placeholder="Search" value={search} onChange={(e) => {setSearch(e.target.value)}}/>
      <input type="submit" className="searchBar__input searchBar__input_btn" value="Search"  />
      {loading && <span className="error">Loading...</span>}
    </form>
    <Table articles={articles} />
    </>
  )
}
// const Btn = () => {

// }
// const Main = () => {
//   const cardsArray = cards[1].map((item) => (
//     <Card key={item.word} image={item.image} word={item.word} translation={item.translation}/>
//     ))
//   return (
//     <div className="main">
//       { cardsArray }
//     </div>
//   )
// }
const App = (): ReactElement => (
    <div>
      <SearchBar />
    </div>
  )
export default App;