import { createSlice } from '@reduxjs/toolkit';

export const globalSlice = createSlice({
	name: 'global',
	initialState: {
		drawerOpen: false,
	},
	reducers: {
		handleDrawerToggle: state => {
			state.drawerOpen = !state.drawerOpen;
		},
	},
	extraReducers(builder) {},
});

export const { handleDrawerToggle } = globalSlice.actions;

export default globalSlice.reducer;
