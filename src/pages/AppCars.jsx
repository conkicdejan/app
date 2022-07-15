import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAll, selectAll, deselectAll } from '../store/cars/slice';
import { selectCars, selectSelectedCars } from '../store/cars/selectors';
import CarRow from '../component/CarRow';
import CarSearch from '../component/CarSearch';

function AppCars() {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const selectedCars = useSelector(selectSelectedCars);
  const [pages, setPages] = useState({
    currentPage: 1,
    lastPage: '',
  });
  const [sort, setSort] = useState({sort: 'brand-asc'});
  const [perPages, setPerPages] = useState('');

  const history = useHistory();

  useEffect(() => {
    dispatch(getAll(sort));
  }, [sort]);

  const handleEdit = (id) => {
    history.push(`/edit/${id}`);
  };

  // const handleDelete = (id) => {
  //   if (window.confirm('Are you sure you want to delete this car form the database?')) {
  //     const deleteCar = async () => {
  //       try {
  //         const response = await CarService.delete(id);
  //         console.log(response);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     if (deleteCar()) {
  //       const newCars = cars.filter(({ id: carId }) => id !== carId);
  //       setCars(newCars);
  //     }
  //   }
  // };

  const handlePageChange = (page) => {
    const newPages = { ...pages };
    newPages.currentPage = page;
    setPages(newPages);
  };

  const handleChangePerPage = (value) => {
    setPerPages(value);
  };

  const range = Array.from({ length: pages.lastPage }, (_, i) => 1 + i);
  // console.log(range);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const cars = await CarService.getAll(1, perPages, search);
  //       setCars(cars.data);
  //       pages.lastPage = cars.last_page;
  //       pages.currentPage = 1;
  //       setPages(pages);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getData();
  // }, [search]);
  const handleSelectAll = () => {
    dispatch(selectAll());
  };
  const handleDeselectAll = () => {
    dispatch(deselectAll());
  };

  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-6">Total selected:{selectedCars.length}</div>
        <div className="col-2">
          <button onClick={handleSelectAll} className=" btn btn-primary my-1">
            select all
          </button>
        </div>
        <div className="col-2">
          <button onClick={handleDeselectAll} className=" btn btn-primary my-1">
            deselect all
          </button>
        </div>
        <div className="col-2">
          <select onChange={(e) => setSort({sort: e.target.value})} value={sort.sort} name="sort" id="sort">
            <option value="brand-asc">Sort by Brand asc</option>
            <option value="brand-desc">Sort by Brand desc</option>
            <option value="max_speed-asc">Sort by Max speed asc</option>
            <option value="max_speed-desc">Sort by Max speed desc</option>
          </select>
        </div>
      </div>
      <div>
        <CarSearch />
        <p>last:{pages.lastPage}</p>
        <p>current:{pages.currentPage}</p>
        {range.map((page) => (
          <span
            className="buttonPage"
            key={page}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </span>
        ))}
      </div>
      {cars ? (
        cars.length > 0 ? (
          <ul className="list-group">
            {cars.map((car) => (
              <CarRow
                key={car.id}
                car={car}
                selected={selectedCars.includes(car.id)}
              />
            ))}
          </ul>
        ) : (
          'cars not found'
        )
      ) : (
        'loading...'
      )}
    </div>
  );
}

export default AppCars;
