import React, {useRef, useEffect} from 'react';
import {connect} from "react-redux";
import {SectionItem} from "../sectionItem/SectionItem";
import {changeActiveElement, changeIsContextMenuAC, isDemoAC} from "../../redux/reducers/AppReducer";
import {addDemoState, addSectionItemTHUNK, getDataTHUNK} from "../../redux/reducers/SectionReducer";
import './Section.css'
import {getIsContextMenu, getIsContextMenuSection, getUserId} from "../../selectors/AppSelector";
import {getSectionItems} from "../../selectors/SectionSelector";

export function SectionComponent(props) {

	useEffect(() => {
		if (props.userId !== ''){
			props.getDataTHUNK(props.userId);
			props.isDemoAC(false);
		}else{
			props.addDemoState();
		}
	}, [props.userId]);

	const refContextMenu = useRef(null);

	const showMenuContextSection = (e) => {
		if (!props.isContextMenu && !props.isContextMenuSection) {
			e.preventDefault();
			e.stopPropagation();
			props.changeIsContextMenuAC('isContextMenu', true);
			props.changeIsContextMenuAC('isContextMenuSection', true);
			(e.clientY < window.innerHeight - 60)
				? refContextMenu.current.style = `top: ${e.clientY + 2}px; left: ${e.clientX + 2}px;`
				: refContextMenu.current.style = `top: ${e.clientY - 37}px; left: ${e.clientX + 2}px;`
		}
	};

	return (
		<div className="section"
				 onContextMenu={showMenuContextSection}
				 onPointerDown={()=>props.changeActiveElement("", 'section')}
		>
			{props.sectionItems.length <= 0 &&
			<div className='noSectionItem'>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 417.031 417.031"><g><path d="M219.683,92.146c-0.279-0.315-0.52-0.627-0.849-0.925c-3.644-3.272-3.742-2.306,0.247-5.983c2.955-2.712,6.541-4.834,9.79-7.18c8.596-6.213,14.254-14.534,18.079-24.399c8.582-22.15-16.706-37.453-29.396-50.562c-9.168-9.485-23.603,4.982-14.444,14.447c7.076,7.325,16.19,13.264,22.349,21.407c6.897,9.116-3.613,19.174-10.814,24.249c-11.133,7.844-20.757,18.262-18.533,29.434c-49.964,4.668-96.16,32.052-96.16,80.327v135.51c0,59.862,48.698,108.562,108.564,108.562c59.863,0,108.566-48.7,108.566-108.562V172.95C317.085,120.247,268.05,94.723,219.683,92.146z M120.391,172.95c0-35.833,38.898-56.581,79.186-60.027v124.982c-36.751-1.85-66.589-10.222-79.186-14.309V172.95z M296.648,308.461c0,48.604-39.537,88.133-88.129,88.133c-48.59,0-88.128-39.529-88.128-88.133V245.08c18.249,5.516,52.6,13.882,93.202,13.882c26.003,0,54.556-3.479,83.056-13.286V308.461z M296.648,223.94c-25.844,9.883-52.237,13.746-76.635,14.271v-125.59c39.407,2.363,76.635,21.264,76.635,60.337V223.94zM289.735,216.203c0,0-46.688,13.073-62.567,10.271V122.813C269.429,130.753,296.625,143.533,289.735,216.203z"/></g></svg>
			</div>}

			{props.sectionItems.map((el) => <SectionItem key={el.id} element={el}/>)}

			<div ref={refContextMenu} className="contextMenu"
					 style={props.isContextMenuSection ? {display: 'block'} : {display: 'none'}}>
				<span onPointerDown={(e) => props.addSectionItemTHUNK(props.userId)}>Add Section</span>
			</div>
		</div>
	);
}

export const Section = connect(
	state => ({
		isContextMenu: getIsContextMenu(state),
		isContextMenuSection: getIsContextMenuSection(state),
		sectionItems: getSectionItems(state),
		userId: getUserId(state),
	}), {
		changeIsContextMenuAC,
		addSectionItemTHUNK,
		getDataTHUNK,
		addDemoState,
		isDemoAC,
		changeActiveElement,
	})(SectionComponent);

