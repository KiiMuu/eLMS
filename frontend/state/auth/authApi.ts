import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IAuthData } from 'interfaces/auth';
import { headers } from 'next.config';

export const signup = createAsyncThunk(
	'auth/signup',
	async (signupData: IAuthData, { rejectWithValue }) => {
		const { name, email, password } = signupData;

		try {
			const { data } = await axios.post(
				`${process.env.NEXT_PUBLIC_API}/auth/signup`,
				{
					name,
					email,
					password,
				}
			);

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
			const { data } = await axios.post(
				`${process.env.NEXT_PUBLIC_API}/auth/signin`,
				{
					email,
					password,
				}
			);

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
			const { data } = await axios.get(
				`${process.env.NEXT_PUBLIC_API}/auth/signout`
			);

			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);
