import React from "react";
import './App.css';
import {Header} from "../header/Header";
import {Panel} from "../panel/Panel";
import {PanelMoreBtn} from "../panelMoreBtn/PanelMoreBtn";
import {connect} from "react-redux";
import {changeIsOpenMenu, closeOpenMenu} from "../../redux/reducers/AppReducer";
import {closeAllIsOpenContextMenu} from "../../redux/reducers/SectionReducer";
import {Main} from "../Main/Main";

function AppComponent(props) {

  const closeAllMenu = (e) => {
    if (props.isOpenMenu){
      props.closeOpenMenu();
      props.closeAllIsOpenContextMenu();
      props.changeIsOpenMenu(false);
    }
  };

  return (
    <div className="app" onClick={closeAllMenu} onContextMenu={closeAllMenu}>
      <Header/>
      <Panel />
      <PanelMoreBtn />
      <div className='mainBox' style={!props.panelShow ? {width: 'calc(100% - 10px)'} : null}>
        <Main />
      </div>
    </div>
  );
}
const mstp = (state) => {
  return {
    isOpenMenu: state.app.isOpenMenu,
    panelShow: state.panel.show,
  }
};
export const App = connect(mstp,{
  closeOpenMenu,
  changeIsOpenMenu,
  closeAllIsOpenContextMenu,
})
(AppComponent);
