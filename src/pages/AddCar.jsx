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
    max_speed: '',
    is_automatic: false,
    engine: '',
    number_of_doors: '',
  };

  const [newCar, setNewCar] = useState(initailFormValues);
  const [error, setError] = useState({
    brand: [],
    model: [],
    year: [],
    max_speed: [],
    is_automatic: [],
    engine: [],
    number_of_doors: [],
});

  const history = useHistory();

  const carId = useParams();

  const engineTypes = ['petrol', 'diesel', 'hybrid', 'electric'];

  const yearsRange = (from, to) => Array.from({ length: to - from + 1 }, (v, i) => to - i);

  const handleAddCar = (e) => {
    // e.preventDefault();
    if (!carId.id) {
      // console.log(newCar);
      const addCar = async () => {
          const response = await CarService.add(newCar);
          if(!!response.response.status && response.response.status === 422){
            setError({...error, ...response.response.data.errors});
          }else{
            history.push('/cars');
            console.log(response);
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
          console.log('error');
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
          {...register('brand', { required: false, minLength: 2 })}
          value={newCar.brand}
          placeholder="brand"
          onChange={(e) => setNewCar({ ...newCar, [e.target.name]: e.target.value })}
        />
        <br />
        {error.brand.map(e => (
            <p className='alert alert-danger p-0'>{e}</p>
        ))}
        {errors.brand && errors.brand.type === 'required' && (
          <p className="alert alert-danger p-0">Brand is required</p>
        )}
        {errors.brand && errors.brand.type === 'minLength' && (
          <p className="alert alert-danger p-0">Minimum 2 characters</p>
        )}

        <input
          type="text"
          {...register('model', { required: false, minLength: 2 })}
          value={newCar.model}
          placeholder="model"
          onChange={(e) => setNewCar({ ...newCar, [e.target.name]: e.target.value })}
        />
        <br />
        {error.model.map(e => (
            <p className='alert alert-danger p-0'>{e}</p>
        ))}
        {errors.model && errors.model.type === 'required' && (
          <p className="alert alert-danger p-0">Model is required</p>
        )}
        {errors.model && errors.model.type === 'minLength' && (
          <p className="alert alert-danger p-0">Minimum 2 characters</p>
        )}

        <div>
          <select
            {...register('year', { required: false })}
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
          {error.year.map(e => (
            <p className='alert alert-danger p-0'>{e}</p>
        ))}
          {errors.year && <p className="alert alert-danger p-0">Year is required</p>}
        </div>

        <input
          type="number"
          {...register('max_speed', { required: false, min: 0, max: 400 })}
          value={newCar.max_speed}
          placeholder="max speed"
          onChange={(e) => setNewCar({ ...newCar, [e.target.name]: e.target.value })}
        />
        <br />
        {error.max_speed.map(e => (
            <p className='alert alert-danger p-0'>{e}</p>
        ))}
        {errors.max_speed && errors.max_speed.type === 'required' && (
          <p className="alert alert-danger p-0">Model is required</p>
        )}
        {errors.max_speed && errors.max_speed.type === 'min' && (
          <p className="alert alert-danger p-0">Minimum speed is 0</p>
        )}
        {errors.max_speed && errors.max_speed.type === 'max' && (
          <p className="alert alert-danger p-0">Maximum speed is 400</p>
        )}

        <div>
          <input
            type="checkbox"
            name="is_automatic"
            id="is_automatic"
            checked={newCar.is_automatic}
            onChange={(e) => setNewCar({ ...newCar, [e.target.name]: e.target.checked })}
          />
          <label htmlFor="is_automatic">is automatic</label>
          <br />
          
        </div>

        {engineTypes.map((type, index) => (
          <div key={index}>
            <input
              type="radio"
              id={type}
              {...register('engine', { required: false })}
              checked={type === newCar.engine}
              value={type}
              onChange={(e) => setNewCar({ ...newCar, [e.target.name]: e.target.value })}
            />
            <label htmlFor={type}>{type}</label>
            <br />
          </div>
        ))}
        {error.engine.map(e => (
        <p className='alert alert-danger p-0'>{e}</p>
    ))}
        {errors.engine && <p className="alert alert-danger p-0">Engine type is required</p>}

        <input
          type="number"
          {...register('number_of_doors', { required: false })}
          value={newCar.number_of_doors}
          placeholder="number of doors"
          onChange={(e) => setNewCar({ ...newCar, [e.target.name]: e.target.value })}
        />
        <br />
        {error.number_of_doors.map(e => (
            <p className='alert alert-danger p-0'>{e}</p>
        ))}
        {errors.number_of_doors && <p className="alert alert-danger p-0">Engine type is required</p>}

        <button>{carId.id ? 'Update car' : 'Add car'}</button>
        
      </form>
      <button onClick={handlePreview}>preview</button>
      <button onClick={handleReset}>reset form</button>
    </div>
  );
}

export default AddCar;
