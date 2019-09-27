import React, {Component} from 'react';
import Layout from '../layout';
import { Switch } from 'react-router-dom';
import Home from '../home';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends Component{

    render(){
        return (
            <Layout>
                <Switch>
                    <Route path="/home" component={Home} />
                        <Route
                         exact
                         path="/"
                         render={() => (
                             <Redirect to="/home" />
                         )}
                         /> 
                 </Switch>
            </Layout>
        )
    }
}
