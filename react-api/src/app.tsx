import React, { ChangeEvent, ReactElement, useState } from 'react';
import Table from './table';



const App = (): ReactElement => {
  const [search, setSearch] = useState('');
  const [checkSubmit, setCheckSubmit] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState('popularity');
  const [error, setError] = useState({err: false, errMessage: ''});

  function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if(checkSubmit) setCheckSubmit(false);
    if(error.err) setError({err: false, errMessage: ''});
    if (/\w/.test(search)) {
      setLoading(true);
      fetch(`https://newsapi.org/v2/everything?q=${search}&sortBy=${sort}&apiKey=5ada2f2e485b4f11b600736fa619867c`)
        .then(resp => resp.json())
          .then(obj => {
            setLoading(false);
            setArticles(obj.articles);
          }).catch((e) => {
              setError({err: true, errMessage: e.message});
              setLoading(false);
          })
    } else setCheckSubmit(true);
  }
  return (
    <>
    <form className="form" onSubmit={handleSubmit}>
      {checkSubmit && <span className="error">Please, enter letters or digits!</span>}
      <div className="form__searchBar">
        <input type="text" className="searchBar__input" placeholder="Search" value={search} onChange={(e) => {setSearch(e.target.value)}}/>
        <input type="submit" className="searchBar__input searchBar__input_btn" value="Search" disabled={loading} />
      </div>
      {loading && <span className="error">Loading...</span>}
      <div className="form__sort">
        <button type="submit" className="btn-sort" disabled={loading} onClick={() => setSort('relevancy')}>Relevancy</button>
        <button type="submit" className="btn-sort" disabled={loading} onClick={() => setSort('popularity')}>Popularity</button>
        <button type="submit" className="btn-sort" disabled={loading} onClick={() => setSort('publishedAt')}>Published at</button>
      </div>
    </form>
    {error.err && <span className="error error_table">{error.errMessage}...</span>}
    {!error.err && <Table articles={articles} />}
    </>
  )
}

export default App;