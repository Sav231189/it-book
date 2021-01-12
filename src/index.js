import React from 'react';
import './firebaseConfig';
import ReactDOM from 'react-dom';
import {App} from './components/App/App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/redux";
import "./clear.css";

window.oncontextmenu = (function(e){
	return false;
});

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
