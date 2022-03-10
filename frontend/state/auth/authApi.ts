import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { signupData } from 'interfaces/auth';

export const signup = createAsyncThunk(
	'auth/signup',
	async (signupData: signupData, { rejectWithValue }) => {
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
