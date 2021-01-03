let MainList = [];
export const getFileMain = (state) => {
	const getOpenFile = (arr=[]) => {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].type === 'file' && arr[i].isOpen) {
				MainList = arr[i].fileMain;
			}
			if (arr[i].folderItems){
				getOpenFile(arr[i].folderItems);
			}
		}
	};
	let el = state.section.items.find(el=>el.isActive);
	el && getOpenFile(el.panelNav.navItems);
	return MainList;
};