import React from 'react'
import CounterContainer from '../containers/CounterContainer'
import MessageContainer from '../containers/MessageContainer'
import Header from '../components/Header'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import styled from '@emotion/styled'

const Container = styled.div`
  text-align: center;
`
export const history = createBrowserHistory()

function Routes() {
  return (
    <Router history={history}>
      <Container>
        <Header />
        <Switch>
          <Route path="/" component={MessageContainer} />
        </Switch>
      </Container>
    </Router>
  )
}

export default Routes
