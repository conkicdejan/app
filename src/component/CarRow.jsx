import React from 'react';
import { useDispatch } from 'react-redux';
import { selectCar } from '../store/cars/slice';

function CarRow({ car, selected }) {
  const dispatch = useDispatch();
  const {
    id,
    brand,
    model,
    year,
    max_speed,
    is_automatic,
    engine,
    number_of_doors,
  } = car;

  function handleSelect(id) {
    // console.log(id);
    dispatch(selectCar(id));
  }

  const ifSelected = selected ? { backgroundColor: 'green' } : {};

  return (
    <li className="list-group-item">
      <ul>
        <div className="row align-items-start">
          <div className="col">
            <li>
              <strong>{brand}</strong>
            </li>
            <li>
              <button
                className=" btn btn-primary my-1"
                onClick={() => handleSelect(id)}
                style={ifSelected}
              >
                {selected ? 'selected' : 'select'}
              </button>
              {/* <button onClick={() => handleDelete(car.id)}>delete</button> */}
            </li>
          </div>
          <div className="col">
            <li>Model: {model}</li>
            <li>Year: {year}</li>
            <li>Max speed:{max_speed}</li>
          </div>
          <div className="col">
            <li>Automatic: {is_automatic ? 'yes' : 'no'}</li>
            <li>Engine: {engine}</li>
            <li>Number of doors:{number_of_doors}</li>
          </div>
        </div>
      </ul>
    </li>
  );
}

export default CarRow;
