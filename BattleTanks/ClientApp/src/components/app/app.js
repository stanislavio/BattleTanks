import React, { Component } from 'react';
import Layout from '../layout';
import { Switch } from 'react-router-dom';
import Login from '../../containers/login';
import { Redirect } from 'react-router';
import Home from '../home';
import NotFound from '../Route guard/404';
import Registration from '../../containers/registration';
import ConfirmEmail from '../../components/registration/confirm_email';
import Profile from '../../components/profile';
import Game from '../game';
import AdminPanel from '../../containers/admin';
import MapsWrapper from '../../containers/maps';
import AddMapWrapper from '../../containers/add_map';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../login/login.css';
import { connect } from 'react-redux';
import history from '../../history';
class App extends Component {

    render() {
        return (
            <Router history={history}>
                <Layout>
                    <Switch>
                        <Route exact path="/home" component={() => this.props.user.id ? <Home/> : <Redirect to='/login' />} />
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Redirect to="/home" />
                            )}
                        />
                        <Route path='/admin' component={AdminPanel} />
                        <Route path='/maps' component={MapsWrapper} />
                        <Route path='/add-map' component={AddMapWrapper} />
                        <Route path='/game' component={Game} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/login" component={Login} />
                        <Route path="/registration" component={Registration} />
                        <Route path="/confirm_email/:id/:token" component={ConfirmEmail} />
                        <Route component={NotFound} />
                    </Switch>
                </Layout>
            </Router>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});


App = connect(mapStateToProps)(App);

export default App;


