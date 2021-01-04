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
										fileMain: [
											{
												id: 5000,
												type: 'block',
												isOpenContextMenu: false,
												title: 'Описание:',
												subTitle: 'myFn.bind(obj)',
												text: 'Указать obj(объект) которому будет принадлежать контекст (возвращает функцию); ',
												img: '',
												inner: [],
											},
											{
												id: 5001,
												type: 'block',
												isOpenContextMenu: false,
												title: 'Description2',
												subTitle: '',
												text: '',
												img: '',
												inner: [],
											},
											{
												id: 5002,
												type: 'block',
												isOpenContextMenu: false,
												title: '',
												subTitle: '',
												text: '',
												img: '',
												inner: [],
											},
											{
												id: 5003,
												type: 'block',
												isOpenContextMenu: false,
												title: 'Синтаксис:',
												subTitle: '',
												text: '',
												img: '',
												inner: [
													{
														id: 5004,
														type: 'block',
														isOpenContextMenu: false,
														title: '',
														subTitle: 'myFn.bind(obj)',
														text: 'Указать obj(объект) которому будет    \n   принадлежать контекст (возвращает функцию); ',
														img: '',
														inner: [],
													},
													{
														id: 5005,
														type: 'block',
														isOpenContextMenu: false,
														title: '',
														subTitle: 'myFn.bind(obj)',
														text: 'Указать obj(объект) которому будет ' +
															'принадлежать контекст (возвращает функцию); ',
														img: '',
														inner: [],
													}
												],
											}
										]
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
	isMenuBlock: false,
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

function searchBlockID(array, id) {

	for (let i = 0; i < array.length; i++) {
		if (array[i].id === id) {
			return element = array[i];
		}
		if (array[i].panelNav && array[i].panelNav.id === id) {
			return element = array[i].panelNav;
		}
		if (array[i].panelNav) changeContextMenuItem(array[i].panelNav.navItems, id);
		if (array[i].folderItems) changeContextMenuItem(array[i].folderItems, id)
		if (array[i].fileMain) changeContextMenuItem(array[i].fileMain, id)
		if (array[i].inner) changeContextMenuItem(array[i].inner, id)
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
		if (array[i].panelNav && array[i].panelNav.id === id) {
			return element = array[i].panelNav;
		}
		if (array[i].panelNav) changeContextMenuItem(array[i].panelNav.navItems, id);
		if (array[i].folderItems) changeContextMenuItem(array[i].folderItems, id)
		if (array[i].fileMain) changeContextMenuItem(array[i].fileMain, id)
		if (array[i].inner) changeContextMenuItem(array[i].inner, id)
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
		if (items[i].folderItems) closeAllOpenContextMenuItem(items[i].folderItems);
		if (items[i].fileMain) closeAllOpenContextMenuItem(items[i].fileMain);
		if (items[i].inner) closeAllOpenContextMenuItem(items[i].inner);
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

function deleteBlockID(array, id) {
	for (let i = 0; i < array.length; i++) {
		if (array[i].id === id) {
			return array.splice(i, 1);
		}
		if (array[i].panelNav && array[i].panelNav.id === id) {
			return array.splice(i, 1);
		}
		if (array[i].panelNav) deleteBlockID(array[i].panelNav.navItems, id);
		if (array[i].folderItems) deleteBlockID(array[i].folderItems, id)
		if (array[i].fileMain) deleteBlockID(array[i].fileMain, id)
		if (array[i].inner) deleteBlockID(array[i].inner, id)
	}
}

function searchListBlock(array, id) {

	for (let i = 0; i < array.length; i++) {
		if (array[i].id === id) {
			list.list = array;
			list.index = i;
			return list;
		}
		if (array[i].panelNav && array[i].panelNav.id === id) {
			list.list = array;
			list.index = i;
			return list;
		}
		if (array[i].panelNav) searchListBlock(array[i].panelNav.navItems, id);
		if (array[i].folderItems) searchListBlock(array[i].folderItems, id)
		if (array[i].fileMain) searchListBlock(array[i].fileMain, id)
		if (array[i].inner) searchListBlock(array[i].inner, id)
	}
	return list
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
				url: '',
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
		case 'CHANGE_SECTION_ITEM': {
			let sectionItem = stateCopy.items.find(el=> el.id === action.id);
			sectionItem.panelNav.parentName = action.name;
			sectionItem.name = action.name;
			action.url !== '' ? sectionItem.url = action.url : false;
			return stateCopy;
		}
		case 'DELETE_SECTION_ITEM': {
			stateCopy.items.splice(action.position, 1);
			return stateCopy;
		}
		case 'CHANGE_POSITION_SECTION_ITEM': {
			let element = searchListBlock(stateCopy.items, action.id);
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

			for (let i = 0; i < stateCopy.items.length; i++) {
				if (action.id === stateCopy.items[i].id) {
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
		case 'ADD_BLOCK_IN_ACTIVE_FILE': {
			let element = searchNavItemID(stateCopy.items, action.id);
			element.fileMain.push({
				id: stateCopy.idCount++,
				type: 'block',
				isOpenContextMenu: false,
				title: '',
				subTitle: '',
				text: '',
				img: '',
				inner: [],
			});
			return stateCopy;
		}

		//main context menu
		case 'ADD_BLOCK_IN_BLOCK': {
			let element = searchBlockID(stateCopy.items, action.id);
			element.inner.push(
				{
				id: stateCopy.idCount++,
				type: 'block',
				isOpenContextMenu: false,
				title: '',
				subTitle: '',
				text: '',
				img: '',
				inner: [],
			}
			);
			return stateCopy;
		}
		case 'CHANGE_TITLE_IN_BLOCK': {
			let element = searchBlockID(stateCopy.items, action.id);
			element.title = action.title;
			return stateCopy;
		}
		case 'CHANGE_SUB_TITLE_IN_BLOCK': {
			let element = searchBlockID(stateCopy.items, action.id);
			element.subTitle = action.subTitle;
			return stateCopy;
		}
		case 'CHANGE_TEXT_IN_BLOCK': {
			let element = searchBlockID(stateCopy.items, action.id);
			element.text = action.text;
			return stateCopy;
		}
		case 'DELETE_BLOCK': {
			deleteBlockID(stateCopy.items, action.id);
			return stateCopy;
		}
		case 'CHANGE_POSITION_BLOCK': {
			let element = searchListBlock(stateCopy.items, action.id);
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
//changeSectionItem AC:
export const changeSectionItem = (id, name, url) => {
	return {
		type: 'CHANGE_SECTION_ITEM',
		id: id,
		name: name,
		url: url,
	}
};
//deleteSectionItem AC:
export const deleteSectionItem = (position) => {
	return {
		type: 'DELETE_SECTION_ITEM',
		position: position,
	}
};
//changePositionSectionItem AC:
export const changePositionSectionItem = (id, side) => {
	return {
		type: 'CHANGE_POSITION_SECTION_ITEM',
		id: id,
		side: side,
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
export const activateSectionItem = (id) => {
	return {
		type: 'ACTIVATE_SECTION_ITEM',
		id: id,
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
//addBlockInActiveFile AC:
export const addBlockInActiveFile = (id) => {
	return {
		type: 'ADD_BLOCK_IN_ACTIVE_FILE',
		id: id,
	}
};

//main context menu

//addBlockInBlock AC:
export const addBlockInBlock = (id) => {
	return {
		type: 'ADD_BLOCK_IN_BLOCK',
		id: id,
	}
};
//changeTitleInBlock AC:
export const changeTitleInBlock = (id, title) => {
	return {
		type: 'CHANGE_TITLE_IN_BLOCK',
		id: id,
		title: title,
	}
};
//changeSubTitleInBlock AC:
export const changeSubTitleInBlock = (id,subTitle) => {
	return {
		type: 'CHANGE_SUB_TITLE_IN_BLOCK',
		id: id,
		subTitle: subTitle,
	}
};
//changeTextInBlock AC:
export const changeTextInBlock = (id, text) => {
	return {
		type: 'CHANGE_TEXT_IN_BLOCK',
		id: id,
		text: text,
	}
};
//deleteBlock AC:
export const deleteBlock = (id) => {
	return {
		type: 'DELETE_BLOCK',
		id: id,
	}
};
//changePositionBlock AC:
export const changePositionBlock = (id, side) => {
	return {
		type: 'CHANGE_POSITION_BLOCK',
		id: id,
		side: side,
	}
};

