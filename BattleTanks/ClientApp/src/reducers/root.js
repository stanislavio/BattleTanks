import React from 'react';

import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

const rootReducers = {
    routing: routerReducer,
    form: formReducer,
};

export default rootReducers;