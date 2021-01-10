import firebase from "firebase/app";
import "firebase/firestore";
import {
	deleteSectionItemDAL,
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
	activeFileName: '',
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
	}
	return element
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
export const SectionReducer = (state = initialState, action) => {
	let stateCopy = JSON.parse(JSON.stringify(state));
	switch (action.type) {

		case 'UPDATE_STATE_WORK_DAL': {
			stateWorkDAL = stateCopy;
			return stateCopy;
		}
		case 'CHANGE_ACTIVE_FILE_NAME': {
			stateCopy.activeFileName = action.name;
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
				closeAllFile(stateCopy.sectionItems);
				stateCopy.activeFileName = element.name;
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
		case 'CHANGE_POSITION_NAV_ITEM': {
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
				fileMain: [],
			});
			return stateCopy;
		}
		case 'CHANGE_TITLE_IN_BLOCK': {
			let element = searchItemID(stateCopy.sectionItems, action.id);
			element.title = action.title;
			return stateCopy;
		}
		case 'CHANGE_SUB_TITLE_IN_BLOCK': {
			let element = searchItemID(stateCopy.sectionItems, action.id);
			element.subTitle = action.subTitle;
			return stateCopy;
		}
		case 'CHANGE_TEXT_IN_BLOCK': {
			let element = searchItemID(stateCopy.sectionItems, action.id);
			element.text = action.text;
			return stateCopy;
		}
		case 'DELETE_BLOCK': {
			let element = searchListAndItemID(stateCopy.sectionItems, action.id);
			element.list.splice(element.index,1)
			return stateCopy;
		}
		//

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
//AC changeActiveFileName:
export const changeActiveFileName = (name) => {
	return {
		type: 'CHANGE_ACTIVE_FILE_NAME',
		name: name,
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
					if (activeSectionItem) {
						getNavItemsDAL(activeSectionItem.id, userId)
						.then((data) => {
							if (data && data.folderItems) {
								dispatch(getNavItemAC(data.folderItems, activeSectionItem.id))
								dispatch(closeAllIsOpenContextMenu());
							}
						});
					}
					for (let i = 0; i < stateWorkDAL.sectionItems.length; i++) {
						if (!stateWorkDAL.sectionItems[i].isActive) {
							getNavItemsDAL(stateWorkDAL.sectionItems[i].id, userId)
							.then((data) => {
								if (data && data.folderItems) {
									dispatch(getNavItemAC(data.folderItems, stateWorkDAL.sectionItems[i].id))
									dispatch(closeAllIsOpenContextMenu());
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
export const activateSectionItemAC = (id) => {
	return {
		type: 'ACTIVATE_SECTION_ITEM',
		id: id,
	}
};
//THUNK activateSectionItem:
export const activateSectionItem = (id, userId) => {
	return (dispatch) => {
		dispatch(activateSectionItemAC(id));
		dispatch(changeActiveFileName(""));
		dispatch(updateStateWorkDAL());
		setSectionItemDAL(stateWorkDAL.sectionItems, userId).then();
	}
};

//AC changePositionSectionItem:
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
		let element = searchListAndItemID(stateWorkDAL.sectionItems, id);
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
//	THUNK changeIsOpenItem:
export const changeIsOpenItem = (id, userId) => {

	return (dispatch) => {
		dispatch(changeIsOpenItemAC(id));
		dispatch(updateStateWorkDAL());
		updateSectionItemDAL(stateWorkDAL.sectionItems.find(el => el.isActive), userId).then(()=>{
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
//	THUNK changeNameNavItem:
export const changeNameNavItem = (id, name, userId, activeSection) => {

	return (dispatch) => {
		dispatch(changeNameNavItemAC(id, name));
		dispatch(changeActiveFileName(name));
		dispatch(updateStateWorkDAL());
		updateSectionItemDAL(stateWorkDAL.sectionItems.find(el => el.isActive), userId).then();
	}
};

//AC changePositionUpNavItem:
export const changePositionNavItemAC = (id, side) => {
	return {
		type: 'CHANGE_POSITION_NAV_ITEM',
		id: id,
		side: side,
	}
};
//	THUNK changePositionNavItem:
export const changePositionNavItem = (id, side, userId) => {

	return (dispatch) => {
		dispatch(changePositionNavItemAC(id, side));
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

//AC changeTitleInBlock:
export const changeTitleInBlockAC = (id, title) => {
	return {
		type: 'CHANGE_TITLE_IN_BLOCK',
		id: id,
		title: title,
	}
};
//	THUNK changeTitleInBlock:
export const changeTitleInBlock = (activeFile,title, userId) => {
	return (dispatch) => {
		dispatch(changeTitleInBlockAC(activeFile.id,title));
		dispatch(updateStateWorkDAL());
		updateSectionItemDAL(stateWorkDAL.sectionItems.find(el => el.isActive), userId).then();
	}
};

//AC changeSubTitleInBlockAC:
export const changeSubTitleInBlockAC = (id, subTitle) => {
	return {
		type: 'CHANGE_SUB_TITLE_IN_BLOCK',
		id: id,
		subTitle: subTitle,
	}
};
//THUNK changeSubTitleInBlock:
export const changeSubTitleInBlock = (activeFile,subTitle, userId) => {
	return (dispatch) => {
		dispatch(changeSubTitleInBlockAC(activeFile.id,subTitle));
		dispatch(updateStateWorkDAL());
		updateSectionItemDAL(stateWorkDAL.sectionItems.find(el => el.isActive), userId).then();
	}
};

//AC changeTextInBlockAC:
export const changeTextInBlockAC = (id, text) => {
	return {
		type: 'CHANGE_TEXT_IN_BLOCK',
		id: id,
		text: text,
	}
};
//THUNK changeTextInBlock:
export const changeTextInBlock = (activeFile,text, userId) => {
	return (dispatch) => {
		dispatch(changeTextInBlockAC(activeFile.id,text));
		dispatch(updateStateWorkDAL());
		updateSectionItemDAL(stateWorkDAL.sectionItems.find(el => el.isActive), userId).then();
	}
};

//AC deleteBlockAC:
export const deleteBlockAC = (id) => {
	return {
		type: 'DELETE_BLOCK',
		id: id,
	}
};
//THUNK deleteBlock:
export const deleteBlock = (id, userId) => {
	return (dispatch) => {
		dispatch(deleteBlockAC(id));
		dispatch(updateStateWorkDAL());
		updateSectionItemDAL(stateWorkDAL.sectionItems.find(el => el.isActive), userId).then();
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

