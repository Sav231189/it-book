let MainList = [];
export const getFileMain = (state) => {
	if (state){
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
		let el = state.section.sectionItems.find(el=>el.isActive);
		el && getOpenFile(el.folderItems);
		return MainList;
	}
};
let activeFile = {};
export const getActiveFile= (state) => {
	if (state){
		const getOpenFile = (arr=[]) => {
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].type === 'file' && arr[i].isOpen) {
					activeFile = arr[i];
				}
				if (arr[i].folderItems){
					getOpenFile(arr[i].folderItems);
				}
			}
		};
		let el = state.section.sectionItems.find(el=>el.isActive);
		el && getOpenFile(el.folderItems);
		return activeFile;
	}
};