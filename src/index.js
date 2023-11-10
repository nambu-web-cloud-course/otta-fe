import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Global, css } from '@emotion/react';

import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';

import normalize from './styles/normalize.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Global
				styles={css`
					${normalize}
				`}
			/>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
