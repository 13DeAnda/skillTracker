import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { AdminConsole } from '../components/adminConsole/adminConsole';
import { User } from '../components/user/User';
export const AppRouter = () => (
    <BrowserRouter>
        <Fragment>
            <Header />            
            <Switch>
                <Route path='/' component={AdminConsole} exact={true} />
                <Route path='/user/:id' component={User} exact={true} />
                <Redirect to="/" />
            </Switch>
        </Fragment>
    </BrowserRouter>
);
