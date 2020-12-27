const initialState = {
	idCount: 20,
	items: [
		{	id: 0,
			name: 'HTML',
			url: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Html5_dise%C3%B1o_web.png',
			isActive: false,
			isMenuSectionItem: false,
			isChangeSectionItem: false,

			panelNav: {
				id: 1,
				isNavShow: false,
				parentName: 'HTML',
				navItems: [
					{
						id: 2,
						type: 'folder',
						isOpen: false,
						name: 'name',
						folderItems: [
							{
								id: 4,
								type: 'folder',
								name: 'name',
								folderItems: [
									{
										id: 7,
										type: 'file',
										name: 'fileName',
										fileMain: []},
									{
										id: 8,
										type: 'file',
										name: 'fileName',
										fileMain: []},
									{
										id: 9,
										type: 'file',
										name: 'fileName',
										fileMain: []},
								]},
							{
								id: 5,
								type: 'folder',
								name: 'name',
								folderItems: [
									{
										id: 10,
										type: 'folder',
										name: 'name',
										folderItems: [
											{
												id: 11,
												type: 'folder',
												name: 'name',
												folderItems: [
													{
														id: 12,
														type: 'folder',
														name: 'name',
														folderItems: [
															{
																id: 13,
																type: 'file',
																name: 'fileName',
																fileMain: []},
															{
																id: 14,
																type: 'file',
																name: 'fileName',
																fileMain: []},
															{
																id: 15,
																type: 'file',
																name: 'fileName',
																fileMain: []},
														]},
												]},
										]},
								]},
							{
								id: 6,
								type: 'folder',
								isOpen: false,
								name: 'name',
								folderItems: [],
							}
						]},
					{
						id: 3,
						type: 'file',
						isOpen: false,
						name: 'fileName',
						fileMain: []},
				],
			},
		},

	],

	isMenuSection: false,
	isMenuNavItems: false,
};

export const SectionReducer = (state = initialState, action) => {

	let stateCopy = JSON.parse(JSON.stringify(state));
	switch (action.type) {
		case 'MENU_SECTION_SHOW': {
			stateCopy.isMenuSection = true;
			return stateCopy;
		}
		case 'MENU_PANEL_NAV_SHOW': {
			stateCopy.isMenuNavItems = true;
			return stateCopy;
		}
		case 'MENU_SECTION_ITEM_SHOW': {
			stateCopy.items[action.position].isMenuSectionItem = true;
			return stateCopy;
		}
		case 'CLOSE_OPEN_MENU': {
			stateCopy.isMenuSection = false;
			stateCopy.isMenuNavItems = false;
			stateCopy.items.map(el=>{el.isMenuSectionItem = false;});
			return stateCopy;
		}
		case 'ADD_SECTION_ITEM': {
			stateCopy.items.push({
				id: stateCopy.idCount++,
				name: 'Name',
				url: 'https://lh3.googleusercontent.com/RgLNxSnwibzKuEcPUTLul7fvrJMK-bkG-4CpPQugJ6jrBdVIrj48j0p-ofOyF23rRx_iOHo=s48',
				position: stateCopy.items.length,
				isActive: false,
				isMenuSectionItem: false,
				panelNav: {
					isNavShow: false,
					parentName: 'Name',
					navItems: [],
				},
			});
			return stateCopy;
		}
		case 'DELETE_SECTION_ITEM': {
			stateCopy.items.splice(action.position,1);
			return stateCopy;
		}
		case 'SHOW_CHANGE_SECTION_ITEM': {
			stateCopy.items[action.position].isChangeSectionItem = true;
			return stateCopy;
		}
		case 'UN_SHOW_CHANGE_SECTION_ITEM': {
			stateCopy.items.map(el => {el.isChangeSectionItem = false})
			return stateCopy;
		}
		case 'ACTIVATE_SECTION_ITEM': {
			// stateCopy.items.map(el => {el.isChangeSectionItem = false})
			for (let i = 0; i < stateCopy.items.length ; i++) {
				if (action.position === i){
					stateCopy.items[i].panelNav.isNavShow = true;
					stateCopy.items[i].isActive = true;
				}else {
					stateCopy.items[i].panelNav.isNavShow = false;
					stateCopy.items[i].isActive = false;
				}
			}
			return stateCopy;
		}
		case 'ADD_PANEL_NAV_ITEM': {
			stateCopy.items.find((el,index)=> {
				return el.isActive;
			}).panelNav.navItems.push(
					action.typeItemPanelNav === 'folder'
					? { id: stateCopy.idCount++,
							type: 'folder',
					    isOpen: false,
							name: 'new Folder',
							folderItems: []}
					: {	id: stateCopy.idCount++,
							type: 'file',
							isOpen: false,
							name: 'new File',
							fileMain: []},
				);
			return stateCopy;
		}
		default :
			return state;
	}
};

//menuSectionShow AC:
export const menuSectionShow = () => {
	return {
		type: 'MENU_SECTION_SHOW',
	}
};
//menuPanelNavShow AC:
export const menuPanelNavShow = () => {
	return {
		type: 'MENU_PANEL_NAV_SHOW',
	}
};
//menuSectionItemShow AC:
export const menuSectionItemShow = (position) => {
	return {
		type: 'MENU_SECTION_ITEM_SHOW',
		position: position,
	}
};
//addSectionItem AC:
export const addSectionItem = () => {
	return {
		type: 'ADD_SECTION_ITEM',
	}
};
//deleteSectionItem AC:
export const deleteSectionItem = (position) => {
	return {
		type: 'DELETE_SECTION_ITEM',
		position: position,
	}
};
//showChangeSectionItem AC:
export const showChangeSectionItem = (position) => {
	return {
		type: 'SHOW_CHANGE_SECTION_ITEM',
		position: position,
	}
};
//unShowChangeSectionItem AC:
export const unShowChangeSectionItem = () => {
	return {
		type: 'UN_SHOW_CHANGE_SECTION_ITEM',
	}
};
//activateSectionItem AC:
export const activateSectionItem = (position) => {
	return {
		type: 'ACTIVATE_SECTION_ITEM',
		position: position,
	}
};
//addPanelNavItem AC:
export const addPanelNavItem = (typeItemPanelNav) => {
	return {
		type: 'ADD_PANEL_NAV_ITEM',
		typeItemPanelNav: typeItemPanelNav,
	}
};