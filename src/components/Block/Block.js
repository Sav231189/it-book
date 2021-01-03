import React from 'react';
import './Block.css';

export function Block(props) {

	const showContextMenuBlock = (e) => {
		if (!props.isOpenMenu && !props.element.isOpenContextMenu) {
			e.currentTarget.lastChild.style
				= `top: ${e.clientY - 70}px; left: ${e.clientX - 460}px; display: block;`;
			props.closeAllIsOpenContextMenu();
			props.changeIsOpenMenu(true);
			props.changeIsOpenContextMenu(props.element.id);
		} else {
			props.closeOpenMenu();
			props.closeAllIsOpenContextMenu();
			props.changeIsOpenMenu(false);
		}
		e.stopPropagation();
		e.preventDefault();
	};

	return (
		<div className='Block' onContextMenu={showContextMenuBlock}>

			{props.element.title !== '' &&
			<div className='blockTitle'>{props.element.title} </div>
			}

			{props.element.subTitle !== '' &&
			<div className='blockSubTitle'>{props.element.subTitle}</div>
			}

			{props.element.text !== '' &&
			<div className='blockText'>{props.element.text}</div>
			}

			{props.element.inner &&
			props.element.inner.map(el =>
				<Block key={el.id} element={el}
							 isOpenMenu={props.isOpenMenu}

							 changeIsOpenMenu={props.changeIsOpenMenu}
							 closeAllIsOpenContextMenu={props.closeAllIsOpenContextMenu}
							 changeIsOpenContextMenu={props.changeIsOpenContextMenu}
							 closeOpenMenu={props.closeOpenMenu}
				/>)
			}

			{/* contextMenu */}
			<div className="contextMenuBlock" style={props.element.isOpenContextMenu ? {display: 'block'} : {display: 'none'}}>
				<span onClick={(e) => console.log(e.target)}> + Add Block </span>
				<hr style={{background: 'grey', height: "1px"}}/>
			</div>

		</div>
	);
}