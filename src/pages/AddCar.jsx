import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import CarService from '../services/CarService';

function AddCar() {
  const [newCar, setNewCar] = useState({
    brand: '',
    model: '',
    year: '',
    maxSpeed: '',
    isAutomatic: '',
    engine: '',
    numberOfDoors: '',
  });

  const history = useHistory();

  const engineTypes = ['petrol', 'diesel', 'hybrid', 'electric'];

  const yearsRange = (from, to) => Array.from({ length: to - from + 1 }, (v, i) => to - i);

  const handleAddCar = (e) => {
    e.preventDefault();
    const addCar = async () => {
      try {
        const response = await CarService.add(newCar);
        if (response) {
          history.push('/cars');
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    addCar();
  };

  return (
    <div className="container">
      <form onSubmit={handleAddCar}>
        <input
          type="text"
          name="brand"
          value={newCar.brand}
          placeholder="brand"
          onChange={(e) => setNewCar({ ...newCar, [e.target.name]: e.target.value })}
        />
        <br />

        <input
          type="text"
          name="model"
          value={newCar.model}
          placeholder="model"
          onChange={(e) => setNewCar({ ...newCar, [e.target.name]: e.target.value })}
        />
        <br />

        <div>
          <select
            name="year"
            value={newCar.year}
            onChange={(e) => setNewCar({ ...newCar, [e.target.name]: e.target.value })}
          >
            <option value="">--select year--</option>
            {yearsRange(1990, new Date().getFullYear()).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <br />
        </div>

        <input
          type="number"
          name="maxSpeed"
          value={newCar.maxSpeed}
          placeholder="max speed"
          onChange={(e) => setNewCar({ ...newCar, [e.target.name]: e.target.value })}
        />
        <br />

        <div>
          <input
            type="checkbox"
            name="isAutomatic"
            id="isAutomatic"
            value={newCar.isAutomatic}
            onChange={(e) => setNewCar({ ...newCar, [e.target.name]: e.target.checked })}
          />
          <label htmlFor="isAutomatic">is automatic</label>
          <br />
        </div>

        {engineTypes.map((type, index) => (
          <div key={index}>
            <input
              type="radio"
              id={type}
              name="engine"
              value={type}
              onChange={(e) => setNewCar({ ...newCar, [e.target.name]: e.target.value })}
            />
            <label htmlFor={type}>{type}</label>
            <br />
          </div>
        ))}

        <input
          type="number"
          name="numberOfDoors"
          value={newCar.numberOfDoors}
          placeholder="number of doors"
          onChange={(e) => setNewCar({ ...newCar, [e.target.name]: e.target.value })}
        />
        <br />

        <button>Add car</button>
      </form>
    </div>
  );
}

export default AddCar;
