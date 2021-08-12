import React, { ReactElement } from 'react';
import './table.css';

interface Article {
  author: string,
  content: string,
  publishedAt: string,
  title: string,
  url: string,
  urlToImage: string,
}

function Table({articles}: {articles: Article[]}): ReactElement {
  const tableRows = articles.map((item, index) => {
    const id = index +1;
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{item.author}</td>
        <td>{item.content}</td>
        <td>{item.publishedAt}</td>
        <td>{item.title}</td>
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
          <th>Author</th>
          <th>Content</th>
          <th>Published</th>
          <th>Title</th>
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