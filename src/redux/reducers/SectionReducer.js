import firebase from "firebase/app";
import "firebase/firestore";
import {
	deleteSectionItemDAL, getActiveNavItemsDAL,
	getSectionItemDAL,
	setNavInSectionDAL,
	updateSectionItemDAL, updateSectionItemsListDAL
} from "../../DAL/DAL_Section";
import {changeActiveFileNameAC, changeIsLoadingAC, closeAllContextMenuTHUNK} from "./AppReducer";

//вспомогательные функции
function closeAllOpenContextMenuItem(items = []) {
	for (let i = 0; i < items.length; i++) {
		if (items[i].isOpenContextMenu) {
			items[i].isOpenContextMenu = false;
		}
		if (items[i].folderItems) closeAllOpenContextMenuItem(items[i].folderItems);
		if (items[i].fileMain) closeAllOpenContextMenuItem(items[i].fileMain);
		if (items[i].inner) closeAllOpenContextMenuItem(items[i].inner);
	}
}

function closeAllFile(items, isParentActive = false) {
	for (let i = 0; i < items.length; i++) {
		if (items[i].isActive || isParentActive) {
			if (items[i].type === 'file') {
				items[i].isOpen = false;
			}
			if (items[i].folderItems) closeAllFile(items[i].folderItems, true)
		}
	}
}

let listAndIndex = {list: [], index: null};

function searchListAndItemID(array = [], id) {

	for (let i = 0; i < array.length; i++) {
		if (array[i].id && array[i].id === id) {
			listAndIndex.list = array;
			listAndIndex.index = i;
			return listAndIndex;
		}
		if (array[i].folderItems) searchListAndItemID(array[i].folderItems, id);
		if (array[i].fileMain) searchListAndItemID(array[i].fileMain, id);
	}
	return listAndIndex
}

//Reducer
let stateWorkDAL;
export const SectionReducer = (state = {sectionItems: []}, action) => {
	let stateCopy = JSON.parse(JSON.stringify(state));
	switch (action.type) {

		case 'UPDATE_STATE_WORK_DAL': {
			stateWorkDAL = stateCopy;
			return stateCopy;
		}
		case 'CHANGE_IS_LOADING_SECTION_ITEM': {
			let listAndItem = searchListAndItemID(stateCopy.sectionItems, action.id);
			listAndItem.list[listAndItem.index].isLoading = action.isLoading;
			return stateCopy;
		}
		case 'CHANGE_IS_OPEN_CONTEXT_MENU_ITEM': {
			let listAndItem = searchListAndItemID(stateCopy.sectionItems, action.id);
			listAndItem.list[listAndItem.index].isOpenContextMenu = action.isOpenContextMenu;
			return stateCopy;
		}
		case 'CHANGE_POSITION': {
			let element = searchListAndItemID(stateCopy.sectionItems, action.id);
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
		case 'CLOSE_ALL_IS_OPEN_CONTEXT_MENU_ITEM': {
			closeAllOpenContextMenuItem(stateCopy.sectionItems);
			return stateCopy;
		}
		case 'DELETE_ELEMENT': {
			let listAndIndex = searchListAndItemID(stateCopy.sectionItems, action.id);
			if (listAndIndex.list[listAndIndex.index].type === 'file' &&
				listAndIndex.list[listAndIndex.index].isOpen) {
				closeAllFile(stateCopy.sectionItems);
			}
			listAndIndex.list.splice(listAndIndex.index, 1);
			return stateCopy;
		}


		// Section
		case 'APPEND_SECTION_ITEM': {
			stateCopy.sectionItems = action.sectionItems;
			return stateCopy;
		}
		case 'ADD_SECTION_ITEM': {
			return stateWorkDAL;
		}
		case 'ACTIVATE_SECTION_ITEM': {
			for (let i = 0; i < stateCopy.sectionItems.length; i++) {
				if (action.id === stateCopy.sectionItems[i].id) {
					stateCopy.sectionItems[i].isActive = true;
				} else {
					stateCopy.sectionItems[i].isActive = false;
				}
			}
			return stateCopy;
		}
		case 'CHANGE_SECTION_ITEM': {
			return stateWorkDAL;
		}

		//Nav
		case 'APPEND_NAV_ITEM': {
			let listAndItem = searchListAndItemID(stateCopy.sectionItems, action.idSectionItem)
			listAndItem.list[listAndItem.index].folderItems = action.folderItems;
			return stateCopy;
		}
		case 'ADD_NAV_ITEM': {
			return stateWorkDAL;
		}
		case 'CHANGE_IS_OPEN_ITEM': {
			let listAndItem = searchListAndItemID(stateCopy.sectionItems, action.id);
			if (listAndItem.list[listAndItem.index].type === 'file') {
				closeAllFile(stateCopy.sectionItems);
				stateCopy.activeFileName = listAndItem.list[listAndItem.index].name;
			}
			listAndItem.list[listAndItem.index].isOpen = !listAndItem.list[listAndItem.index].isOpen;
			return stateCopy;
		}
		case 'CHANGE_NAME_NAV_ITEM': {
			let listAndItem = searchListAndItemID(stateCopy.sectionItems, action.id);
			listAndItem.list[listAndItem.index].name = action.name === '' ? ' ' : action.name;
			listAndItem.list[listAndItem.index].isOpenContextMenu = false;
			return stateCopy;
		}

		//Main
		case 'ADD_BLOCK_IN_ACTIVE_FILE': {
			let listAndItem = searchListAndItemID(stateCopy.sectionItems, action.id);
			listAndItem.list[listAndItem.index].fileMain.push({
				id: new Date().getTime(),
				type: 'block',
				isOpenContextMenu: false,
				title: '',
				subTitle: '',
				text: '',
				isBorder: true,
				img: '',
				fileMain: [],
			});
			return stateCopy;
		}
		case 'CHANGE_BLOCK': {
			let listAndItem = searchListAndItemID(stateCopy.sectionItems, action.id);
			switch (action.typeChange) {
				case 'changeTitle':
					listAndItem.list[listAndItem.index].title = action.data;
					break;
				case 'changeSubTitle':
					listAndItem.list[listAndItem.index].subTitle = action.data;
					break;
				case 'changeText':
					listAndItem.list[listAndItem.index].text = action.data;
					break;
				case 'changeBorder':
					listAndItem.list[listAndItem.index].isBorder = !listAndItem.list[listAndItem.index].isBorder;
					break;
			}
			return stateCopy;
		}
		case 'ADD_ACTIVE_FILE_NAME_IN_SECTION_ITEM': {
			stateCopy.sectionItems.find(el=>el.isActive).activeFileName = action.name
			return stateCopy;
		}

		default :
			return state;
	}
};

//AC UPDATE_STATE_WORK_DAL:
export const updateStateWorkDAL = () => {
	return {
		type: 'UPDATE_STATE_WORK_DAL',
	}
};
//AC CHANGE_IS_LOADING_SECTION_ITEM:
export const changeIsLoadingSectionItemAC = (id, isLoading) => {
	return {
		type: 'CHANGE_IS_LOADING_SECTION_ITEM',
		isLoading: isLoading,
		id: id,
	}
};
//AC CHANGE_IS_OPEN_CONTEXT_MENU_ITEM:
export const changeIsOpenContextMenuItemAC = (id, isOpenContextMenu) => {
	return {
		type: 'CHANGE_IS_OPEN_CONTEXT_MENU_ITEM',
		id: id,
		isOpenContextMenu: isOpenContextMenu,
	}
};
//AC CLOSE_ALL_IS_OPEN_CONTEXT_MENU_ITEM:
export const closeAllIsOpenContextMenuItemsAC = () => {
	return {
		type: 'CLOSE_ALL_IS_OPEN_CONTEXT_MENU_ITEM',
	}
};

//AC APPEND_NAV_ITEM:
export const appendNavItemAC = (folderItems, idSectionItem) => {
	return {
		type: 'APPEND_NAV_ITEM',
		folderItems: folderItems,
		idSectionItem: idSectionItem,
	}
};
//AC APPEND_SECTION_ITEM:
export const appendSectionItemsAC = (sectionItems) => {
	return {
		type: 'APPEND_SECTION_ITEM',
		sectionItems: sectionItems,
	}
};
//THUNK getDataTHUNK:
export const getDataTHUNK = (userId = '') => {
	return (dispatch) => {
		dispatch(updateStateWorkDAL());
		if (userId !== '') {
			getSectionItemDAL(userId)
			.then((data) => {
				if (data) {
					dispatch(appendSectionItemsAC(data.sectionItems));
					dispatch(closeAllIsOpenContextMenuItemsAC());
					dispatch(updateStateWorkDAL());
					let activeSectionItem = stateWorkDAL.sectionItems.find(el => el.isActive);
					if (activeSectionItem) {
						return getActiveNavItemsDAL(activeSectionItem.id, userId)
						.then((data) => {
							return {activeNavItems: data, activeSectionItem: activeSectionItem}
						});
					} else return {};
				}
			})
			.then((data) => {
				if (data.activeNavItems && data.activeNavItems.folderItems) {
					dispatch(appendNavItemAC(data.activeNavItems.folderItems, data.activeSectionItem.id));
					dispatch(closeAllIsOpenContextMenuItemsAC());
				}
				return data
			})
			.then((data) => {
				data.activeSectionItem && dispatch(changeIsLoadingSectionItemAC(data.activeSectionItem.id, true));
				dispatch(changeIsLoadingAC(false));
			})
			.then(() => {
				for (let i = 0; i < stateWorkDAL.sectionItems.length; i++) {
					if (!stateWorkDAL.sectionItems[i].isActive) {
						dispatch(changeIsLoadingSectionItemAC(stateWorkDAL.sectionItems[i].id, false));
						getActiveNavItemsDAL(stateWorkDAL.sectionItems[i].id, userId)
						.then((data) => {
							dispatch(changeIsLoadingSectionItemAC(stateWorkDAL.sectionItems[i].id, true));
							if (data && data.folderItems) {
								dispatch(appendNavItemAC(data.folderItems, stateWorkDAL.sectionItems[i].id));
								dispatch(closeAllIsOpenContextMenuItemsAC());
							}
						});
					}
				}
			});
		}
	}
};

//AC ADD_SECTION_ITEM:
export const addSectionItemAC = () => {
	return {
		type: 'ADD_SECTION_ITEM',
	}
};
//THUNK addSectionItem:
export const addSectionItemTHUNK = (userId) => {

	return (dispatch) => {
		dispatch(updateStateWorkDAL());
		const id = new Date().getTime();
		stateWorkDAL.sectionItems.push({
			id: id,
			name: 'Name',
			url: '',
			position: stateWorkDAL.sectionItems.length,
			activeFileName: '',
			isActive: false,
			isOpenContextMenu: false,
			isLoading: true,
			folderItems: [],
		});
		dispatch(activateSectionItemTHUNK(id, userId));
		updateSectionItemsListDAL(stateWorkDAL.sectionItems, userId)
		.then((resolve) => {
			dispatch(addSectionItemAC());
		});
	}
};

//AC ACTIVATE_SECTION_ITEM:
export const activateSectionItemAC = (id) => {
	return {
		type: 'ACTIVATE_SECTION_ITEM',
		id: id,
	}
};
//THUNK activateSectionItemTHUNK:
export const activateSectionItemTHUNK = (id, userId) => {
	return (dispatch) => {
		dispatch(activateSectionItemAC(id));
		dispatch(changeActiveFileNameAC(stateWorkDAL.sectionItems.find(el=>el.id === id).activeFileName));
		dispatch(updateStateWorkDAL());
		updateSectionItemsListDAL(stateWorkDAL.sectionItems, userId).then();
	}
};


//AC DELETE_ELEMENT:
export const deleteElementAC = (id) => {
	return {
		type: 'DELETE_ELEMENT',
		id: id,
	}
};
//THUNK deleteElementTHUNK:
export const deleteElementTHUNK = (id, typeDelete, userId) => {
	return (dispatch) => {
		dispatch(closeAllIsOpenContextMenuItemsAC());
		dispatch(deleteElementAC(id));
		switch (typeDelete) {
			case 'sectionItem':
				dispatch(updateStateWorkDAL());
				deleteSectionItemDAL(id, userId).then(resolve => {
					updateSectionItemsListDAL(stateWorkDAL.sectionItems, userId).then();
				});
				break;
			case 'element':
				dispatch(changeActiveFileNameAC(""));
				dispatch(updateStateWorkDAL());
				updateSectionItemDAL(stateWorkDAL.sectionItems.find(el => el.isActive), userId).then();
				break;
		}
	}
};

//AC CHANGE_SECTION_ITEM:
export const changeSectionItemAC = () => {
	return {
		type: 'CHANGE_SECTION_ITEM',
	}
};
//	THUNK changeSectionItem:
export const changeSectionItem = (name, url, id, userId) => {
	return (dispatch) => {
		dispatch(closeAllIsOpenContextMenuItemsAC());
		dispatch(updateStateWorkDAL());
		let element = stateWorkDAL.sectionItems.find(el => el.id === id);
		if (name !== '') {
			element.name = name;
		} else element.url = url;
		updateSectionItemsListDAL(stateWorkDAL.sectionItems, userId)
		.then((resolve) => {
			dispatch(changeSectionItemAC());
		});
	}
};

//AC ADD_NAV_ITEM:
export const addNavItemAC = () => {
	return {
		type: 'ADD_NAV_ITEM',
	}
};
//THUNK addNavItemTHUNK:
export const addNavItemTHUNK = (typeItemNav, id, userId) => {

	return (dispatch) => {
		dispatch(closeAllContextMenuTHUNK());
		dispatch(updateStateWorkDAL());
		let listAndItem = searchListAndItemID(stateWorkDAL.sectionItems, id);
		if (listAndItem.list[listAndItem.index].folderItems) {
			listAndItem.list[listAndItem.index].isOpen = true;
			listAndItem.list[listAndItem.index].folderItems.push(
				typeItemNav === 'folder'
					? {
						id: new Date().getTime(),
						type: 'folder',
						isOpen: true,
						isOpenContextMenu: false,
						name: 'new Folder',
						folderItems: []
					}
					: {
						id: new Date().getTime(),
						type: 'file',
						isOpen: false,
						isOpenContextMenu: false,
						name: 'new File',
						fileMain: []
					},
			);
		}
		setNavInSectionDAL(stateWorkDAL.sectionItems, userId)
		.then((resolve) => {
			dispatch(addNavItemAC());
		});
	}
};

//AC CHANGE_IS_OPEN_ITEM:
export const changeIsOpenItemAC = (id) => {
	return {
		type: 'CHANGE_IS_OPEN_ITEM',
		id: id,
	}
};
//THUNK changeIsOpenItem:
export const changeIsOpenItem = (id, name, userId) => {

	return (dispatch) => {
		dispatch(changeIsOpenItemAC(id));
		if (name !== '') {
			dispatch(changeActiveFileNameAC(name));
		}
		dispatch(updateStateWorkDAL());
		updateSectionItemDAL(stateWorkDAL.sectionItems.find(el => el.isActive), userId).then(() => {
		});
	}
};

//changeNameNavItem AC:
export const changeNameNavItemAC = (id, name, userId) => {
	return {
		type: 'CHANGE_NAME_NAV_ITEM',
		id: id,
		name: name,
	}
};
//THUNK changeNameNavItemTHUNK:
export const changeNameNavItemTHUNK = (id, name, userId) => {

	return (dispatch) => {
		dispatch(changeNameNavItemAC(id, name));
		dispatch(updateStateWorkDAL());
		updateSectionItemDAL(stateWorkDAL.sectionItems.find(el => el.isActive), userId).then();
	}
};

//AC CHANGE_POSITION:
export const changePositionAC = (id, side) => {
	return {
		type: 'CHANGE_POSITION',
		id: id,
		side: side,
	}
};
//THUNK changePositionTHUNK:
export const changePositionTHUNK = (id, side, userId) => {

	return (dispatch) => {
		dispatch(changePositionAC(id, side));
		dispatch(updateStateWorkDAL());
		updateSectionItemDAL(stateWorkDAL.sectionItems.find(el => el.isActive), userId).then();
	}
};

//AC ADD_BLOCK_IN_ACTIVE_FILE:
export const addBlockInActiveFileAC = (id) => {
	return {
		type: 'ADD_BLOCK_IN_ACTIVE_FILE',
		id: id,
	}
};
//THUNK addBlockInActiveFile:
export const addBlockInActiveFileTHUNK = (id, userId) => {
	return (dispatch) => {
		dispatch(addBlockInActiveFileAC(id));
		dispatch(updateStateWorkDAL());
		updateSectionItemDAL(stateWorkDAL.sectionItems.find(el => el.isActive), userId).then();
	}
};

//AC CHANGE_BLOCK:
export const changeBlockAC = (id, typeChange, data) => {
	return {
		type: 'CHANGE_BLOCK',
		id: id,
		typeChange: typeChange,
		data: data,
	}
};
//THUNK changeBlockTHUNK:
export const changeBlockTHUNK = (id, typeChange, data = '', userId) => {
	return (dispatch) => {
		dispatch(changeBlockAC(id, typeChange, data));
		dispatch(updateStateWorkDAL());
		updateSectionItemDAL(stateWorkDAL.sectionItems.find(el => el.isActive), userId).then();
	}
};

//AC ADD_ACTIVE_FILE_NAME_IN_SECTION:
export const addActiveFileNameInSectionItemAC = (name) => {
	return {
		type: 'ADD_ACTIVE_FILE_NAME_IN_SECTION_ITEM',
		name: name,
	}
};