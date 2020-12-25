import {combineReducers, createStore} from "redux";
import {PanelReducer} from "./reducers/PanelReducer";
import {SectionReducer} from "./reducers/SectionReducer";


const reducers = combineReducers({
	panel: PanelReducer,
	section: SectionReducer,
});

export let store = createStore(reducers);