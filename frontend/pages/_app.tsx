import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from 'state/store';
import lightTheme from 'theme/lightTheme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import GlobalCSS from 'styles/Global';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<ThemeProvider theme={lightTheme}>
				{GlobalCSS()}
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</Provider>
	);
}

export default MyApp;
