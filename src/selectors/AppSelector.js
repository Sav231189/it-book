export const getIsContextMenu = (state) => {
	return state.app.isContextMenu;
};
export const getIsContextMenuSection = (state) => {
	return state.app.isContextMenuSection;
};
export const getIsContextMenuNav = (state) => {
	return state.app.isContextMenuNav;
};
export const getIsContextMenuMain = (state) => {
	return state.app.isContextMenuMain;
};
export const getIsContextMenuLK = (state) => {
	return state.app.isContextMenuLK;
};
export const getIsAuth = (state) => {
	return state.app.isAuth;
};
export const getUserName = (state) => {
	return state.app.userName;
};
export const getUserId = (state) => {
	return state.app.userId;
};
export const getIsShowPanel = (state) => {
	return state.app.isShowPanel;
};
export const getIsLoading = (state) => {
	return state.app.isLoading;
};
export const getMessages = (state) => {
	return state.app.messages;
};
export const getIsDemo = (state) => {
	return state.app.isDemo;
};
export const getActiveElement = (state) => {
	return {
		id: state.app.activeElement.id,
		type: state.app.activeElement.typeElement,
	};
};
