import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAll } from '../store/cars/slice';

function CarSearch() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState({ brand: '', model: '' });

  function handleSubmit(e) {
    e.preventDefault();
    // console.log('car search input', search);
    dispatch(getAll(search));
    setSearch({ brand: '', model: '' });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Search cars</h3>
        <label className="form-label" htmlFor="brand">
          Brand
        </label>
        <input
          className="form-control mb-1"
          id="brand"
          name="brand"
          type="string"
          value={search.brand}
          onChange={({ target }) =>
            setSearch({ ...search, [target.name]: target.value })
          }
        />
        <label className="form-label" htmlFor="model">
          Model
        </label>
        <input
          className="form-control mb-1"
          id="model"
          name="model"
          type="string"
          value={search.model}
          onChange={({ target }) =>
            setSearch({ ...search, [target.name]: target.value })
          }
        />
        <button className="btn btn-primary my-1">search</button>
      </form>
    </div>
  );
}

export default CarSearch;
