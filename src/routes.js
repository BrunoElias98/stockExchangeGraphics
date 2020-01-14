import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Main from './components/Main'
import Graph from './components/Graph'

export default function Routes() { 
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/Graph" component={Graph} />
            </Switch>
        </BrowserRouter>
    )
}