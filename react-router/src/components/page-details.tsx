import React, { ReactElement,  useEffect,  useState, Dispatch, SetStateAction } from 'react';
import './page-details.css';

interface Article {
  author: string,
  content: string,
  publishedAt: string,
  title: string,
  url: string,
  urlToImage: string,
}
interface IProps {
  title: string, 
  publishedAt: string,
  setError: Dispatch<SetStateAction<{
    err: boolean;
    errMessage: string;
  }>>,
  error: {
    err: boolean, 
    errMessage: string
  }
}

const PageDetails = ({title, publishedAt, error, setError}: IProps): ReactElement => {

  const [data, setData] = useState({} as Article);

  useEffect(() => {
    fetch(`https://newsapi.org/v2/everything?qInTitle=${title}&from=${publishedAt}&to=${publishedAt}&pageSize=1&apiKey=5ada2f2e485b4f11b600736fa619867c`)
      .then((resp) => resp.json())
      .then((resp) => setData(resp.articles[0]))
      .catch((e) => setError({err: true, errMessage: e.message}));
  },[publishedAt, title, setError])

  return (
    <>
    {!data.title && !error.err && <div>Loading...</div>}
    {error.err && <div className="error error_table">{error.errMessage}...</div>}
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