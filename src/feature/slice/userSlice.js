import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  users: [],
};

const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export default authSlice.reducer;
