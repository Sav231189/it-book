const initialState = {
	idCount: 20,
	items: [
		{
			id: 0,
			name: 'HTML',
			url: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Html5_dise%C3%B1o_web.png',
			isActive: false,
			isMenuSectionItem: false,
			isChangeSectionItem: false,

			panelNav: {
				id: 1,
				parentName: 'HTML',
				isNavShow: false,
				navItems: [
					{
						id: 2,
						type: 'folder',
						isOpen: false,
						isOpenContextMenu: false,
						name: 'name',
						folderItems: [
							{
								id: 4,
								type: 'folder',
								name: 'name',
								isOpen: false,
								isOpenContextMenu: false,
								folderItems: [
									{
										id: 7,
										type: 'file',
										name: 'fileName1',
										isOpen: false,
										isOpenContextMenu: false,
										fileMain: []
									},
									{
										id: 8,
										type: 'file',
										name: 'fileName2',
										isOpen: false,
										isOpenContextMenu: false,
										fileMain: []
									},
									{
										id: 9,
										type: 'file',
										name: 'fileName3',
										isOpen: false,
										isOpenContextMenu: false,
										fileMain: []
									},
								]
							},
							{
								id: 5,
								type: 'folder',
								name: 'name',
								isOpen: false,
								isOpenContextMenu: false,
								folderItems: [
									{
										id: 10,
										type: 'folder',
										name: 'name',
										isOpen: false,
										isOpenContextMenu: false,
										folderItems: [
											{
												id: 11,
												type: 'folder',
												name: 'name',
												isOpen: false,
												isOpenContextMenu: false,
												folderItems: [
													{
														id: 12,
														type: 'folder',
														name: 'name',
														isOpen: false,
														isOpenContextMenu: false,
														folderItems: [
															{
																id: 13,
																type: 'file',
																name: 'fileName',
																isOpen: false,
																isOpenContextMenu: false,
																fileMain: []
															},
															{
																id: 14,
																type: 'file',
																name: 'fileName',
																isOpen: false,
																isOpenContextMenu: false,
																fileMain: []
															},
															{
																id: 15,
																type: 'file',
																name: 'fileName',
																isOpen: false,
																isOpenContextMenu: false,
																fileMain: []
															},
														]
													},
												]
											},
										]
									},
								]
							},
							{
								id: 6,
								type: 'folder',
								name: 'name',
								isOpen: false,
								isOpenContextMenu: false,
								folderItems: [],
							}
						]
					},
					{
						id: 3,
						type: 'file',
						name: 'fileName',
						isOpen: false,
						isOpenContextMenu: false,
						fileMain: []
					},
				],
			},
		},

	],

	isMenuSection: false,
	isMenuNavItems: false,
	isMenuNavItem: false,
};

//вспомогательные функции
let element;

function searchNavItemID(array, id) {

	for (let i = 0; i < array.length; i++) {
		if (array[i].id === id) {
			return element = array[i];
		}
		if (array[i].panelNav && array[i].panelNav === id) {
			return element = array[i].panelNav;
		} else if (array[i].panelNav) searchNavItemID(array[i].panelNav.navItems, id)
		if (array[i].folderItems && array[i].id === id) {
			return element = array[i];
		} else if (array[i].folderItems) searchNavItemID(array[i].folderItems, id)
	}
	return element
}

let list = {list: [], index: null};

function searchListNavItemID(array, id) {
	for (let i = 0; i < array.length; i++) {
		if (array[i].id === id) {
			list.list = array;
			list.index = i;
			return list;
		}
		if (array[i].panelNav && array[i].panelNav === id) {
			return list.list = array;
		} else if (array[i].panelNav) searchListNavItemID(array[i].panelNav.navItems, id)
		if (array[i].folderItems && array[i].id === id) {
			list.list = array;
			list.index = i;
			return list;
		} else if (array[i].folderItems) searchListNavItemID(array[i].folderItems, id)
	}
	return list
}

function closeAllFile(items, isParentActive = false) {

	for (let i = 0; i < items.length; i++) {
		if (items[i].isActive || isParentActive) {
			if (items[i].type === 'file') {
				items[i].isOpen = false;
			}
			if (items[i].panelNav) closeAllFile(items[i].panelNav.navItems, true);
			if (items[i].folderItems && items[i].type === 'file') {
				items[i].isOpen = false;
			}
			if (items[i].folderItems) closeAllFile(items[i].folderItems, true)
		}
	}
}

function changeContextMenuItem(array, id) {
	for (let i = 0; i < array.length; i++) {
		if (array[i].id === id) {
			return element = array[i];
		}
		if (array[i].panelNav && array[i].panelNav === id) {
			return element = array[i].panelNav;
		} else if (array[i].panelNav) searchNavItemID(array[i].panelNav.navItems, id)
		if (array[i].folderItems && array[i].id === id) {
			return element = array[i];
		} else if (array[i].folderItems) searchNavItemID(array[i].folderItems, id)
	}
	return element
}

function closeAllOpenContextMenuItem(items) {
	for (let i = 0; i < items.length; i++) {
		if (items[i].isOpenContextMenu) {
			items[i].isOpenContextMenu = false;
		}
		if (items[i].panelNav) closeAllOpenContextMenuItem(items[i].panelNav.navItems);
		if (items[i].folderItems && items[i].isOpenContextMenu) {
			items[i].isOpenContextMenu = false;
		}
		if (items[i].folderItems) closeAllOpenContextMenuItem(items[i].folderItems)
	}

}

function deleteNavItemID(array, id) {

	for (let i = 0; i < array.length; i++) {
		if (array[i]) {
			if (array[i].id === id) {
				return array.splice(i, 1);
			}
			if (array[i].panelNav && array[i].panelNav === id) {
				return array.splice(i, 1);
			} else if (array[i].panelNav) deleteNavItemID(array[i].panelNav.navItems, id)
			if (array[i].folderItems && array[i].id === id) {
				return array.splice(i, 1);
			} else if (array[i].folderItems) deleteNavItemID(array[i].folderItems, id)
		}
	}
}

//Reducer
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
		case 'MENU_NAV_ITEM_SHOW': {
			stateCopy.isMenuNavItem = !stateCopy.isMenuNavItem;
			return stateCopy;
		}
		case 'MENU_SECTION_ITEM_SHOW': {
			stateCopy.items[action.position].isMenuSectionItem = true;
			return stateCopy;
		}
		case 'CLOSE_OPEN_MENU': {
			closeAllOpenContextMenuItem(stateCopy.items);
			stateCopy.isMenuSection = false;
			stateCopy.isMenuNavItems = false;
			stateCopy.isMenuNavItem = false;
			stateCopy.items.map(el => {
				el.isMenuSectionItem = false;
			});
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
			stateCopy.items.splice(action.position, 1);
			return stateCopy;
		}
		case 'SHOW_CHANGE_SECTION_ITEM': {
			stateCopy.items[action.position].isChangeSectionItem = true;
			return stateCopy;
		}
		case 'UN_SHOW_CHANGE_SECTION_ITEM': {
			stateCopy.items.map(el => {
				el.isChangeSectionItem = false
			})
			return stateCopy;
		}
		case 'ACTIVATE_SECTION_ITEM': {
			// stateCopy.items.map(el => {el.isChangeSectionItem = false})
			for (let i = 0; i < stateCopy.items.length; i++) {
				if (action.position === i) {
					stateCopy.items[i].panelNav.isNavShow = true;
					stateCopy.items[i].isActive = true;
				} else {
					stateCopy.items[i].panelNav.isNavShow = false;
					stateCopy.items[i].isActive = false;
				}
			}
			return stateCopy;
		}
		case 'ADD_PANEL_NAV_ITEM': {
			stateCopy.items.find((el, index) => {
				return el.isActive;
			}).panelNav.navItems.push(
				action.typeItemPanelNav === 'folder'
					? {
						id: stateCopy.idCount++,
						type: 'folder',
						isOpen: false,
						name: 'new Folder',
						folderItems: []
					}
					: {
						id: stateCopy.idCount++,
						type: 'file',
						isOpen: false,
						name: 'new File',
						fileMain: []
					},
			);
			return stateCopy;
		}
		case 'OPEN_CLOSE_FOLDER': {
			let element = searchNavItemID(stateCopy.items, action.id);
			element.isOpen = !element.isOpen;
			return stateCopy;
		}
		case 'OPEN_FILE': {
			closeAllFile(stateCopy.items);
			let element = searchNavItemID(stateCopy.items, action.id);
			element.isOpen = !element.isOpen;
			return stateCopy;
		}
		case 'CHANGE_IS_OPEN_CONTEXT_MENU': {
			let element = changeContextMenuItem(stateCopy.items, action.id);
			element.isOpenContextMenu = !element.isOpenContextMenu;
			return stateCopy;
		}
		case 'CLOSE_ALL_IS_OPEN_CONTEXT_MENU': {
			closeAllOpenContextMenuItem(stateCopy.items);
			return stateCopy;
		}
		case 'ADD_FOLDER_NAV_ITEM': {
			let element = searchNavItemID(stateCopy.items, action.id);
			element.isOpen = true;
			element.folderItems.push(
				{
					id: stateCopy.idCount++,
					type: 'folder',
					name: 'name',
					isOpen: false,
					isOpenContextMenu: false,
					folderItems: [],
				}
			);
			return stateCopy;
		}
		case 'ADD_FILE_NAV_ITEM': {
			let element = searchNavItemID(stateCopy.items, action.id);
			element.isOpen = true;
			element.folderItems.push(
				{
					id: stateCopy.idCount++,
					type: 'file',
					name: 'fileName',
					isOpen: false,
					isOpenContextMenu: false,
					fileMain: []
				}
			);
			return stateCopy;
		}
		case 'DELETE_NAV_ITEM': {
			deleteNavItemID(stateCopy.items, action.id)
			return stateCopy;
		}
		case 'CHANGE_NAME_NAV_ITEM': {
			let element = searchNavItemID(stateCopy.items, action.id);
			element.name = action.name;
			return stateCopy;
		}
		case 'CHANGE_POSITION_NAV_ITEM': {
			let element = searchListNavItemID(stateCopy.items, action.id);
			if (action.side === 'up') {
				if (element.index > 0) {
					let elemCopy = element.list[element.index - 1];
					element.list[element.index - 1] = element.list[element.index];
					element.list[element.index] = elemCopy;
				}
			} else if (action.side === 'down') {
				if (element.index + 1 < element.list.length) {
					let elemCopy = element.list[element.index + 1];
					element.list[element.index + 1] = element.list[element.index];
					element.list[element.index] = elemCopy;
				}
			}
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
//menuNavItemShow AC:
export const menuNavItemShow = () => {
	return {
		type: 'MENU_NAV_ITEM_SHOW',
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
//openCloseFolder AC:
export const openCloseFolder = (id) => {
	return {
		type: 'OPEN_CLOSE_FOLDER',
		id: id,
	}
};
//openFile AC:
export const openFile = (id) => {
	return {
		type: 'OPEN_FILE',
		id: id,
	}
};
//changeIsOpenContextMenu AC:
export const changeIsOpenContextMenu = (id) => {
	return {
		type: 'CHANGE_IS_OPEN_CONTEXT_MENU',
		id: id,
	}
};
//closeAllIsOpenContextMenu AC:
export const closeAllIsOpenContextMenu = () => {
	return {
		type: 'CLOSE_ALL_IS_OPEN_CONTEXT_MENU',
	}
};
//addFolderNavItem AC:
export const addFolderNavItem = (id) => {
	return {
		type: 'ADD_FOLDER_NAV_ITEM',
		id: id,
	}
};
//addFolderNavItem AC:
export const addFileNavItem = (id) => {
	return {
		type: 'ADD_FILE_NAV_ITEM',
		id: id,
	}
};
//deleteNavItem AC:
export const deleteNavItem = (id) => {
	return {
		type: 'DELETE_NAV_ITEM',
		id: id,
	}
};
//changeNameNavItem AC:
export const changeNameNavItem = (id, name) => {
	return {
		type: 'CHANGE_NAME_NAV_ITEM',
		id: id,
		name: name,
	}
};
//changePositionUpNavItem AC:
export const changePositionNavItem = (id, side) => {
	return {
		type: 'CHANGE_POSITION_NAV_ITEM',
		id: id,
		side: side,
	}
};




