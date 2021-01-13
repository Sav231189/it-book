import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/App/App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/redux";
import './firebaseConfig';
import "./clear.css";
import "./fonts.css";

window.oncontextmenu = () => false;

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
