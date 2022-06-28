import React, { useEffect, useState } from 'react';
import CarService from '../services/CarService';
import { Link, Redirect, useHistory } from 'react-router-dom';

function AppCars() {
  const [cars, setCars] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      try {
        const cars = await CarService.getAll();
        setCars(cars);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleEdit = (id) => {
    history.push(`/edit/${id}`);
  };

  return (
    <div>
      {cars.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Brand</th>
              <th>Model</th>
              <th>Year</th>
              <th>Max speed</th>
              <th>Automatic</th>
              <th>Engine</th>
              <th>Number of doors</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.maxSpeed}</td>
                <td>{car.isAutomatic ? 'yes' : 'no'}</td>
                <td>{car.engine}</td>
                <td>{car.numberOfDoors}</td>
                <td>
                  <button onClick={() => handleEdit(car.id)}>edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        'Cars not found'
      )}
    </div>
  );
}

export default AppCars;
