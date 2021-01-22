import firebase from "firebase/app";
import "firebase/firestore";
import {
	deleteSectionItemDAL, getActiveNavItemsDAL,
	getSectionItemDAL, setNavInSectionDAL,
	updateSectionItemDAL, updateSectionItemsListDAL
} from "../../DAL/DAL_Section";
import {addMessageAC, changeActiveElement, changeIsLoadingAC, closeAllContextMenuTHUNK} from "./AppReducer";

//вспомогательные функции
function closeAllOpenContextMenuItem(items = []) {
	for (let i = 0; i < items.length; i++) {
		if (items[i].isOpenContextMenu) {
			items[i].isOpenContextMenu = false;
		}
		if (items[i].folderItems) closeAllOpenContextMenuItem(items[i].folderItems);
		if (items[i].fileMain) closeAllOpenContextMenuItem(items[i].fileMain);
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

function closeAllFolder(items) {
	for (let i = 0; i < items.length; i++) {
		if (items[i].isOpen && items[i].type === 'folder') {
			items[i].isOpen = false;
		}
		if (items[i].folderItems) closeAllFolder(items[i].folderItems);
	}
}



function searchListAndItemID(array, id) {
	let listAndIndex = {list: [], index: null};
	const find = (array = [], id) => {
		for (let i = 0; i < array.length; i++) {
			if (array[i].id && array[i].id === id) {
				listAndIndex.list = array;
				listAndIndex.index = i;
				return listAndIndex;
			}
			if (array[i].folderItems) find(array[i].folderItems, id);
			if (array[i].fileMain) find(array[i].fileMain, id);
		}
	};
	find(array, id);
	return listAndIndex
}

function changeAllId(el) {
	let id = new Date().getTime();
	el.id = ++id;

	const changeId = (items) => {
		for (let i = 0; i < items.length; i++) {
			items[i].id = ++id;
			items[i].isOpen = false;
			if (items[i].folderItems) changeId(items[i].folderItems);
			if (items[i].fileMain) changeId(items[i].fileMain);
		}
	};
	if (el.folderItems) {
		changeId(el.folderItems);
	}
	if (el.fileMain) {
		changeId(el.fileMain);
	}
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
			listAndIndex.list.splice(listAndIndex.index, 1);
			return stateCopy;
		}

		// Section
		case 'APPEND_SECTION_ITEM': {
			stateCopy.sectionItems = action.sectionItems;
			return stateCopy;
		}
		case 'ADD_SECTION_ITEM': {
			stateCopy.sectionItems.push({
				id: action.newId,
				name: 'Name',
				url: '',
				position: stateCopy.sectionItems.length,
				isActive: false,
				isOpenContextMenu: false,
				isLoading: true,
				folderItems: [],
			});
			return stateCopy;
		}
		case 'ACTIVATE_SECTION_ITEM': {
			for (let i = 0; i < stateCopy.sectionItems.length; i++) {
				stateCopy.sectionItems[i].isActive = action.id === stateCopy.sectionItems[i].id;
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
		case 'CLOSE_ALL_FOLDER': {
			closeAllFolder(stateCopy.sectionItems.find(el=> el.isActive).folderItems);
			return stateCopy;
		}

		//Main
		case 'ADD_BLOCK_IN_ACTIVE_FILE': {
			let listAndItem = searchListAndItemID(stateCopy.sectionItems, action.id);
			if (listAndItem.list[listAndItem.index].type === 'block'){
				let arr = [...listAndItem.list.slice(0,listAndItem.index+1)];
				let arr2 = [...listAndItem.list.slice(listAndItem.index+1,listAndItem.list.length)];
				let list = [...arr, {
					id: new Date().getTime(),
					type: 'block',
					isOpenContextMenu: false,
					title: '',
					subTitle: '',
					text: '',
					isBorder: true,
					img: '',
				},...arr2];
				listAndItem.list.splice(0);
				listAndItem.list.push(...list);
			}else {
				listAndItem.list[listAndItem.index].fileMain.push({
					id: new Date().getTime(),
					type: 'block',
					isOpenContextMenu: false,
					title: '',
					subTitle: '',
					text: '',
					isBorder: true,
					img: '',
				});
			}
			return stateCopy;
		}
		case 'CHANGE_BLOCK': {
			let listAndItem = searchListAndItemID(stateCopy.sectionItems, action.id);
			listAndItem.list[listAndItem.index].title = action.title;
			listAndItem.list[listAndItem.index].subTitle = action.subTitle;
			listAndItem.list[listAndItem.index].text = action.text;
			return stateCopy;
		}
		case 'CHANGE_BLOCK_BORDER': {
			let listAndItem = searchListAndItemID(stateCopy.sectionItems, action.id);
			listAndItem.list[listAndItem.index].isBorder = !listAndItem.list[listAndItem.index].isBorder;
			return stateCopy;
		}

		//Copy Past
		case 'COPY_PAST': {

			return stateCopy;
		}

		//Demo
		case 'ADD_DEMO_STATE': {
			let idCounter = 0;
			stateCopy.sectionItems = [
				{
					id: idCounter++,
					name: 'React',
					url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIv8fBQrENZkbTNIWFKmkKA8pvwDPqdDslKw&usqp=CAU',
					position: 1,
					isActive: false,
					isOpenContextMenu: false,
					isLoading: true,
					folderItems: [
						{
							id: idCounter++,
							type: 'folder',
							isOpen: true,
							isOpenContextMenu: false,
							name: 'Basic',
							folderItems: [
								{
									id: idCounter++,
									type: 'file',
									isOpen: false,
									isOpenContextMenu: false,
									name: 'Концепция',
									fileMain: []
								}, {
									id: idCounter++,
									type: 'file',
									isOpen: true,
									isOpenContextMenu: false,
									name: 'JSX',
									fileMain: [
										{
											id: idCounter++,
											type: 'block',
											isOpenContextMenu: false,
											title: 'Основные Правила:',
											subTitle: '',
											text: '',
											isBorder: false,
											img: '',
										},
										{
											id: idCounter++,
											type: 'block',
											isOpenContextMenu: false,
											title: '',
											subTitle: '',
											text: 'Разширение языка JS, которое с помощью Babel преобразует код JSX (синтаксис HTML) в JS код понятный браузеру.',
											isBorder: true,
											img: '',
										},
										{
											id: idCounter++,
											type: 'block',
											isOpenContextMenu: false,
											title: '',
											subTitle: '',
											text: 'Допускает использование корректных JS-выражений внутри JSX в фигурных скобках { JS }.',
											isBorder: true,
											img: '',
										},
										{
											id: idCounter++,
											type: 'block',
											isOpenContextMenu: false,
											title: '',
											subTitle: '',
											text: 'Защищен от атак межсайтовым скриптингом (XSS), все значения в JSX экранируются (преобразуются в строки), и далее рендерятся.',
											isBorder: true,
											img: '',
										},
										{
											id: idCounter++,
											type: 'block',
											isOpenContextMenu: false,
											title: '',
											subTitle: '',
											text: 'Использует атрибуты (стиль наименования camelCase, в отличии от HTML).',
											isBorder: true,
											img: '',
										},
									]
								},
							]
						},
					],
				},
				{
					id: idCounter++,
					name: 'Photoshop',
					url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b1f444f5-ca6c-4df3-8c44-ec6e0276f5ac/d7mg13s-036bcbe7-b460-42f2-a75d-da9d2cad8594.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYjFmNDQ0ZjUtY2E2Yy00ZGYzLThjNDQtZWM2ZTAyNzZmNWFjXC9kN21nMTNzLTAzNmJjYmU3LWI0NjAtNDJmMi1hNzVkLWRhOWQyY2FkODU5NC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.GW7CcxdPXScOtSWr_UBv4K6hCqTbBcNfmjLkd87W9gQ',
					position: 0,
					isActive: true,
					isOpenContextMenu: false,
					isLoading: true,
					folderItems: [
						{
							id: idCounter++,
							type: 'folder',
							isOpen: true,
							isOpenContextMenu: false,
							name: 'Настроки',
							folderItems: [
								{
									id: idCounter++,
									type: 'file',
									isOpen: true,
									isOpenContextMenu: false,
									name: 'Горячие клавиши',
									fileMain: [
										{
											id: idCounter++,
											type: 'block',
											isOpenContextMenu: false,
											title: 'Для Windows',
											subTitle: '',
											text: '',
											isBorder: false,
											img: '',
											fileMain: [],
										},
										{
											id: idCounter++,
											type: 'block',
											isOpenContextMenu: false,
											title: '',
											subTitle: '',
											text: 'Заливка слоя основным или фоновым цветом используются сочетания клавиш Alt+Backspace и Ctrl+Backspace. Для вызова окна настроек заливки Shift+Backspace. Для того, чтобы оставить прозрачные места снимка прозрачными, нужно пользоваться сочетанием клавиш Alt+Shift+Backspace и Ctrl+Shift+Backspace.',
											isBorder: true,
											img: '',
											fileMain: [],
										},

										{
											id: idCounter++,
											type: 'block',
											isOpenContextMenu: false,
											title: '',
											subTitle: '',
											text: 'Отмена нескольких действий или возврата нескольких действий нужно использовать сочетание клавиш Ctrl+Alt+Z и Ctrl+Shift+Z. Для циклической отмены и возврата одного последнего действия используется Ctrl+Z.',
											isBorder: true,
											img: '',
											fileMain: [],
										},

										{
											id: idCounter++,
											type: 'block',
											isOpenContextMenu: false,
											title: '',
											subTitle: '',
											text: 'При активном инструменте Eyedropper Tool и зажатой клавише Alt будет выбираться не основной цвет, а фоновый.',
											isBorder: true,
											img: '',
											fileMain: [],
										},

										{
											id: idCounter++,
											type: 'block',
											isOpenContextMenu: false,
											title: '',
											subTitle: '',
											text: 'При зажатой клавише Ctrl "+" или "-" приведет к изменению масштаба изображения.',
											isBorder: true,
											img: '',
											fileMain: [],
										},

										{
											id: idCounter++,
											type: 'block',
											isOpenContextMenu: false,
											title: '',
											subTitle: '',
											text: 'При активном инструменте Eyedropper Tool и зажатой клавише Alt будет выбираться не основной цвет, а фоновый.',
											isBorder: true,
											img: '',
											fileMain: [],
										},

										{
											id: idCounter++,
											type: 'block',
											isOpenContextMenu: false,
											title: '',
											subTitle: '',
											text: 'Отмена нескольких действий или возврата нескольких действий нужно использовать сочетание клавиш Ctrl+Alt+Z и Ctrl+Shift+Z. Для циклической отмены и возврата одного последнего действия используется Ctrl+Z.',
											isBorder: true,
											img: '',
											fileMain: [],
										},

										{
											id: idCounter++,
											type: 'block',
											isOpenContextMenu: false,
											title: '',
											subTitle: '',
											text: 'text: \'Заливка слоя основным или фоновым цветом используются сочетания клавиш Alt+Backspace и Ctrl+Backspace. Для вызова окна настроек заливки Shift+Backspace. Для того, чтобы оставить прозрачные места снимка прозрачными, нужно пользоваться сочетанием клавиш Alt+Shift+Backspace и Ctrl+Shift+Backspace.\',\n' +
												'\t\t\t\t\t\t\t\t\t\t\t',
											isBorder: true,
											img: '',
											fileMain: [],
										},

										{
											id: idCounter++,
											type: 'block',
											isOpenContextMenu: false,
											title: 'Для Mac OS',
											subTitle: '',
											text: '',
											isBorder: false,
											img: '',
											fileMain: [],
										},
										{
											id: idCounter++,
											type: 'block',
											isOpenContextMenu: false,
											title: '',
											subTitle: 'с мышкой:',
											text: 'Cmd+Space+клик - увеличение масштаба, Cmd+Space+клик - уменьшение. При зажатой клавише Cmd+вращение колесика мыши - масштабирование.',
											isBorder: true,
											img: '',
											fileMain: [],
										},
										{
											id: idCounter++,
											type: 'block',
											isOpenContextMenu: false,
											title: '',
											subTitle: 'трекпад:',
											text: 'Cmd+Space+клик - увеличение масштаба, Cmd+Space+клик - уменьшение. При зажатой клавише Cmd+вращение колесика мыши - масштабирование.',
											isBorder: true,
											img: '',
											fileMain: [],
										},
									]
								}, {
									id: idCounter++,
									type: 'file',
									isOpen: false,
									isOpenContextMenu: false,
									name: 'Шрифты',
									fileMain: []
								},
							]
						},
						{
							id: idCounter++,
							type: 'folder',
							isOpen: true,
							isOpenContextMenu: false,
							name: 'Обработка',
							folderItems: [
								{
									id: idCounter++,
									type: 'file',
									isOpen: false,
									isOpenContextMenu: false,
									name: '.jpeg',
									fileMain: []
								},
								{
									id: idCounter++,
									type: 'file',
									isOpen: false,
									isOpenContextMenu: false,
									name: '.png',
									fileMain: []
								},
								{
									id: idCounter++,
									type: 'file',
									isOpen: false,
									isOpenContextMenu: false,
									name: '.gif',
									fileMain: []
								},
							]
						},
						{
							id: idCounter++,
							type: 'folder',
							isOpen: true,
							isOpenContextMenu: false,
							name: 'Панель инструментов',
							folderItems: [
								{
									id: idCounter++,
									type: 'folder',
									isOpen: true,
									isOpenContextMenu: false,
									name: 'Фон',
									folderItems: [
										{
											id: idCounter++,
											type: 'file',
											isOpen: false,
											isOpenContextMenu: false,
											name: 'Цветной',
											fileMain: []
										},
										{
											id: idCounter++,
											type: 'file',
											isOpen: false,
											isOpenContextMenu: false,
											name: 'Прозрачный',
											fileMain: []
										},
										{
											id: idCounter++,
											type: 'file',
											isOpen: false,
											isOpenContextMenu: false,
											name: 'Двойной',
											fileMain: []
										},
									]
								},
								{
									id: idCounter++,
									type: 'folder',
									isOpen: true,
									isOpenContextMenu: false,
									name: 'Граница',
									folderItems: [
										{
											id: idCounter++,
											type: 'file',
											isOpen: false,
											isOpenContextMenu: false,
											name: 'Внутреняя',
											fileMain: []
										},
										{
											id: idCounter++,
											type: 'file',
											isOpen: false,
											isOpenContextMenu: false,
											name: 'Внешняя',
											fileMain: []
										},
									]
								},
							]
						},
					],
				},
				{
					id: idCounter++,
					name: 'Name',
					url: '',
					position: 2,
					isActive: false,
					isOpenContextMenu: false,
					isLoading: true,
					folderItems: [],
				},
				{
					id: idCounter++,
					name: 'Name',
					url: '',
					position: 3,
					isActive: false,
					isOpenContextMenu: false,
					isLoading: true,
					folderItems: [],
				},
				{
					id: idCounter++,
					name: 'Name',
					url: 'https://media1.giphy.com/media/OGGwlV1RYgX2U/200w.webp?cid=ecf05e47b634e0e7662d1340792fb704672c6665e8bc272b&rid=200w.webp',
					position: 4,
					isActive: false,
					isOpenContextMenu: false,
					isLoading: true,
					folderItems: [],
				},
			];
			return stateCopy;
		}
		case 'CLEAR_STATE': {
			stateCopy.sectionItems = [];
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

//AC CLOSE_ALL_FOLDER:
export const closeAllFolderAC = () => {
	return {
		type: 'CLOSE_ALL_FOLDER',
	}
};
//THUNK closeAllFolderTHUNK:
export const closeAllFolderTHUNK = ( userId) => {
	return (dispatch) => {
		dispatch(closeAllFolderAC());
		dispatch(updateStateWorkDAL());
		if (userId !== '') {
			updateSectionItemDAL(stateWorkDAL.sectionItems.find(el => el.isActive), userId).then(() => {
				dispatch(addMessageAC('success', `Ваши папки собраны.`));
			}).catch((error) => {
				dispatch(addMessageAC('error', error.message));
			});
		} else {
			dispatch(addMessageAC('success', `DEMO MODE! \n Ваши папки собраны.`));

		}
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
//AC CLEAR_STATE:
export const clearStateAC = () => {
	return {
		type: 'CLEAR_STATE',
	}
};
//THUNK getDataTHUNK:
export const getDataTHUNK = (userId = '') => {
	return (dispatch) => {
		dispatch(updateStateWorkDAL());
		if (userId !== '') {
			dispatch(clearStateAC());
			dispatch(updateStateWorkDAL());
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
				if (data && data.activeNavItems && data.activeNavItems.folderItems) {
					dispatch(appendNavItemAC(data.activeNavItems.folderItems, data.activeSectionItem.id));
					dispatch(closeAllIsOpenContextMenuItemsAC());
				}
				return data
			})
			.then((data) => {
				if (data) {
					data.activeSectionItem && dispatch(changeIsLoadingSectionItemAC(data.activeSectionItem.id, true));
				}
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
			})
			.then(() => {
				dispatch(addMessageAC('success', `Все данные получены.`));
			})
			.catch((error) => {
				dispatch(addMessageAC('error', error.message))
			});
		} else {
		}
	}
};

//AC ADD_SECTION_ITEM:
export const addSectionItemAC = (newId) => {
	return {
		type: 'ADD_SECTION_ITEM',
		newId: newId,
	}
};
//THUNK addSectionItem:
export const addSectionItemTHUNK = (userId) => {

	return (dispatch) => {
		const newId = new Date().getTime();
		dispatch(addSectionItemAC(newId));
		dispatch(updateStateWorkDAL());
		dispatch(activateSectionItemTHUNK(newId, userId));
		if (userId !== '') {
			updateSectionItemsListDAL(stateWorkDAL.sectionItems, userId)
			.then((resolve) => {
				dispatch(addMessageAC('success', `Секция добавленна.`));
			}).catch((error) => {
				dispatch(addMessageAC('error', error.message));
			});
		} else {
			dispatch(addMessageAC('success', `DEMO MODE! \n Секция добавленна.`));
		}
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
		if (userId !== '') {
			dispatch(updateStateWorkDAL());
			updateSectionItemsListDAL(stateWorkDAL.sectionItems, userId).then().catch((error) => {
				dispatch(addMessageAC('error', error.message));
			});
		}
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
		if (userId !== '') {
			switch (typeDelete) {
				case 'sectionItem':
					dispatch(updateStateWorkDAL());
					deleteSectionItemDAL(id, userId).then(resolve => {
						updateSectionItemsListDAL(stateWorkDAL.sectionItems, userId).then(() => {
							dispatch(addMessageAC('success', `Секция удалена.`));
						}).catch((error) => {
							dispatch(addMessageAC('error', error.message));
						});
					});
					break;
				case 'element':
					dispatch(updateStateWorkDAL());
					updateSectionItemDAL(stateWorkDAL.sectionItems.find(el => el.isActive), userId).then(() => {
						dispatch(addMessageAC('success', `Элемент удален.`));
					}).catch((error) => {
						dispatch(addMessageAC('error', error.message));
					});
					break;
			}
		} else {
			dispatch(addMessageAC('success', `DEMO MODE! \n Элемент удален.`));
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
		if (userId !== '') {
			updateSectionItemsListDAL(stateWorkDAL.sectionItems, userId)
			.then((resolve) => {
				dispatch(changeSectionItemAC());
				dispatch(addMessageAC('success', `Секция изменена.`));
			}).catch((error) => {
				dispatch(addMessageAC('error', error.message));
			});
		} else {
			dispatch(changeSectionItemAC());
			dispatch(addMessageAC('success', `DEMO MODE! \n Секция изменена.`));
		}
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
		if (userId !== '') {
			setNavInSectionDAL(stateWorkDAL.sectionItems, userId)
			.then((resolve) => {
				dispatch(addNavItemAC());
				// dispatch(addMessageAC('success', `Элемент навигации добавлен.`));
			}).catch((error) => {
				dispatch(addMessageAC('error', error.message));
			});
		}
	}
};

//AC CHANGE_IS_OPEN_ITEM:
export const changeIsOpenItemAC = (id) => {
	return {
		type: 'CHANGE_IS_OPEN_ITEM',
		id: id,
	}
};
//THUNK changeIsOpenItemTHUNK:
export const changeIsOpenItemTHUNK = (id, userId) => {
	return (dispatch) => {
		dispatch(changeIsOpenItemAC(id));
		dispatch(updateStateWorkDAL());
		if (userId !== '') {
			updateSectionItemDAL(stateWorkDAL.sectionItems.find(el => el.isActive), userId).then(() => {
			}).catch((error) => {
				dispatch(addMessageAC('error', error.message));
			});
		}
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
		if (userId !== '') {
			updateSectionItemDAL(stateWorkDAL.sectionItems.find(el => el.isActive), userId).then(() => {
				// dispatch(addMessageAC('success', `Данные обновленны.`));
			}).catch((error) => {
				dispatch(addMessageAC('error', error.message));
			});
		}
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
		if (userId !== '') {
			updateSectionItemDAL(stateWorkDAL.sectionItems.find(el => el.isActive), userId).then().catch((error) => {
				dispatch(addMessageAC('error', error.message));
			});
		}
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
		if (userId !== '') {
			updateSectionItemDAL(stateWorkDAL.sectionItems.find(el => el.isActive), userId).then(() => {
				// dispatch(addMessageAC('success', `Секция удалена.`));
			}).catch((error) => {
				dispatch(addMessageAC('error', error.message));
			});
		}
	}
};

//AC CHANGE_BLOCK:
export const changeBlockAC = (id, title, subTitle, text) => {
	return {
		type: 'CHANGE_BLOCK',
		id: id,
		title: title,
		subTitle: subTitle,
		text: text,
	}
};
//THUNK changeBlockTHUNK:
export const changeBlockTHUNK = (id, title, subTitle, text, userId) => {
	return (dispatch) => {
		dispatch(changeBlockAC(id, title, subTitle, text));
		dispatch(updateStateWorkDAL());
		if (userId !== '') {
			updateSectionItemDAL(stateWorkDAL.sectionItems.find(el => el.isActive), userId).then(() => {
				dispatch(addMessageAC('success', `Блок успешно изменен.`));
			}).catch((error) => {
				dispatch(addMessageAC('error', error.message));
			});
		} else {
			dispatch(addMessageAC('success', `DEMO MODE! \n Блок успешно изменен.`));

		}
	}
};

//AC CHANGE_BLOCK_BORDER:
export const changeBlockBorderAC = (id) => {
	return {
		type: 'CHANGE_BLOCK_BORDER',
		id: id,
	}
};
//THUNK changeBlockBorderTHUNK:
export const changeBlockBorderTHUNK = (id, userId) => {
	return (dispatch) => {
		dispatch(changeBlockBorderAC(id));
		dispatch(updateStateWorkDAL());
		if (userId !== '') {
			updateSectionItemDAL(stateWorkDAL.sectionItems.find(el => el.isActive), userId).then(() => {
				dispatch(addMessageAC('success', `Блок успешно изменен.`));
			}).catch((error) => {
				dispatch(addMessageAC('error', error.message));
			});
		} else {
			dispatch(addMessageAC('success', `DEMO MODE! \n Блок успешно изменен.`));

		}
	}
};

//AC COPY_PAST:
export const pastElementAC = () => {
	return {
		type: 'COPY_PAST',
	}
};
//THUNK pastElementTHUNK:
export const pastElementTHUNK = (elementString, activeElementId, userId) => {
	return (dispatch) => {
		dispatch(closeAllContextMenuTHUNK());
		dispatch(updateStateWorkDAL());
		try {
			let el = JSON.parse(elementString);
			let lai = searchListAndItemID(stateWorkDAL.sectionItems, activeElementId);
			changeAllId(el);
			// debugger
			switch (el.type) {
				case 'folder':
					el.isOpen = false;
					el.isOpenContextMenu = false;
					if (lai.list[lai.index].type === 'folder'){
						lai.list[lai.index].isOpen = true;
						lai.list[lai.index].folderItems.push(el);
					}else if (lai.list[lai.index].type === 'file'){
						throw {myMessage: "Нельзя добавить папку в Файл!"}
					}else if (lai.list[lai.index].type === 'main'){
						throw {myMessage: "Нельзя добавить папку в Файл!"}
					}else if (lai.list[lai.index].type === 'block'){
						throw {myMessage: "Нельзя добавить папку в Блок!"}
					}else if (lai.list[lai.index].position !== undefined){
						lai.list[lai.index].folderItems.push(el);
					}
					break;
				case 'file':
					el.isOpen = true;
					el.isOpenContextMenu = false;
					if (lai.list[lai.index].type === 'folder'){
						closeAllFile(stateWorkDAL.sectionItems);
						lai.list[lai.index].isOpen = true;
						lai.list[lai.index].folderItems.push(el);
					}else if (lai.list[lai.index].type === 'file'){
						throw {myMessage: "Нельзя добавить Файл в Файл!"}
					}else if (lai.list[lai.index].type === 'block'){
						throw {myMessage: "Нельзя добавить Файл в Блок!"}
					}else if (lai.list[lai.index].position !== undefined){
						closeAllFile(stateWorkDAL.sectionItems);
						lai.list[lai.index].folderItems.push(el);
					}
					break;
				case 'block':
					el.isOpenContextMenu = false;
					if (lai.list[lai.index].type === 'file'){
						closeAllFile(stateWorkDAL.sectionItems);
						lai.list[lai.index].isOpen = true;
						lai.list[lai.index].fileMain.push(el);
					}else if (lai.list[lai.index].type === 'block'){
						let list = [...lai.list.slice(0,lai.index+1),el,...lai.list.slice(lai.index+1,lai.list.length)];
						lai.list.splice(0);
						lai.list.push(...list);
					}else {
						dispatch(addMessageAC('error', `Ошибка, попытка вставить элемент другого формата!`));
					}
					break;
				default:
					dispatch(addMessageAC('error', `Ошибка, попытка вставить элемент другого формата!`));
			}
			dispatch(pastElementAC());
			if (userId !== '') {
				setNavInSectionDAL(stateWorkDAL.sectionItems, userId)
				.then((resolve) => {
					dispatch(addMessageAC('success', `Элемент успешно добавлен.`));
				}).catch((error) => {
					dispatch(addMessageAC('error', error.message));
				});
			}
		} catch (error) {
			dispatch(addMessageAC('error', `${error.myMessage ? error.myMessage : 'Ошибка, попытка вставить элемент другого формата!'}`));
		}
	}
};

//AC ADD_DEMO_STATE:
export const addDemoState = (folderItems, idSectionItem) => {
	return {
		type: 'ADD_DEMO_STATE',
	}
};