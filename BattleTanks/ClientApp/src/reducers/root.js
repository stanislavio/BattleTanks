import React from 'react';

import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import * as User from './user';
import * as Login from './login';
import * as Register from './register';
import * as Game from './game';
import * as Admin from './admin';
import * as Tank from './tanks';
import * as Users from './users';
import * as Maps from './maps';
import * as FindGame from './find_game';
import * as Hub from './hub';

const rootReducers = {
    routing: routerReducer,
    form: formReducer,
    user: User.reducer,
    login: Login.reducer, 
    register: Register.reducer,
    game: Game.reducer,
    admin:  Admin.reducer,
    tanks: Tank.reducer, 
    users: Users.reducer,
    maps: Maps.reducer,
    findGame: FindGame.reducer,
    hub: Hub.reducer
}

export default rootReducers;