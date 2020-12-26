import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/App/App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/redux";

window.oncontextmenu = (function(e){
	return false;
});

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App store={store}/>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
