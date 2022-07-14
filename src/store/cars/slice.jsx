import { createSlice } from '@reduxjs/toolkit';

const middlewareActions = {
  getAll: () => {},
};


const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    cars: null,
  },
  reducers: {
    setCars: (state, action) => {
      // console.log(action);
      state.cars = action.payload;
    },
    ...middlewareActions,
  },
});

export const {
  getAll,
  setCars,
} = carsSlice.actions;
export default carsSlice.reducer;
