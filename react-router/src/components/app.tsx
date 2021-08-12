import React, { ReactElement, useState } from 'react';
import {
  BrowserRouter as Router, Route, Switch,
  // Switch,
  // Route,
} from "react-router-dom";
import Table from './table';
import Form from './form';
import Header from './header';


const App = (): ReactElement => {

  const [articles, setArticles] = useState([]);
  const [error, setError] = useState({err: false, errMessage: ''});

  return (
    <Router>
      <Header />
        <Switch>
          <Route path="/" exact>
            <Form setArticles={setArticles} error={error} setError={setError}/>
            {error.err && <span className="error error_table">{error.errMessage}...</span>}
            {!error.err && <Table articles={articles} />}
          </Route>
          <Route path="/about">
            <span> Some text</span>
          </Route>
        </Switch>
    </Router>
  )
}

export default App;