import React from 'react';
import './Header.css';
import user from '../../img/user.png';

export function Header() {
	return (
		<div className="header">
			<span className="logo">IT - BooK</span>
			<div className="lk">
				<img src={user} alt={'user'}/>
			</div>
		</div>
	);
}
