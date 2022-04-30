import { createSlice } from '@reduxjs/toolkit';
import { User } from 'interfaces/auth';
import {
	signup,
	signin,
	signout,
	fetchCurrentUser,
	forgotPassword,
	resetPassword,
} from './authApi';

let userState;
if (typeof window !== 'undefined') {
	if (window.localStorage.getItem('elmsUser')) {
		userState = JSON.parse(
			window.localStorage.getItem('elmsUser') as string
		);
	} else {
		userState = null;
	}
}

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
		user: userState as User | null,
		currentUserStatus: 'idle',
		forgotPasswordStatus: 'idle',
		forgotPasswordMsg: '',
		resetPasswordStatus: 'idle',
		resetPasswordMsg: '',
	},
	reducers: {},
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
			.addCase(fetchCurrentUser.pending, (state, action) => {
				state.currentUserStatus = 'loading';
			})
			.addCase(fetchCurrentUser.fulfilled, (state, action) => {
				state.currentUserStatus = 'succeeded';
				state.user = action.payload;
			})
			.addCase(fetchCurrentUser.rejected, (state, action) => {
				state.currentUserStatus = 'failed';
			})
			.addCase(forgotPassword.pending, (state, action) => {
				state.forgotPasswordStatus = 'loading';
			})
			.addCase(forgotPassword.fulfilled, (state, action) => {
				state.forgotPasswordStatus = 'succeeded';
				state.forgotPasswordMsg =
					'Check your email for the secret code.';
			})
			.addCase(forgotPassword.rejected, (state, action) => {
				state.forgotPasswordStatus = 'failed';
				state.forgotPasswordMsg = action.payload as string;
			})
			.addCase(resetPassword.pending, (state, action) => {
				state.resetPasswordStatus = 'loading';
			})
			.addCase(resetPassword.fulfilled, (state, action) => {
				state.resetPasswordStatus = 'succeeded';
				state.resetPasswordMsg =
					'Your password has been successfully changed. Try to signin with the new passwords.';
			})
			.addCase(resetPassword.rejected, (state, action) => {
				state.resetPasswordStatus = 'failed';
				state.resetPasswordMsg = action.payload as string;
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
