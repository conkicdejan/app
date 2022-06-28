import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import CarService from '../services/CarService';

function AddCar() {
  const initailFormValues = {
    brand: '',
    model: '',
    year: '',
    maxSpeed: '',
    isAutomatic: false,
    engine: false,
    numberOfDoors: '',
  };

  const [newCar, setNewCar] = useState(initailFormValues);

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

  const handleReset = () => {
    setNewCar(initailFormValues);
    document.getElementById('form').reset();
  };

  const handlePreview = () => {
    alert(JSON.stringify(newCar));
  };

  return (
    <div className="container">
      <form onSubmit={handleAddCar} id="form">
        <input
          required
          minlength="2"
          type="text"
          name="brand"
          value={newCar.brand}
          placeholder="brand"
          onChange={(e) => setNewCar({ ...newCar, [e.target.name]: e.target.value })}
        />
        <br />

        <input
          required
          minlength="2"
          type="text"
          name="model"
          value={newCar.model}
          placeholder="model"
          onChange={(e) => setNewCar({ ...newCar, [e.target.name]: e.target.value })}
        />
        <br />

        <div>
          <select
            required
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
          min="1"
          max="400"
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
              required
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
          required
          type="number"
          name="numberOfDoors"
          value={newCar.numberOfDoors}
          placeholder="number of doors"
          onChange={(e) => setNewCar({ ...newCar, [e.target.name]: e.target.value })}
        />
        <br />

        <button>Add car</button>
      </form>
      <button onClick={handlePreview}>preview</button>
      <button onClick={handleReset}>reset form</button>
    </div>
  );
}

export default AddCar;
