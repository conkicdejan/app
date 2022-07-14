import { call, put, takeLatest } from 'redux-saga/effects';
import CarService from '../../services/CarService';
import { getAll, setCars } from './slice';

function* getAllHandler(action) {
  try {
    const  {data}  = yield call(CarService.getAll);
    // console.log(data)
    yield put(setCars(data));
  } catch (error) {
    console.error(error.response);
  }
}

export function* watchGetAll() {
  yield takeLatest(getAll.type, getAllHandler);
}
