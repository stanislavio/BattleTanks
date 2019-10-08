import React from 'react';

import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import * as User from './user';
import * as Login from './login';
import * as Register from './register';

const rootReducers = {
    routing: routerReducer,
    form: formReducer,
    user: User.reducer,
    login: Login.reducer, 
    register: Register.reducer
};

export default rootReducers;