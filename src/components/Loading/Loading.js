import React from 'react';
import {connect} from "react-redux";
import {getIsLoading} from "../../selectors/AppSelector";
import loading from '../../img/ loading.gif';
import  './Loading.css';


export function LoadingComponent(props) {
	return (
		<div className={`loading ${props.isLoading}`}>
			<img src={loading} alt="loading"/>
		</div>
	);
}

export const Loading = connect(
	state=>({
		isLoading: getIsLoading(state),
	}),{

	})(LoadingComponent);
