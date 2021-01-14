import React from 'react';
import {connect} from "react-redux";
import successImg from '../../img/success.png'
import errorImg from '../../img/error.png'
import './Message.css'
import {getMessages} from "../../selectors/AppSelector";

function MessageComponent(props) {

	return (
		<div className={`Message`}>
			{props.messages.map((el,i) => (
				<div key={i} style={{order: `${1-i}`}} className={`messageItem ${el.typeMessage}`}
				onClick={e=>e.currentTarget.style.display = 'none'}
				onContextMenu={e=>{e.currentTarget.style.display = 'none'; e.preventDefault();e.stopPropagation();}}
				>
					<div className='imgMessage'><img src={el.typeMessage === 'success' ? successImg : errorImg} alt="messageImg"/></div>
					<span> {el.textMessage} </span>
				</div>))
			}
		</div>
	);
}

export const Message = connect(
	state => ({
		messages: getMessages(state),
	}),{ })(MessageComponent);