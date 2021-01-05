import React, {useState} from 'react';
import './Header.css';
import user from '../../img/user.png';

export function Header(props) {

	const [newPassword, setNewPassword] = useState('');

	const [isMenu, setIsMenu] = useState(false);
	const [isChangePassword, setIsChangePassword] = useState(false);

	const updatePassword = () => {
		props.updatePassword(newPassword);
		setNewPassword('');
		setIsMenu(false);
		setIsChangePassword(false);
	};

	return (
		<div className="header">
			<span className="logo">IT - BooK</span>
			<div className="lk" onContextMenu={() => setIsMenu(!isMenu)}>
				<img src={user} alt={'user'}/>
				{isMenu &&
				<div className='menu'>
					<div className="menuItem">{props.name}</div>
					<hr style={{background: 'grey', height: "1px"}}/>
					{!isChangePassword
						? <div className="menuItem" onClick={() => setIsChangePassword(true)}>Change Password</div>
						: <input type="text" placeholder='newPassword' onChange={(e) => setNewPassword(e.currentTarget.value)}
										 value={newPassword}/>
					}
					<hr style={{background: 'grey', height: "1px"}}/>
					{!isChangePassword
						? <div className="menuItem" onClick={props.outLogin}>Out</div>
						: <div className="menuItem" onClick={updatePassword}>Save</div>
					}
				</div>
				}
			</div>
		</div>
	);
}
