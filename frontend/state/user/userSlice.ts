import { createSlice } from '@reduxjs/toolkit';
import { becomeAnInstructor, getAccountStatus } from './userApi';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		becomeInstructorStatus: 'idle',
		accountStatus: 'idle',
		account: {},
		accountLinkUrl: '',
	},
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(becomeAnInstructor.pending, (state, action) => {
				state.becomeInstructorStatus = 'loading';
			})
			.addCase(becomeAnInstructor.fulfilled, (state, action) => {
				state.becomeInstructorStatus = 'succeeded';
				state.accountLinkUrl = action.payload;
			})
			.addCase(becomeAnInstructor.rejected, (state, action) => {
				state.becomeInstructorStatus = 'failed';
			})
			.addCase(getAccountStatus.pending, (state, action) => {
				state.accountStatus = 'loading';
			})
			.addCase(getAccountStatus.fulfilled, (state, action) => {
				state.accountStatus = 'succeeded';
				state.account = action.payload;
			})
			.addCase(getAccountStatus.rejected, (state, action) => {
				state.accountStatus = 'failed';
			});
	},
});

export default userSlice.reducer;
