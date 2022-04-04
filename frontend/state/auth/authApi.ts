import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IAuthData } from 'interfaces/auth';

export const signup = createAsyncThunk(
	'auth/signup',
	async (signupData: IAuthData, { rejectWithValue }) => {
		const { name, email, password } = signupData;

		try {
			const { data } = await axios.post('/api/auth/signup', {
				name,
				email,
				password,
			});

			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);

export const signin = createAsyncThunk(
	'auth/signin',
	async (signinData: IAuthData, { rejectWithValue }) => {
		const { email, password } = signinData;

		try {
			const { data } = await axios.post('/api/auth/signin', {
				email,
				password,
			});

			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);

export const fetchCurrentUser = createAsyncThunk(
	'auth/current',
	async ({}, { rejectWithValue }) => {
		try {
			const { data } = await axios.get('/api/auth/current');

			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);

export const forgotPassword = createAsyncThunk(
	'password/forgot',
	async (forgotData: { email: string }, { rejectWithValue }) => {
		const { email } = forgotData;

		try {
			const { data } = await axios.post('/api/password/forgot', {
				email,
			});

			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);

export const resetPassword = createAsyncThunk(
	'password/reset',
	async (
		resetData: { email: string; code: string; newPassword: string },
		{ rejectWithValue }
	) => {
		const { email, code, newPassword } = resetData;

		try {
			const { data } = await axios.post('/api/password/reset', {
				email,
				code,
				newPassword,
			});

			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);

export const signout = createAsyncThunk(
	'auth/signout',
	async ({}, { rejectWithValue }) => {
		try {
			const { data } = await axios.get('/api/auth/signout');

			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);
