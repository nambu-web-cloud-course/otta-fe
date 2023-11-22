/**
 * @example
 * <Icon name="logo" width={42} height={43} />
 */
const Icon = ({ name, width, height }) => {
	return (
		<svg
			style={{ pointerEvents: 'none' }}
			width={width.toString()}
			height={height.toString()}
			stroke="none"
		>
			<use href={`#${name}`} />
		</svg>
	);
};

export default Icon;
