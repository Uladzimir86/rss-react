import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import Table from './table';


const App = (): ReactElement => {
  const [search, setSearch] = useState('');
  const [checkSubmit, setCheckSubmit] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState('popularity');
  const [error, setError] = useState({err: false, errMessage: ''});
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [totalResults, setTotalResults] = useState('1');
  const [pageNumber, setPageNumber] = useState('1');

  console.log(checkSubmit)

  function handleSubmit(event?: ChangeEvent<HTMLFormElement>) {
    if (event) event.preventDefault();
    if(checkSubmit) setCheckSubmit(false);
    if(error.err) setError({err: false, errMessage: ''});
    if (/\w/.test(search)) {
      setLoading(true);
      fetch(`https://newsapi.org/v2/everything?q=${search}&sortBy=${sort}&pageSize=${resultsPerPage}&page=${pageNumber}&apiKey=5ada2f2e485b4f11b600736fa619867c`)
        .then(resp => resp.json())
          .then(obj => {
            console.log(obj)
            if (obj.status === 'ok') {
              setLoading(false);
              setArticles(obj.articles);
              setTotalResults(obj.totalResults)
            } else throw new Error(obj.message)
          }).catch((e) => {
              setError({err: true, errMessage: e.message});
              setLoading(false);
          })
    } else setCheckSubmit(true);
  }
  function changePageNumber(event: any) {
    if (event.target.id === 'btnRight' && Number(pageNumber) < Math.ceil(Number(totalResults)/resultsPerPage)) {
      setPageNumber(state => `${Number(state) + 1}`) ;
    } else if (Number(pageNumber) > 1) {
        setPageNumber(state => `${Number(state) - 1}`);
    }
  }
  useEffect(()=>{
    handleSubmit();
    },[resultsPerPage]);
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
      <div className="form__pagination">
        <button type="submit" className="btn-pagination" disabled={loading} id="btnLeft" onClick={changePageNumber}>{'<'}</button>
        <input type="text" disabled value={`${pageNumber} / ${Math.max(1, Math.ceil(Number(totalResults)/Number(resultsPerPage)))}`} />
        <button type="submit" className="btn-pagination" disabled={loading} id="btnRight" onClick={changePageNumber}>{'>'}</button>
        <label className="form__label" htmlFor="resultsPerPage">
        Results per page:
        <select name="resultsPerPage" className="form__input" value={resultsPerPage} onChange={(e) => setResultsPerPage(Number(e.target.value))} >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="40">40</option>
          <option value="80">80</option>
        </select>
      </label>
      </div>

    </form>
    {error.err && <span className="error error_table">{error.errMessage}...</span>}
    {!error.err && <Table articles={articles} />}
    </>
  )
}

export default App;