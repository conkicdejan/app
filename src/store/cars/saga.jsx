import { call, put, takeLatest } from 'redux-saga/effects';
import CarService from '../../services/CarService';
import { getAll, setCars } from './slice';

function* getAllHandler(action) {
  yield put(setCars(null));
  try {
    console.log('search payload', action.payload);
    const { data } = yield call(CarService.getAll, action.payload ? action.payload : '');
    // console.log(data)
    yield put(setCars(data));
  } catch (error) {
    console.error(error.response);
  }
}

export function* watchGetAll() {
  yield takeLatest(getAll.type, getAllHandler);
}
