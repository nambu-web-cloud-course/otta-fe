import { useEffect, useRef, useState } from 'react';
import {
	Box,
	Button,
	ButtonGroup,
	ClickAwayListener,
	Grow,
	MenuItem,
	MenuList,
	Paper,
	Popper,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { district_region_data } from '../../data/district_region.js';

const Dropdown = ({ type, option_data, setValue }) => {
	const [open, setOpen] = useState(false);
	const [isSelected, setIsSelected] = useState(false);
	const anchorRef = useRef(null);
	const [selectedIndex, setSelectedIndex] = useState(0);

	const handleMenuItemClick = (_, index) => {
		setSelectedIndex(index);
		setValue(option_data[index]);
		setOpen(false);
		setIsSelected(true);
	};

	const handleToggle = () => setOpen(prevOpen => !prevOpen);

	const handleClose = event => anchorRef => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	return (
		<Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
			<ButtonGroup size="large" variant="outlined" ref={anchorRef} aria-label="split button">
				<Button onClick={handleToggle}>
					{isSelected
						? option_data[selectedIndex]
						: `${type === 'DISTRICT' ? '구를' : '동을'} 선택해주세요.`}
				</Button>
				<Button
					size="small"
					aria-controls={open ? 'split-button-menu' : undefined}
					aria-expanded={open ? 'true' : undefined}
					aria-label="select merge strategy"
					aria-haspopup="menu"
					onClick={handleToggle}
				>
					<ArrowDropDownIcon />
				</Button>
			</ButtonGroup>
			<Popper
				sx={{
					zIndex: 1,
				}}
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
						}}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose(anchorRef)}>
								<MenuList id="split-button-menu" autoFocusItem>
									{option_data &&
										option_data.map((option, index) => (
											<MenuItem
												key={option}
												selected={index === selectedIndex}
												onClick={event => handleMenuItemClick(event, index)}
											>
												{option}
											</MenuItem>
										))}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</Box>
	);
};

const DropDownGroup = ({ setSearchQuery }) => {
	const district_option = Object.keys(district_region_data);
	const [selectedDistrict, setSelectedDistrict] = useState('');
	const [regionList, setRegionList] = useState([]);
	const [selectedRegion, setSelectedRegion] = useState(' ');

	useEffect(() => {
		setSearchQuery({ district: selectedDistrict, region: selectedRegion });
	}, [selectedDistrict, selectedRegion]);

	useEffect(() => {
		setRegionList(district_region_data[selectedDistrict]);
	}, [selectedDistrict]);

	return (
		<Box sx={{ display: 'flex', width: '100%', gap: 20, zIndex: 5 }}>
			<Dropdown type="DISTRICT" option_data={district_option} setValue={setSelectedDistrict} />
			<Dropdown type="REGION" option_data={regionList} setValue={setSelectedRegion} />
		</Box>
	);
};

export default DropDownGroup;
