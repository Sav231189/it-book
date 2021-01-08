import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {SectionReducer} from "./reducers/SectionReducer";
import {AppReducer} from "./reducers/AppReducer";

const composeEnhancers =
	typeof window === 'object' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		}) : compose;

const enhancer = composeEnhancers(
	applyMiddleware(thunk),
	// other store enhancers if any
);


const reducers = combineReducers({
	app: AppReducer,
	section: SectionReducer,
});


export let store = createStore(reducers, enhancer);
