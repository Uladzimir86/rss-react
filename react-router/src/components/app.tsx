import React, { ReactElement, useState } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import Table from './table';
import Form from './form';
import Header from './header';
import Page404 from './404';


const App = (): ReactElement => {

  const [articles, setArticles] = useState([]);
  const [error, setError] = useState({err: false, errMessage: ''});
 

  return (
    <Router>
      <Header />
      <Route path="/" exact>
        {({ match }) => (
          <CSSTransition
            in={match != null}
            timeout={3000}
            classNames="page"
            unmountOnExit
          >
            <div className="page">
              <Form setArticles={setArticles} error={error} setError={setError}/>
              {error.err && <span className="error error_table">{error.errMessage}...</span>}
              {!error.err && <Table articles={articles} />}
            </div>
          </CSSTransition>
        )}
      </Route>
      <Route path="/about">
        {({ match }) => (
          <CSSTransition
            in={match != null}
            timeout={500}
            classNames="page"
            unmountOnExit
          >
            <div className="page">
              Постановка целей является первым шагом на пути превращения мечты в реальность...
            </div>
          </CSSTransition>
        )}
      </Route>
      <Route path="/404">
    <Page404 />
      </Route>
    </Router>
  )
}

export default App;