import {combineReducers, createStore} from "redux";
import {PanelReducer} from "./reducers/PanelReducer";
import {SectionReducer} from "./reducers/SectionReducer";
import {AppReducer} from "./reducers/AppReducer";


const reducers = combineReducers({
	app: AppReducer,
	panel: PanelReducer,
	section: SectionReducer,
});

export let store = createStore(reducers);