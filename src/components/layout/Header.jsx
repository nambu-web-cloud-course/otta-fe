import React from 'react';
import { Outlet } from 'react-router-dom';

const Header = () => {
	return (
		<>
			<h1>임시 헤더예요</h1>
			<Outlet />
		</>
	);
};

export default Header;
