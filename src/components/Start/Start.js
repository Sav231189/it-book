import React, {useState} from 'react';
import logo from '../../img/logo_start.png';
import {connect} from "react-redux";
import {checkLoginTHUNK, registrationTHUNK, sendPasswordResetEmailTHUNK
} from "../../redux/reducers/AppReducer";
import './Start.css';

export function StartComponent(props) {

	let [isLogin, setIsLogin] = useState(false);
	let [isRegistration, setIsRegistration] = useState(false);
	let [isResetPassword, setIsResetPassword] = useState(false);

	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');

	const checkLogin = (e)=> {
		props.checkLoginTHUNK(email,password);
		setEmail('');
		setPassword('');
	};
	const registration = (e)=> {
		props.registrationTHUNK(email,password);
		setEmail('');
		setPassword('');
	};
	const sendPasswordResetEmail = (e)=> {
		props.sendPasswordResetEmailTHUNK(email);
		setEmail('');
		setPassword('');
		setIsLogin(false);
		setIsRegistration(false);
		setIsResetPassword(false);
	};

	return (
		<div className="Start">
			<div className='logo' onClick={()=>{
				setIsLogin(false);
				setIsRegistration(false);
				setIsResetPassword(false);
			}}>
				<img src={logo} alt="logo"/>
			</div>
			{!isLogin && !isRegistration &&
			<div className='title'>IT-BooK</div>
			}
			{!isLogin && !isRegistration &&
			<div className='demo-btn'>DEMO</div>
			}
			{isLogin &&
				<div className='isLogin'>
					<form onSubmit={e=>e.preventDefault()} action="#">
					<input type="text" placeholder='E-mail' onChange={(e)=>setEmail(e.currentTarget.value)} value={email}/>
					<br/>
					{ !isResetPassword
						? <div><input type="password" placeholder='Password' onChange={(e)=>setPassword(e.currentTarget.value)} value={password}/>
						<br/>
						<button onClick={checkLogin}>Login</button>
						<button className='resetPassword_btn' onClick={()=>setIsResetPassword(true)}>send password reset email</button>
						</div>
						: <button onClick={sendPasswordResetEmail}>Send Password</button>
					}
					</form>
				</div>
			}
			{isRegistration &&

				<div className='isLogin'>
					<form onSubmit={e=>e.preventDefault()} action="#">
					<input type="text" placeholder='E-mail' onChange={(e)=>setEmail(e.currentTarget.value)} value={email}/>
					<br/>
					<input type="password" placeholder='Password' onChange={(e)=>setPassword(e.currentTarget.value)} value={password}/>
					<br/>
					<button onClick={registration}>Registration</button>
					</form>
				</div>

			}
			<div className='auth-block'>
				<div className='login-btn' onClick={() => {
					setIsLogin(true);
					setIsRegistration(false);
					setIsResetPassword(false);
				}}>Login
				</div>
				<div className='registration-btn' onClick={() => {
					setIsRegistration(true);
					setIsLogin(false);
					setIsResetPassword(false);
				}}>Registration
				</div>
			</div>
		</div>
	);
}

export const Start = connect(()=>({}), {
	checkLoginTHUNK,
	sendPasswordResetEmailTHUNK,
	registrationTHUNK,
})(StartComponent);