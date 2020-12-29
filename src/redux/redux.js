import {combineReducers, createStore} from "redux";
import {PanelReducer} from "./reducers/PanelReducer";
import {SectionReducer} from "./reducers/SectionReducer";
import {AppReducer} from "./reducers/AppReducer";
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
	app: AppReducer,
	panel: PanelReducer,
	section: SectionReducer,
});


/* eslint-disable no-underscore-dangle */
export let store = createStore(
	reducers, /* preloadedState, */
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */