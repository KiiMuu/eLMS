import { createSlice } from '@reduxjs/toolkit';
import { User } from 'interfaces/auth';
import { signup, signin } from './authApi';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		signupStatus: 'idle' as string,
		signinStatus: 'idle' as string,
		signupErrors: [] as any,
		signinErrors: [] as any,
		user: null as User | null,
	},
	reducers: {
		onSignOut: state => {
			state.user = null;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(signup.pending, (state, action) => {
				state.signupStatus = 'loading';
			})
			.addCase(signup.fulfilled, (state, action) => {
				state.signupStatus = 'succeeded';
				state.user = action.payload;
			})
			.addCase(signup.rejected, (state, action) => {
				state.signupStatus = 'failed';
				state.signupErrors = action.payload;
			})
			.addCase(signin.pending, (state, action) => {
				state.signinStatus = 'loading';
			})
			.addCase(signin.fulfilled, (state, action) => {
				state.signinStatus = 'succeeded';
				state.user = action.payload;
			})
			.addCase(signin.rejected, (state, action) => {
				state.signinStatus = 'failed';
				state.signinErrors = action.payload;
			});
	},
});

export const { onSignOut } = authSlice.actions;

export default authSlice.reducer;
