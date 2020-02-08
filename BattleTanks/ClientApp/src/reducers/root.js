import React from 'react';

import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import * as User from './user';
import * as Login from './login';
import * as Register from './register';
import * as Game from './game';
import * as Admin from './admin';

const rootReducers = {
    routing: routerReducer,
    form: formReducer,
    user: User.reducer,
    login: Login.reducer, 
    register: Register.reducer,
    game: Game.reducer,
    admin:  Admin.reducer
}

export default rootReducers;