export const getSectionItems = (state) => {
	return state.section.sectionItems;
};
export const getActiveSectionItem = (state) => {
	return state.section.sectionItems.find(el=>el.isActive);
};
export const getActiveFile= (state) => {
	let activeFile = null;
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