import React, { ReactElement } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import Table from './table';
import Form from './form';
import Header from './header';
import Page404 from './404';
import PageDetails from './page-details';
import { RootState } from '../app/store';

const App = (): ReactElement => {

  const {err, errMessage} = useSelector((state: RootState) => state.error);

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
              <Form />
              {err && <span className="error error_table">{errMessage}...</span>}
              {!err && <Table />}
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
      <Route path="/details/:id" render={({location}) => {
        const indexPublishedAt = location.search.indexOf('&publishedAt=');
        const title=location.search.slice(7, indexPublishedAt);
        const publishedAt = location.search.slice(indexPublishedAt)
        return (
          <PageDetails title={title} publishedAt={publishedAt}/>
        )
      }} />
      <Route path="/404">
        <Page404 />
      </Route>
    </Router>
  )
}

export default App;