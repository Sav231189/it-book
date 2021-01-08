import firebase from "firebase/app";
import "firebase/firestore";
import {
	addSectionItemDAL, deleteSectionItemDAL,
	getNavItemsDAL,
	getSectionItemDAL,
	setNavInSectionDAL,
	setSectionItemDAL, updateSectionItemDAL
} from "../../DAL/DAL_Section";

const initialState = {
	idCount: 20,
	sectionItems: [
		// {
		// 	id: 0,
		// 	name: 'HTML',
		// 	url: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Html5_dise%C3%B1o_web.png',
		// 	isActive: false,
		// 	isMenuSectionItem: false,
		// 	isChangeSectionItem: false,
		//
		// 	panelNav: {
		// 		id: 1,
		// 		parentName: 'HTML',
		// 		isNavShow: false,
		// 		navItems: [
		// 			{
		// 				id: 2,
		// 				type: 'folder',
		// 				isOpen: false,
		// 				isOpenContextMenu: false,
		// 				name: 'name',
		// 				folderItems: [
		// 					{
		// 						id: 4,
		// 						type: 'folder',
		// 						name: 'name',
		// 						isOpen: false,
		// 						isOpenContextMenu: false,
		// 						folderItems: [
		// 							{
		// 								id: 7,
		// 								type: 'file',
		// 								name: 'fileName1',
		// 								isOpen: false,
		// 								isOpenContextMenu: false,
		// 								fileMain: [
		// 									{
		// 										id: 5000,
		// 										type: 'block',
		// 										isOpenContextMenu: false,
		// 										title: 'Описание:',
		// 										subTitle: 'myFn.bind(obj)',
		// 										text: 'Указать obj(объект) которому будет принадлежать контекст (возвращает функцию); ',
		// 										img: '',
		// 										inner: [],
		// 									},
		// 									{
		// 										id: 5001,
		// 										type: 'block',
		// 										isOpenContextMenu: false,
		// 										title: 'Description2',
		// 										subTitle: '',
		// 										text: '',
		// 										img: '',
		// 										inner: [],
		// 									},
		// 									{
		// 										id: 5002,
		// 										type: 'block',
		// 										isOpenContextMenu: false,
		// 										title: '',
		// 										subTitle: '',
		// 										text: '',
		// 										img: '',
		// 										inner: [],
		// 									},
		// 									{
		// 										id: 5003,
		// 										type: 'block',
		// 										isOpenContextMenu: false,
		// 										title: 'Синтаксис:',
		// 										subTitle: '',
		// 										text: '',
		// 										img: '',
		// 										inner: [
		// 											{
		// 												id: 5004,
		// 												type: 'block',
		// 												isOpenContextMenu: false,
		// 												title: '',
		// 												subTitle: 'myFn.bind(obj)',
		// 												text: 'Указать obj(объект) которому будет    \n   принадлежать контекст (возвращает функцию); ',
		// 												img: '',
		// 												inner: [],
		// 											},
		// 											{
		// 												id: 5005,
		// 												type: 'block',
		// 												isOpenContextMenu: false,
		// 												title: '',
		// 												subTitle: 'myFn.bind(obj)',
		// 												text: 'Указать obj(объект) которому будет ' +
		// 													'принадлежать контекст (возвращает функцию); ',
		// 												img: '',
		// 												inner: [],
		// 											}
		// 										],
		// 									}
		// 								]
		// 							},
		// 							{
		// 								id: 8,
		// 								type: 'file',
		// 								name: 'fileName2',
		// 								isOpen: false,
		// 								isOpenContextMenu: false,
		// 								fileMain: []
		// 							},
		// 							{
		// 								id: 9,
		// 								type: 'file',
		// 								name: 'fileName3',
		// 								isOpen: false,
		// 								isOpenContextMenu: false,
		// 								fileMain: []
		// 							},
		// 						]
		// 					},
		// 					{
		// 						id: 5,
		// 						type: 'folder',
		// 						name: 'name',
		// 						isOpen: false,
		// 						isOpenContextMenu: false,
		// 						folderItems: [
		// 							{
		// 								id: 10,
		// 								type: 'folder',
		// 								name: 'name',
		// 								isOpen: false,
		// 								isOpenContextMenu: false,
		// 								folderItems: [
		// 									{
		// 										id: 11,
		// 										type: 'folder',
		// 										name: 'name',
		// 										isOpen: false,
		// 										isOpenContextMenu: false,
		// 										folderItems: [
		// 											{
		// 												id: 12,
		// 												type: 'folder',
		// 												name: 'name',
		// 												isOpen: false,
		// 												isOpenContextMenu: false,
		// 												folderItems: [
		// 													{
		// 														id: 13,
		// 														type: 'file',
		// 														name: 'fileName',
		// 														isOpen: false,
		// 														isOpenContextMenu: false,
		// 														fileMain: []
		// 													},
		// 													{
		// 														id: 14,
		// 														type: 'file',
		// 														name: 'fileName',
		// 														isOpen: false,
		// 														isOpenContextMenu: false,
		// 														fileMain: []
		// 													},
		// 													{
		// 														id: 15,
		// 														type: 'file',
		// 														name: 'fileName',
		// 														isOpen: false,
		// 														isOpenContextMenu: false,
		// 														fileMain: []
		// 													},
		// 												]
		// 											},
		// 										]
		// 									},
		// 								]
		// 							},
		// 						]
		// 					},
		// 					{
		// 						id: 6,
		// 						type: 'folder',
		// 						name: 'name',
		// 						isOpen: false,
		// 						isOpenContextMenu: false,
		// 						folderItems: [],
		// 					}
		// 				]
		// 			},
		// 			{
		// 				id: 3,
		// 				type: 'file',
		// 				name: 'fileName',
		// 				isOpen: false,
		// 				isOpenContextMenu: false,
		// 				fileMain: []
		// 			},
		// 		],
		// 	},
		// },

	],
};

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

let element;

function searchItemID(array = [], id) {

	for (let i = 0; i < array.length; i++) {
		if (array[i].id && array[i].id === id) {
			return element = array[i];
		}
		if (array[i].folderItems) searchItemID(array[i].folderItems, id);
		if (array[i].fileMain) searchItemID(array[i].fileMain, id);
		if (array[i].inner) searchItemID(array[i].inner, id);
	}
	return element
}

let listAndIndex = {list: [], index: null};

function searchListAndItemID(array = [], id) {

	for (let i = 0; i < array.length; i++) {
		if (array[i].id && array[i].id === id) {
			listAndIndex.list = array;
			listAndIndex.index = i;
			return;
		}
		if (array[i].folderItems) searchListAndItemID(array[i].folderItems, id);
		if (array[i].fileMain) searchListAndItemID(array[i].fileMain, id);
		if (array[i].inner) searchListAndItemID(array[i].inner, id);
	}
	return listAndIndex
}
function searchListBlock(array, id) {
	for (let i = 0; i < array.length; i++) {
		if (array[i].id === id) {
			listAndIndex.list = array;
			listAndIndex.index = i;
			return listAndIndex;
		}
		if (array[i].nav && array[i].nav.id === id) {
			listAndIndex.list = array;
			listAndIndex.index = i;
			return listAndIndex;
		}
		if (array[i].folderItems) searchListBlock(array[i].folderItems, id);
		if (array[i].fileMain) searchListBlock(array[i].fileMain, id);
		if (array[i].inner) searchListBlock(array[i].inner, id);
	}
	return listAndIndex
}


//
// let list = {list: [], index: null};
// function searchListNavItemID(array, id) {
// 	for (let i = 0; i < array.length; i++) {
// 		if (array[i].id === id) {
// 			list.list = array;
// 			list.index = i;
// 			return list;
// 		}
// 		if (array[i].panelNav && array[i].panelNav === id) {
// 			return list.list = array;
// 		} else if (array[i].panelNav) searchListNavItemID(array[i].panelNav.navItems, id)
// 		if (array[i].folderItems && array[i].id === id) {
// 			list.list = array;
// 			list.index = i;
// 			return list;
// 		} else if (array[i].folderItems) searchListNavItemID(array[i].folderItems, id)
// 	}
// 	return list
// }
//
// function deleteBlockID(array, id) {
// 	for (let i = 0; i < array.length; i++) {
// 		if (array[i].id === id) {
// 			return array.splice(i, 1);
// 		}
// 		if (array[i].panelNav && array[i].panelNav.id === id) {
// 			return array.splice(i, 1);
// 		}
// 		if (array[i].panelNav) deleteBlockID(array[i].panelNav.navItems, id);
// 		if (array[i].folderItems) deleteBlockID(array[i].folderItems, id)
// 		if (array[i].fileMain) deleteBlockID(array[i].fileMain, id)
// 		if (array[i].inner) deleteBlockID(array[i].inner, id)
// 	}
// }
//


//Reducer
let stateWorkDAL;
export const SectionReducer = (state = initialState, action) => {
	let stateCopy = JSON.parse(JSON.stringify(state));
	switch (action.type) {
		case 'UPDATE_STATE_WORK_DAL': {
			stateWorkDAL = stateCopy;
			return stateCopy;
		}
		case 'CHANGE_IS_OPEN_CONTEXT_MENU': {
			let element = searchItemID(stateCopy.sectionItems, action.id);
			element.isOpenContextMenu = action.isOpenContextMenu;
			return stateCopy;
		}
		case 'CLOSE_ALL_IS_OPEN_CONTEXT_MENU': {
			closeAllOpenContextMenuItem(stateCopy.sectionItems);
			return stateCopy;
		}
		// Section
		case 'ADD_SECTION_ITEM': {
			return stateWorkDAL;
		}
		case 'GET_SECTION_ITEM': {
			stateCopy.sectionItems = action.sectionItems;
			return stateCopy;
		}
		case 'ACTIVATE_SECTION_ITEM': {
			for (let i = 0; i < stateCopy.sectionItems.length; i++) {
				if (action.id === stateCopy.sectionItems[i].id) {
					// stateCopy.sectionItems[i].nav.isNavShow = true;
					stateCopy.sectionItems[i].isActive = true;
				} else {
					// stateCopy.sectionItems[i].nav.isNavShow = false;
					stateCopy.sectionItems[i].isActive = false;
				}
			}
			return stateCopy;
		}
		case 'CHANGE_POSITION_SECTION_ITEM': {
			return stateWorkDAL;
		}
		case 'DELETE_SECTION_ITEM': {
			return stateWorkDAL;
		}
		case 'CHANGE_SECTION_ITEM': {
			return stateWorkDAL;
		}

		//Nav
		case 'ADD_NAV_ITEM': {
			return stateWorkDAL;
		}
		case 'GET_NAV_ITEM': {

			searchItemID(stateCopy.sectionItems, action.idSectionItem).folderItems = action.folderItems;
			return stateCopy;
		}
		case 'CHANGE_IS_OPEN_ITEM': {
			let element = searchItemID(stateCopy.sectionItems, action.id);
			if (element.type === 'file') {
				closeAllFile(stateCopy.sectionItems)
			}
			element.isOpen = !element.isOpen;
			return stateCopy;
		}
		case 'CHANGE_NAME_NAV_ITEM': {
			let element = searchItemID(stateCopy.sectionItems, action.id);
			element.name = action.name;
			element.isOpenContextMenu = false;
			return stateCopy;
		}
		case 'DELETE_NAV_ITEM': {
			let listAndIndex = searchListAndItemID(stateCopy.sectionItems, action.id);
			listAndIndex.list.splice(listAndIndex.index, 1);
			return stateCopy;
		}

		//Main
		case 'ADD_BLOCK_IN_ACTIVE_FILE': {
			let element = searchItemID(stateCopy.sectionItems, action.id);
			element.fileMain.push({
				id: new Date().getTime(),
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

		//

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

//AC UPDATE_STATE_WORK_DAL:
export const updateStateWorkDAL = () => {
	return {
		type: 'UPDATE_STATE_WORK_DAL',
	}
};
//AC ADD_SECTION_ITEM:
export const addSectionItemAC = () => {
	return {
		type: 'ADD_SECTION_ITEM',
	}
};
//	THUNK addSectionItem:
export const addSectionItem = (userId) => {

	return (dispatch) => {
		dispatch(updateStateWorkDAL());
		stateWorkDAL.sectionItems.push({
			id: new Date().getTime(),
			name: 'Name',
			url: '',
			position: stateWorkDAL.sectionItems.length,
			isActive: false,
			isOpenContextMenu: false,
			folderItems: [],
		});
		setSectionItemDAL(stateWorkDAL.sectionItems, userId)
		.then((resolve) => {
			dispatch(addSectionItemAC());
		});
	}
};
//AC ACTIVATE_SECTION_ITEM:
export const activateSectionItem = (id) => {
	return {
		type: 'ACTIVATE_SECTION_ITEM',
		id: id,
	}
};
//changeIsOpenContextMenu AC:
export const changeIsOpenContextMenu = (id, isOpenContextMenu) => {
	return {
		type: 'CHANGE_IS_OPEN_CONTEXT_MENU',
		id: id,
		isOpenContextMenu: isOpenContextMenu,
	}
};
//closeAllIsOpenContextMenu AC:
export const closeAllIsOpenContextMenu = () => {
	return {
		type: 'CLOSE_ALL_IS_OPEN_CONTEXT_MENU',
	}
};
//changePositionSectionItem AC:
export const changePositionSectionItemAC = (id, side) => {
	return {
		type: 'CHANGE_POSITION_SECTION_ITEM',
		id: id,
		side: side,
	}
};
//	THUNK changePositionSectionItem:
export const changePositionSectionItem = (id, side, userId) => {
	return (dispatch) => {
		dispatch(closeAllIsOpenContextMenu());
		dispatch(updateStateWorkDAL());

		let element = searchListBlock(stateWorkDAL.sectionItems, id);
		if (side === 'up') {
			if (element.index > 0) {
				let elemCopy = element.list[element.index - 1];
				element.list[element.index - 1] = element.list[element.index];
				element.list[element.index] = elemCopy;
			}
		} else if (side === 'down' && element.index + 1 < element.list.length) {
			let elemCopy = element.list[element.index + 1];
			element.list[element.index + 1] = element.list[element.index];
			element.list[element.index] = elemCopy;
		}
		setSectionItemDAL(stateWorkDAL.sectionItems, userId)
		.then((resolve) => {
			dispatch(changePositionSectionItemAC());
		});
	}
};
//AC DELETE_SECTION_ITEM:
export const deleteSectionItemAC = () => {
	return {
		type: 'DELETE_SECTION_ITEM',
	}
};
//	THUNK deleteSectionItem:
export const deleteSectionItem = (id, userId) => {
	return (dispatch) => {
		dispatch(closeAllIsOpenContextMenu());
		dispatch(updateStateWorkDAL());

		let index = stateWorkDAL.sectionItems.findIndex(el => el.id === id);
		stateWorkDAL.sectionItems.splice(index, 1);
		deleteSectionItemDAL(id, userId).then(resolve => {
			setSectionItemDAL(stateWorkDAL.sectionItems, userId)
			.then((resolve) => {
				dispatch(deleteSectionItemAC());
			});
		});
	}
};
//AC DELETE_NAV_ITEM:
export const deleteNavItemAC = (id) => {
	return {
		type: 'DELETE_NAV_ITEM',
		id: id,
	}
};
//	THUNK deleteNavItem:
export const deleteNavItem = (id,userId) => {
	return (dispatch) => {
		dispatch(closeAllIsOpenContextMenu());
		dispatch(deleteNavItemAC(id));
		dispatch(updateStateWorkDAL());
		updateSectionItemDAL(stateWorkDAL.sectionItems.find(el => el.isActive), userId).then(()=>{
			setSectionItemDAL(stateWorkDAL.sectionItems,userId).then()
		});
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
		dispatch(closeAllIsOpenContextMenu());
		dispatch(updateStateWorkDAL());
		let element = stateWorkDAL.sectionItems.find(el => el.id === id);
		if (name !== '') {
			element.name = name;
		} else element.url = url;
		setSectionItemDAL(stateWorkDAL.sectionItems, userId)
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
//	THUNK addNavItem:
export const addNavItem = (typeItemNav, id, userId) => {

	return (dispatch) => {
		dispatch(closeAllIsOpenContextMenu());
		dispatch(updateStateWorkDAL());
		let el = searchItemID(stateWorkDAL.sectionItems, id);
		if (el.folderItems) {
			el.folderItems.push(
				typeItemNav === 'folder'
					? {
						id: new Date().getTime(),
						type: 'folder',
						isOpen: false,
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
//AC GET_NAV_ITEM:
export const getNavItemAC = (folderItems, idSectionItem) => {
	return {
		type: 'GET_NAV_ITEM',
		folderItems: folderItems,
		idSectionItem: idSectionItem,
	}
};
//AC GET_SECTION_ITEM:
export const getSectionItemsAC = (sectionItems) => {
	return {
		type: 'GET_SECTION_ITEM',
		sectionItems: sectionItems,
	}
};
//	THUNK getSectionItem:
export const getData = (userId = '') => {

	return (dispatch) => {
		dispatch(updateStateWorkDAL());
		if (userId !== '') {
			getSectionItemDAL(userId).then((data) => {
				if (data) {
					dispatch(getSectionItemsAC(data.sectionItems));
					dispatch(updateStateWorkDAL());

					let activeSectionItem = stateWorkDAL.sectionItems.find(el => el.isActive);
					getNavItemsDAL(activeSectionItem, userId)
					.then((data) => {
						if (data && data.folderItems) {
							dispatch(getNavItemAC(data.folderItems, activeSectionItem.id))
						}
					});

					for (let i = 0; i < stateWorkDAL.sectionItems.length; i++) {
						if (!stateWorkDAL.sectionItems[i].isActive) {
							getNavItemsDAL(stateWorkDAL.sectionItems[i], userId)
							.then((data) => {
								if (data && data.folderItems) {
									dispatch(getNavItemAC(data.folderItems, stateWorkDAL.sectionItems[i].id))
								}
							});
						}
					}
				}
			});
		}

		// stateWorkDAL.sectionItems.push({
		// 	id: new Date().getTime(),
		// 	name: 'Name',
		// 	url: '',
		// 	position: stateWorkDAL.sectionItems.length,
		// 	isActive: false,
		// 	isOpenContextMenu: false,
		// 	nav: {
		// 		parentName: 'Name',
		// 		folderItems: [],
		// 	},
		// });
		// setSectionItemDAL(stateWorkDAL.sectionItems, userId)
		// .then((resolve) => {
		// 	dispatch(addSectionItemAC(userId));
		// });
	}
};
//CHANGE_IS_OPEN_ITEM AC:
export const changeIsOpenItem = (id) => {
	return {
		type: 'CHANGE_IS_OPEN_ITEM',
		id: id,
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
//	THUNK changeNameNavItem:
export const changeNameNavItem = (id, name, userId, activeSection) => {

	return (dispatch) => {
		dispatch(changeNameNavItemAC(id, name));
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
//	THUNK addBlockInActiveFile:
export const addBlockInActiveFile = (activeFile, userId) => {
	return (dispatch) => {
		dispatch(addBlockInActiveFileAC(activeFile.id));
		dispatch(updateStateWorkDAL());
		updateSectionItemDAL(stateWorkDAL.sectionItems.find(el => el.isActive), userId).then();
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
// export const addBlockInActiveFile = (id) => {
// 	return {
// 		type: 'ADD_BLOCK_IN_ACTIVE_FILE',
// 		id: id,
// 	}
// };






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
export const changeSubTitleInBlock = (id, subTitle) => {
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

