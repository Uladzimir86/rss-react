import React, { ReactElement,  useEffect,  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getErrors, Article } from '../app/actions';
import { RootState } from '../app/store';
import './page-details.css';

interface IProps {
  title: string, 
  publishedAt: string,
}

const PageDetails = ({title, publishedAt}: IProps): ReactElement => {

  const [data, setData] = useState({} as Article);
  const {err, errMessage} = useSelector((state: RootState) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if(publishedAt !== '000test000')
    fetch(`https://newsapi.org/v2/everything?qInTitle=${title}&from=${publishedAt}&to=${publishedAt}&pageSize=1&apiKey=5ada2f2e485b4f11b600736fa619867c`)
      .then((resp) => resp.json())
      .then((resp) => setData(resp.articles[0]))
      .catch((e) => dispatch(getErrors({err: true, errMessage: e.message})));
  },[publishedAt, title])

  return (
    <>
    {!data.title && !err && <div>Loading...</div>}
    {err && <div className="error error_table">{errMessage}...</div>}
    {data.title && 
      <div className="details">
        <h2 className="details__title">{data.title}</h2>
        <h3 className="details__author">Author: {data.author}</h3>
        <img src={data.urlToImage} alt="foto" className="details__foto" />
        <div className="details__contain">Content: {data.content}</div>
        <div className="details__contain"><a href={data.url} rel="noreferrer" target="_blank">URL: {data.url}</a></div>
      </div>}
    </>
  )
}

export default PageDetails;