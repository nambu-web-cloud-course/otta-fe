export const convertToDate = prevDate => {
	return prevDate.split('T')[0].split('-').join('.');
};
