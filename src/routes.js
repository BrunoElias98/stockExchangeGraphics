import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Main from './components/Main'
import Graffic from './components/Graffic'

export default function Routes() { 
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/Graffic" component={Graffic} />
            </Switch>
        </BrowserRouter>
    )
}