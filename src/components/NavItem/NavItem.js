import React, {useState, useRef, useEffect} from 'react';
import './NavItem.css';
import {connect} from "react-redux";
import {
	addNavItemTHUNK, changeIsOpenContextMenuItemAC,
	changeIsOpenItemTHUNK, changeNameNavItemTHUNK,
	changePositionTHUNK, deleteElementTHUNK,
} from "../../redux/reducers/SectionReducer";
import {changeIsContextMenuAC, changePanelShowAC} from "../../redux/reducers/AppReducer";
import {getActiveSectionItem} from "../../selectors/SectionSelector";
import {getIsContextMenu, getUserId} from "../../selectors/AppSelector";

export const NavItemComponent = (props) => {

	const refContextMenu = useRef(null);

	const [isChangeName, setIsChangeName] = useState(false);
	const [newName, setNewName] = useState('');

	const getStep = (step) => {
		let steps = [];
		for (let i = 0; i < step; i++) {
			steps.push(<div className='navStep' key={i}></div>);
		}
		return steps;
	};

	const showNavItemContextMenu = (e) => {
		if (!props.isContextMenu && !props.element.isOpenContextMenu) {
			setIsChangeName(false);
			setNewName('');
			e.preventDefault();
			e.stopPropagation();
			props.changeIsContextMenuAC('isContextMenu', true);
			props.changeIsOpenContextMenuItemAC(props.element.id, true);
			if (e.clientY < window.innerHeight - 220) {
				(e.clientX < window.innerWidth - 160)
					? refContextMenu.current.style = `top: ${e.clientY + 2}px; left: ${e.clientX + 2}px;`
					: refContextMenu.current.style = `top: ${e.clientY + 2}px; left: ${e.clientX - 162}px;`
			} else {
				(e.clientX < window.innerWidth - 160)
					? refContextMenu.current.style = `top: ${e.clientY - 117}px; left: ${e.clientX + 2}px;`
					: refContextMenu.current.style = `top: ${e.clientY - 177}px; left: ${e.clientX - 162}px;`
			}
		}
	};

	const changeName = (e) => {
		setIsChangeName(true);
		e.preventDefault();
		e.stopPropagation();
	};

	const saveChangeName = () => {
		props.changeNameNavItemTHUNK(props.element.id, newName, props.userId);
		setNewName('');
		setIsChangeName(false);
	};

	const changeIsOpenItem = (e) => {
		if (props.element.type === 'folder' && props.element.folderItems.length > 0) {
			props.changeIsOpenItemTHUNK(props.element.id, props.userId);
		}
		if (props.element.type === 'file') {
			props.changeIsOpenItemTHUNK(props.element.id, props.userId);
			window.innerWidth < 800 ? props.changePanelShowAC() : false;
		}
	};

	const changePosition = (e) => {
		e.target.innerHTML === 'Position UP' ?
			props.changePositionTHUNK(props.element.id, "up", props.userId) :
			props.changePositionTHUNK(props.element.id, "down", props.userId)
	};

	const deleteNavItem = () => {
		if (confirm(`вы уверены что хотите удалить ${props.element.type === 'folder' ? 'папку' : 'файл'}?`)) {
			props.deleteElementTHUNK(props.element.id, 'element', props.userId);
		}
	};

	return (
		<div className={`NavItem ${props.element.isOpenContextMenu}`}>
			<div className={`navElement ${props.element.isOpen && "active"}`}
					 onClick={changeIsOpenItem}
					 onContextMenu={showNavItemContextMenu}>
				{props.element.type === "folder" &&
				<div
					className={`folder ${!props.element.folderItems.length > 0 && 'emptyFolder'}`}>
					{getStep(props.step)}
					<svg className={`folderImg`}
							 viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M8.82187 14.453L0.2805 5.90875C-0.0934677 5.53383 -0.0934677 4.92641 0.2805 4.55055C0.654469 4.17563 1.26189 4.17563 1.63586 4.55055L9.49951 12.417L17.3632 4.5515C17.7371 4.17658 18.3445 4.17658 18.7195 4.5515C19.0934 4.92641 19.0934 5.53478 18.7195 5.90969L10.1782 14.4539C9.80807 14.8231 9.1911 14.8231 8.82187 14.453Z"/>
					</svg>
					<span>{props.element.name}</span>
				</div>}
				{props.element.type === "file" &&
				<div className={`file`}>
					{getStep(props.step)}
					<svg className='fileImg' viewBox="0 0 17 19" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M14.5208 4.75H10.9792C10.7837 4.75 10.625 4.57188 10.625 4.35415V0.395846C10.625 0.177346 10.4663 0 10.2708 0H3.1875C2.6017 0 2.125 0.532779 2.125 1.1875V17.8125C2.125 18.4672 2.6017 19 3.1875 19H13.8125C14.3983 19 14.875 18.4672 14.875 17.8125V5.14585C14.875 4.92735 14.7163 4.75 14.5208 4.75ZM14.1667 17.8125C14.1667 18.0302 14.008 18.2083 13.8125 18.2083H3.1875C2.992 18.2083 2.83332 18.0302 2.83332 17.8125V1.1875C2.83332 0.969779 2.992 0.791654 3.1875 0.791654H9.91668V4.35415C9.91668 5.00887 10.3934 5.54165 10.9792 5.54165H14.1667V17.8125Z"/>
						<path
							d="M14.7709 4.86703L10.5209 0.117032C10.3827 -0.0373425 10.1582 -0.0373425 10.0201 0.117032C9.88194 0.271407 9.88194 0.522378 10.0201 0.676753L14.2701 5.42675C14.3395 5.50353 14.4301 5.54235 14.5208 5.54235C14.6115 5.54235 14.7021 5.50357 14.7709 5.42675C14.909 5.27238 14.909 5.02141 14.7709 4.86703Z"/>
					</svg>
					<span>{props.element.name}</span>
				</div>}
			</div>

			{props.element.type === 'folder' && props.element.isOpen &&
			props.element.folderItems.map(el => <NavItem step={props.step + 1} key={el.id} element={el}/>)
			}

			{/*contextMenu*/}
			<div ref={refContextMenu} className="contextMenu"
					 style={props.element.isOpenContextMenu ? {display: 'block'} : {display: 'none'}}>

				<div>
					{props.step < 7 && props.element.type === 'folder' &&
					<span onClick={() => props.addNavItemTHUNK('folder', props.element.id, props.userId)}>
					New Folder </span>
					}
					<span onClick={() => props.addNavItemTHUNK('file', props.element.id, props.userId)}>
					New File </span>
					<hr/>
				</div>

				{!isChangeName ?
					<div>
						<span className="menuItem" onClick={changeName}> Change Name </span></div>
					: <div>
						<form action="#"><input type="text" maxLength={24} onClick={changeName} placeholder='new Name'
																		onChange={(e) => setNewName(e.currentTarget.value)} value={newName}/>
							<button className="menuItem save_btn" onClick={saveChangeName}>Save</button>
						</form>
					</div>
				}
				<hr/>
				<span onClick={changePosition}>Position UP</span>
				<span onClick={changePosition}>Position DOWN</span>
				<hr/>
				<span onClick={deleteNavItem}>Удалить</span>
			</div>
		</div>
	);
};

export const NavItem = connect(
	(state) => ({
		isContextMenu: getIsContextMenu(state),
		userId: getUserId(state),
		activeSectionItem: getActiveSectionItem(state),
	}), {
		changeIsOpenContextMenuItemAC,
		changeIsContextMenuAC,
		addNavItemTHUNK,
		changeIsOpenItemTHUNK,
		deleteElementTHUNK,
		changeNameNavItemTHUNK,
		changePositionTHUNK,
		changePanelShowAC,
	}
)(NavItemComponent);
