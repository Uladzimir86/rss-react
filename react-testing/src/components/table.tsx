import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../app/store';
import './table.css';
import {Article} from '../app/actions';

function Table(): ReactElement {

  const articles = useSelector((state: RootState) => state.articles)
  const tableRows = articles.map((item: Article, index) => {
    const id = index +1;
    return (
      <tr key={id}>
        <td>{id}</td>
        <td><Link to={`/details/${id-1}?title=${item.title}&publishedAt=${item.publishedAt}`}> {item.title}</Link></td>
        <td>{item.author}</td>
        <td>{item.content}</td>
        <td>{item.publishedAt}</td>
        <td>{item.url}</td>
        <td>{item.urlToImage}</td>
      </tr>
    )
  })

  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Author</th>
          <th>Content</th>
          <th>Published</th>
          <th>URL</th>
          <th>URL to image</th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </table>
  )
}

export default Table;