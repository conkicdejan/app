import React, { useState, useEffect } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import CarService from '../services/CarService';
import { useForm } from 'react-hook-form';

function AddCar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    // e.preventDefault();
    if (!carId.id) {
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
      <form onSubmit={handleSubmit(handleAddCar)} id="form">
        <input
          type="text"
          {...register('brand', { required: true, minLength: 2 })}
          value={newCar.brand}
          placeholder="brand"
          onChange={(e) => setNewCar({ ...newCar, [e.target.name]: e.target.value })}
        />
        <br />
        {errors.brand && errors.brand.type === 'required' && (
          <p className="alert alert-danger p-0">Brand is required</p>
        )}
        {errors.brand && errors.brand.type === 'minLength' && (
          <p className="alert alert-danger p-0">Minimum 2 characters</p>
        )}

        <input
          type="text"
          {...register('model', { required: true, minLength: 2 })}
          value={newCar.model}
          placeholder="model"
          onChange={(e) => setNewCar({ ...newCar, [e.target.name]: e.target.value })}
        />
        <br />
        {errors.model && errors.model.type === 'required' && (
          <p className="alert alert-danger p-0">Model is required</p>
        )}
        {errors.model && errors.model.type === 'minLength' && (
          <p className="alert alert-danger p-0">Minimum 2 characters</p>
        )}

        <div>
          <select
            {...register('year', { required: true })}
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
          {errors.year && <p className="alert alert-danger p-0">Year is required</p>}
        </div>

        <input
          type="number"
          {...register('maxSpeed', { required: true, min: 0, max: 400 })}
          value={newCar.maxSpeed}
          placeholder="max speed"
          onChange={(e) => setNewCar({ ...newCar, [e.target.name]: e.target.value })}
        />
        <br />
        {errors.maxSpeed && errors.maxSpeed.type === 'required' && (
          <p className="alert alert-danger p-0">Model is required</p>
        )}
        {errors.maxSpeed && errors.maxSpeed.type === 'min' && (
          <p className="alert alert-danger p-0">Minimum speed is 0</p>
        )}
        {errors.maxSpeed && errors.maxSpeed.type === 'max' && (
          <p className="alert alert-danger p-0">Maximum speed is 400</p>
        )}

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
              type="radio"
              id={type}
              {...register('engine', { required: true })}
              checked={type === newCar.engine}
              value={type}
              onChange={(e) => setNewCar({ ...newCar, [e.target.name]: e.target.value })}
            />
            <label htmlFor={type}>{type}</label>
            <br />
          </div>
        ))}
        {errors.engine && <p className="alert alert-danger p-0">Engine type is required</p>}

        <input
          type="number"
          {...register('numberOfDoors', { required: true })}
          value={newCar.numberOfDoors}
          placeholder="number of doors"
          onChange={(e) => setNewCar({ ...newCar, [e.target.name]: e.target.value })}
        />
        <br />
        {errors.numberOfDoors && <p className="alert alert-danger p-0">Engine type is required</p>}

        <button>{carId.id ? 'Update car' : 'Add car'}</button>
      </form>
      <button onClick={handlePreview}>preview</button>
      <button onClick={handleReset}>reset form</button>
    </div>
  );
}

export default AddCar;
