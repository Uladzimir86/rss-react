import React, { ReactElement, useEffect, useState, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './form.css';
import {getArticles, getErrors} from '../app/actions';
import { RootState } from '../app/store';

const Form = (): ReactElement => {

  const dispatch = useDispatch();
  const {err} = useSelector((state: RootState) => state.error);

  const [search, setSearch] = useState('');
  const [checkSubmit, setCheckSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState('popularity');
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [totalResults, setTotalResults] = useState('1');
  const [pageNumber, setPageNumber] = useState('1');

  function handleSubmit(event?: React.FormEvent<HTMLFormElement>) {
    if (event) event.preventDefault();
    if(checkSubmit) setCheckSubmit(false);
    if(err) dispatch(getErrors({err: false, errMessage: ''}));
    if (/\w/.test(search)) {
      setLoading(true);
      fetch(`https://newsapi.org/v2/everything?q=${search}&sortBy=${sort}&pageSize=${resultsPerPage}&page=${pageNumber}&apiKey=5ada2f2e485b4f11b600736fa619867c`)
        .then(resp => resp.json())
          .then(obj => {
            if (obj.status === 'ok') {
              setLoading(false);
              dispatch(getArticles(obj.articles));
              setTotalResults(obj.totalResults)
            } else throw new Error(obj.message)
          }).catch((e) => {
              dispatch(getErrors({err: true, errMessage: e.message}));
              setLoading(false);
          })
    } else setCheckSubmit(true);
  }
  function changePageNumber(event: SyntheticEvent) {
    if (event.currentTarget.id === 'btnRight' && Number(pageNumber) < Math.ceil(Number(totalResults)/resultsPerPage)) {
      setPageNumber(state => `${Number(state) + 1}`) ;
    } else if (Number(pageNumber) > 1) {
        setPageNumber(state => `${Number(state) - 1}`);
    }
  }
  useEffect(()=>{
    handleSubmit();
    },[resultsPerPage]);

  return (
    <form className="form" onSubmit={handleSubmit}>
      {checkSubmit && <span className="error">Please, enter letters or digits!</span>}
      <div className="form__searchBar">
        <input type="text" className="searchBar__input searchBar1" placeholder="Search" value={search} onChange={(e) => {setSearch(e.target.value)}} data-testid="searchBarText"/>
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
        <input type="text" disabled value={`${pageNumber} / ${Math.max(1, Math.ceil(Number(totalResults)/Number(resultsPerPage)))}`} data-testid="pageNumber"/>
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
  )
}

export default Form;