import { createSlice } from '@reduxjs/toolkit';
import { User } from 'interfaces/auth';
import { signup, signin, signout } from './authApi';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		signupStatus: 'idle',
		signinStatus: 'idle',
		signoutStatus: 'idle',
		signupErrors: [] as any,
		signinErrors: [] as any,
		signoutErrors: [] as any,
		signoutSuccessAlert: '',
		user: null as User | null,
	},
	reducers: {
		// onSignOut: state => {
		// 	state.user = null;
		// },
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
			})
			.addCase(signout.pending, (state, action) => {
				state.signoutStatus = 'loading';
			})
			.addCase(signout.fulfilled, (state, action) => {
				state.signoutStatus = 'succeeded';
				state.user = null;
				state.signoutSuccessAlert = action.payload.msg;
			})
			.addCase(signout.rejected, (state, action) => {
				state.signoutStatus = 'failed';
				state.signoutErrors = action.payload;
			});
	},
});

// export const { onSignOut } = authSlice.actions;

export default authSlice.reducer;
