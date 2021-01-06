import React, {useState} from 'react';
import './NavItem.css';
import {NavItems} from "../NavItems/NavItems";
import {connect} from "react-redux";
import {
	addBlockInActiveFile,
	addFileNavItem,
	addFolderNavItem,
	changeIsOpenContextMenu,
	changeNameNavItem,
	changePositionNavItem,
	closeAllIsOpenContextMenu,
	deleteNavItem,
	openCloseFolder,
	openFile
} from "../../redux/reducers/SectionReducer";

export const NavItemComponent = (props) => {

	const [isRenameMode, setRenameMode] = useState(false);
	const [name, setName] = useState(props.element.name);

	//step
	let step = [];
	for (let i = 0; i < props.step; i++) {
		step.push(<span className='navStep' key={i}> </span>);
	}

	const addBlockInActiveFile = (e) => {
		props.addBlockInActiveFile(props.element.id);
	};

	const openCloseFolder = (e) => {
		if (props.element.type === 'folder') {
			if (props.element.folderItems.length > 0)
				props.openCloseFolder(props.element.id)
		}
		if (props.element.type === 'file') {
			props.openFile(props.element.id)
		}
	};

	const showMenuNavItem = (e) => {


		if (!props.isOpenMenu && !props.isMenuNavItem && !props.element.isOpenContextMenu) {
			e.target.parentElement.parentElement.parentElement.lastChild.style
				= `top: ${e.clientY - 75}px; left: ${e.clientX - 75}px; display: block;`;
			props.closeAllIsOpenContextMenu();
			props.menuNavItemShow();
			props.changeIsOpenMenu(true);
			props.changeIsOpenContextMenu(props.element.id);
			if (props.element.type==='file') openCloseFolder();
		} else {
			props.closeAllIsOpenContextMenu();
			props.changeIsOpenMenu(false);
		}
	};

	const saveRename = (e) => {
		e.stopPropagation();
		e.preventDefault();
		props.changeNameNavItem(props.element.id, name);
		setRenameMode(false);
	};

	const changePositionUp = (e) => {
		props.changePositionNavItem(props.element.id, "up");
		e.preventDefault();
	};
	const changePositionDown = (e) => {
		props.changePositionNavItem(props.element.id, "down");
		e.preventDefault();
	};

	return (
		<div className='navItem'>
			<div className={`navElement ${props.element.isOpen ? "active" : null}`}>

				{step}

				{props.element.type === "folder" ? <svg onClick={openCloseFolder}
																								className={`closeFolderImg ${!props.element.folderItems.length > 0 && 'emptyFolder'}`}
																								viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M8.82187 14.453L0.2805 5.90875C-0.0934677 5.53383 -0.0934677 4.92641 0.2805 4.55055C0.654469 4.17563 1.26189 4.17563 1.63586 4.55055L9.49951 12.417L17.3632 4.5515C17.7371 4.17658 18.3445 4.17658 18.7195 4.5515C19.0934 4.92641 19.0934 5.53478 18.7195 5.90969L10.1782 14.4539C9.80807 14.8231 9.1911 14.8231 8.82187 14.453Z"/>
				</svg> : <svg onClick={openCloseFolder} className='fileImg' width="17" height="19" viewBox="0 0 17 19"
											xmlns="http://www.w3.org/2000/svg">
					<path
						d="M14.5208 4.75H10.9792C10.7837 4.75 10.625 4.57188 10.625 4.35415V0.395846C10.625 0.177346 10.4663 0 10.2708 0H3.1875C2.6017 0 2.125 0.532779 2.125 1.1875V17.8125C2.125 18.4672 2.6017 19 3.1875 19H13.8125C14.3983 19 14.875 18.4672 14.875 17.8125V5.14585C14.875 4.92735 14.7163 4.75 14.5208 4.75ZM14.1667 17.8125C14.1667 18.0302 14.008 18.2083 13.8125 18.2083H3.1875C2.992 18.2083 2.83332 18.0302 2.83332 17.8125V1.1875C2.83332 0.969779 2.992 0.791654 3.1875 0.791654H9.91668V4.35415C9.91668 5.00887 10.3934 5.54165 10.9792 5.54165H14.1667V17.8125Z"/>
					<path
						d="M14.7709 4.86703L10.5209 0.117032C10.3827 -0.0373425 10.1582 -0.0373425 10.0201 0.117032C9.88194 0.271407 9.88194 0.522378 10.0201 0.676753L14.2701 5.42675C14.3395 5.50353 14.4301 5.54235 14.5208 5.54235C14.6115 5.54235 14.7021 5.50357 14.7709 5.42675C14.909 5.27238 14.909 5.02141 14.7709 4.86703Z"/>
				</svg>}

				{<div className={`${props.element.type === 'file' && props.element.isOpen ? "fileActive" : null}`}>
					{!isRenameMode
						? <span onContextMenu={showMenuNavItem} onMouseDown={e =>{e.stopPropagation();e.preventDefault(); }} onClick={openCloseFolder} className='navElementName'> {name} </span>
						: <span>
							<input type="text"
										 onClick={(e) => {
											 e.stopPropagation();
											 e.preventDefault()
										 }}
										 onContextMenu={(e) => {
											 e.stopPropagation();
											 e.preventDefault()
										 }}
										 value={name} onChange={e => setName(e.target.value)}/>
							<span className='saveNameBtn' onClick={saveRename}>SAVE</span>
							</span>}
				</div>}

			</div>

			{props.element.type === 'folder' && props.element.isOpen
				?
				<NavItems step={props.step + 1} navItems={props.element.folderItems}/>
				:
				null
			}

			{/*contextMenu*/}
			<div className="menuNavItem" style={props.element.isOpenContextMenu ? {display: 'block'} : {display: 'none'}}>
				{
					props.element.type === 'folder'

						//folder contextMenu
						? <div>
						<span onClick={() => {
							props.addFolderNavItem(props.element.id)
						}}> + new Folder </span>
							<span onClick={() => {
								props.addFileNavItem(props.element.id)
							}}> + new File </span>
							<hr style={{background: 'grey', height: "1px"}}/>
							<span onClick={() => setRenameMode(true)}> Rename </span>
							<hr style={{background: 'grey', height: "1px"}}/>
							<span onClick={changePositionUp}> Position UP </span>
							<span onClick={changePositionDown}> Position DOWN </span>
							<hr style={{background: 'grey', height: "1px"}}/>
							<span onClick={() => {
								confirm("вы хотите удалить папку?") &&
								props.deleteNavItem(props.element.id)
							}}> delete Folder </span>
						</div>

						//file contextMenu
						: <div>
							{props.element.isOpen
								?
								<div>
										<span onClick={addBlockInActiveFile}> + Add Block </span>
									<hr style={{background: 'grey', height: "1px"}}/>
								</div>
								: null
							}
							<span onClick={() => setRenameMode(true)}> Rename </span>
							<hr style={{background: 'grey', height: "1px"}}/>
							<span onClick={changePositionUp}> Position UP </span>
							<span onClick={changePositionDown}> Position DOWN </span>
							<hr style={{background: 'grey', height: "1px"}}/>
							<span onClick={() => {
								confirm("вы хотите удалить файл?") &&
								props.deleteNavItem(props.element.id)
							}}> delete File </span>
						</div>
				}
			</div>
		</div>
	);
};

export const NavItem = connect(
	(state) => {
		return {
			isMenuNavItem: state.section.isMenuNavItem,
			isOpenMenu: state.app.isOpenMenu,
		}
	},
	{
		openCloseFolder,
		openFile,
		changeIsOpenContextMenu,
		closeAllIsOpenContextMenu,
		addFolderNavItem,
		addFileNavItem,
		deleteNavItem,
		changeNameNavItem,
		changePositionNavItem,
		addBlockInActiveFile,
	}
)(NavItemComponent);
