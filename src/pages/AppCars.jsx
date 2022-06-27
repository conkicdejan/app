import React, { useEffect, useState } from 'react';
import CarService from '../services/CarService';

function AppCars() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const cars = await CarService.getAll();
        setCars(cars);
        console.log(cars);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      {cars ? (
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
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>car.brand</td>
                <td>car.model</td>
                <td>car.year</td>
                <td>car.maxSpeed</td>
                <td>car.isAutomatic</td>
                <td>car.engine</td>
                <td>car.numberOfDoors</td>
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
