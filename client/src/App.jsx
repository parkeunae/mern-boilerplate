import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import withAuth from './hoc/withAuth';

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={withAuth(LandingPage)} />
                    <Route exact path="/login" component={withAuth(LoginPage, false)} />
                    <Route exact path="/register" component={withAuth(RegisterPage, false)} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
