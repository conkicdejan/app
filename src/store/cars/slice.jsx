import { createSlice } from '@reduxjs/toolkit';

const middlewareActions = {
  getAll: () => {},
};

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    cars: null,
    selectedCars: [],
  },
  reducers: {
    setCars: (state, action) => {
      // console.log(action);
      state.cars = action.payload;
    },
    selectCar: (state, action) => {
      const index = state.selectedCars.indexOf(action.payload);
      if (index === -1) {
        state.selectedCars.push(action.payload);
      } else {
        state.selectedCars.splice(index, 1);
      }
    },
    selectAll: (state) => {
      state.cars.map(({ id }) => {
        if (state.selectedCars.indexOf(id) === -1) {
          state.selectedCars.push(id);
        }
      });
    },
    deselectAll: (state) => {
      state.selectedCars = [];
    },
    ...middlewareActions,
  },
});

export const { getAll, setCars, selectCar, selectAll, deselectAll } =
  carsSlice.actions;
export default carsSlice.reducer;
