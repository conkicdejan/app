import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../store/cars/slice';
import { selectCars } from '../store/cars/selectors';
import CarRow from '../component/CarRow';
import CarSearch from '../component/CarSearch';

function AppCars() {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const [pages, setPages] = useState({
    currentPage: 1,
    lastPage: '',
  });
  const [perPages, setPerPages] = useState('');

  const history = useHistory();

  useEffect(() => {
    dispatch(getAll());
  }, []);

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
  console.log(range);

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

  return (
    <div>
      <div>
        <CarSearch />
        <input
          min="1"
          type="number"
          onChange={(e) => handleChangePerPage(e.target.value)}
        />

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
      {cars
        ? cars.map((car) => (
            <ul key={car.id}>
              <CarRow key={car.id} car={car} />
            </ul>
          ))
        : 'Cars not found'}
    </div>
  );
}

export default AppCars;
