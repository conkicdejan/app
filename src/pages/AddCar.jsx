import React, { useState, useEffect } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import CarService from '../services/CarService';

function AddCar() {
  const initailFormValues = {
    brand: '',
    model: '',
    year: '',
    maxSpeed: '',
    isAutomatic: false,
    engine: '',
    numberOfDoors: '',
  };

  const [newCar, setNewCar] = useState(initailFormValues);

  const history = useHistory();

  const carId = useParams();

  const engineTypes = ['petrol', 'diesel', 'hybrid', 'electric'];

  const yearsRange = (from, to) => Array.from({ length: to - from + 1 }, (v, i) => to - i);

  const handleAddCar = (e) => {
    e.preventDefault();
    if (!carId) {
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
    } else {
      const updateCar = async () => {
        try {
          const response = await CarService.update(carId.id, newCar);
          if (response) {
            history.push('/cars');
          }
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      };
      updateCar();
    }
  };

  const handleReset = () => {
    setNewCar(initailFormValues);
  };

  const handlePreview = () => {
    alert(JSON.stringify(newCar));
  };

  useEffect(() => {
    if (carId.id) {
      const getData = async () => {
        try {
          const cars = await CarService.getById(carId.id);
          setNewCar(cars);
        } catch (error) {
          console.log(error);
        }
      };
      getData();
    } else {
      handleReset();
    }
  }, [carId]);

  return (
    <div className="container">
      <form onSubmit={handleAddCar} id="form">
        <input
          required
          minLength="2"
          type="text"
          name="brand"
          value={newCar.brand}
          placeholder="brand"
          onChange={(e) => setNewCar({ ...newCar, [e.target.name]: e.target.value })}
        />
        <br />

        <input
          required
          minLength="2"
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
            checked={newCar.isAutomatic}
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
              checked={type === newCar.engine}
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

        <button>{carId.id ? 'Update car' : 'Add car'}</button>
      </form>
      <button onClick={handlePreview}>preview</button>
      <button onClick={handleReset}>reset form</button>
    </div>
  );
}

export default AddCar;
