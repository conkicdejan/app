import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import carsReducer from './cars/slice';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    cars: carsReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

for (const saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

export default store;
