import { useNavigate } from 'react-router-dom';

const useNavigateTo = () => {
	const navigate = useNavigate();
	const goTo = url => navigate(url);
	return goTo;
};

export { useNavigateTo };
