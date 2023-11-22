import { createContext } from 'react';

export const UserContext = createContext({
	is_sign_in: false,
	user_id: null,
});
