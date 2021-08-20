import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';

export default function Router () {
    return (
        <BrowserRouter>
        <Switch>
            <Route path={["/admin"]} component={() => <HomePage />} />
            <Route path={["/"]} component={()=> <HomePage isCustomer />} />
                
        </Switch>
        </BrowserRouter>
    );
}