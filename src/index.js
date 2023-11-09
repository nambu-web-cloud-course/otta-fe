import React from 'react';
import ReactDOM from 'react-dom/client';

import { Global, css } from '@emotion/react';
import { ThemeProvider } from '@emotion/react';

import './styles/index.css';
import normalize from './styles/normalize.css';
import theme from './styles/theme';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Global
			styles={css`
				${normalize}
			`}
		/>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>,
);
