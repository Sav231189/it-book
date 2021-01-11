import React, {useState} from 'react';
import './Start.css';
import logo from '../../img/logo_start.png';

export function Start(props) {
	let [isLogin, setIsLogin] = useState(false);
	let [isRegistration, setIsRegistration] = useState(false);
	let [isResetPassword, setIsResetPassword] = useState(false);

	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');

	const checkLogin = (e)=> {
		props.checkLogin(email,password);
		setEmail('');
		setPassword('');
	};
	const registration = (e)=> {
		props.registration(email,password);
		setEmail('');
		setPassword('');
	};
	const sendPasswordResetEmail = (e)=> {
		props.sendPasswordResetEmail(email);
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
					<input type="text" placeholder='Login' onChange={(e)=>setEmail(e.currentTarget.value)} value={email}/>
					<br/>
					{ !isResetPassword
						? <div><input type="password" placeholder='Password' onChange={(e)=>setPassword(e.currentTarget.value)} value={password}/>
						<br/>
						<span onClick={checkLogin}>Login</span>
						<span className='resetPassword_btn' onClick={()=>setIsResetPassword(true)}>send password reset email</span>
						</div>
						: <span onClick={sendPasswordResetEmail}>Send Password</span>
					}

				</div>
			}
			{isRegistration &&
				<div className='isLogin'>
					<input type="text" placeholder='Login' onChange={(e)=>setEmail(e.currentTarget.value)} value={email}/>
					<br/>
					<input type="password" placeholder='Password' onChange={(e)=>setPassword(e.currentTarget.value)} value={password}/>
					<br/>
					<span onClick={registration}>Registration</span>
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
