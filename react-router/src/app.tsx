import React, { ReactElement, useState } from 'react';
import Table from './table';
import Form from './form';


const App = (): ReactElement => {

  const [articles, setArticles] = useState([]);
  const [error, setError] = useState({err: false, errMessage: ''});

  return (
    <>
      <Form setArticles={setArticles} error={error} setError={setError}/>
      {error.err && <span className="error error_table">{error.errMessage}...</span>}
      {!error.err && <Table articles={articles} />}
    </>
  )
}

export default App;