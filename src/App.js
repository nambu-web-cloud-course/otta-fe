import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/layout/Header';
import Home from './pages/Home';

const App = () => {
	return (
		<Routes>
			<Route element={<Header />}>
				<Route path="/" element={<Home />} />
				<Route path="sign-in" element={<SignIn />} />
				<Route path="sign-up" element={<SignUp />} />
			</Route>
		</Routes>
	);
};

export default App;
