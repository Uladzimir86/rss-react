import React from 'react';

function Table({articles}: {articles: any[]}) {
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
      <tr>
        <th>#</th>
        <th>Author</th>
        <th>Content</th>
        <th>Published</th>
        <th>Title</th>
        <th>URL</th>
        <th>URL to image</th>
      </tr>
      {tableRows}
    </table>
  )
}

export default Table;