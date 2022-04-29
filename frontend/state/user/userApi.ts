import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const becomeAnInstructor = createAsyncThunk(
	'user/becomeAnInstructor',
	async ({}, { rejectWithValue }) => {
		try {
			const { data } = await axios.post('/api/user/become-instructor');

			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);

export const getAccountStatus = createAsyncThunk(
	'user/getAccountStatus',
	async ({}, { rejectWithValue }) => {
		try {
			const { data } = await axios.get('/api/user/account-status');

			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response ? error.response.data : error
			);
		}
	}
);
