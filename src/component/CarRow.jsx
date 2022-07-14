import React from 'react';

function CarRow({ car }) {
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

  return (
    <li>
      <p>Brand: {brand}</p>
      <p>Model: {model}</p>
      <p>Year: {year}</p>
      <p>Max speed:{max_speed}</p>
      <p>Automatic: {is_automatic ? 'yes' : 'no'}</p>
      <p>Engine: {engine}</p>
      <p>Nomber of doors:{number_of_doors}</p>
      <p>
        {/* <button onClick={() => handleEdit(car.id)}>edit</button> */}
        {/* <button onClick={() => handleDelete(car.id)}>delete</button> */}
      </p>
      <hr />
    </li>
  );
}

export default CarRow;
