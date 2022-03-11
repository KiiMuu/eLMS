export interface IAlertMessage {
	openSnackbar: boolean;
	handleCloseSnackbar: any;
	isCustomized?: boolean;
	autoHideDuration?: number;
	severity?: string;
	customizedMsg?: string;
	message?: string;
	vertical?: 'bottom' | 'top';
	horizontal?: 'left' | 'center' | 'right';
}
