import React from 'react';
import './Section.css'
import {connect} from "react-redux";

export function SectionComponent(props) {

	const menu = (e) => {
		if(e.target.clientHeight - 25 > e.clientY) {
			e.target.parentElement.lastChild.style = `top: ${e.clientY -60}px; left: ${e.clientX}px; display: block;`
		}
		window.onclick = (event) => {
			e.target.parentElement.lastChild.style = `display: none;`;
		};
	};

	return (
		<div className="section" onContextMenu={menu} >
			{props.items.map((el) => {
				return (
					<div className="item" key={el.position}>
						{el.url!=="" && <img src = {el.url} alt = {el.name} />}
					</div>
				)})
			}
		</div>
	);
}

const mstp = (state) => {
	return {
		items: state.section.items,
	}
};
export const Section = connect(
	mstp,
	{

	}
)(SectionComponent);
