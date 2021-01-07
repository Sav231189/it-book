export const getActiveSectionItem = (state) => {
	return state.sectionItems.find(el=>el.isActive);
};