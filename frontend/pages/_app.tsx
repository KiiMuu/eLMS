import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from 'state/store';
import lightTheme from 'theme/lightTheme';
import Navbar from 'components/layout/Navbar';
import { ThemeProvider } from '@mui/material';
import GlobalCSS from 'styles/Global';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			{GlobalCSS()}
			<ThemeProvider theme={lightTheme}>
				<Navbar />
				<Component {...pageProps} />
			</ThemeProvider>
		</Provider>
	);
}

export default MyApp;
