/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from 'containers/Dashboard/Dashboard';
import Login from 'containers/Login/Login';
import ProtectedComponent from 'hoc/ProtectedComponent';
import { ToastContainer } from 'react-toastify';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: 100vw;
  margin: 0 auto;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

export default function App() {
  return (
    // <AppWrapper>
    <>
      <Helmet titleTemplate="%s - Task Manager" defaultTitle="Task Manager">
        <meta name="description" content="Manager your's tasks" />
      </Helmet>
      <Switch>
        <Route path="/login" component={Login} />
        <Redirect exact path="/" to="/dashboard" />
        <ProtectedComponent path="/dashboard" component={Dashboard} />
      </Switch>
      <GlobalStyle />
      <ToastContainer />
      </>
    // </AppWrapper>
  );
}
