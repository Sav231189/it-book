import React from "react";
import './App.css';
import {Header} from "../header/Header";
import {Panel} from "../panel/Panel";
import {PanelMoreBtn} from "../panelMoreBtn/PanelMoreBtn";
import {connect} from "react-redux";
import {changeIsOpenMenu, closeOpenMenu} from "../../redux/reducers/AppReducer";

function AppComponent(props) {
  // console.log("render AppComponent")

  const closeAllMenu = (e) => {
    if (props.isOpenMenu){
      props.closeOpenMenu();
      props.changeIsOpenMenu(false);
    }
  };

  return (
    <div className="app" onClick={closeAllMenu}>
      <Header/>
      <Panel />
      <PanelMoreBtn />
    </div>
  );
}
const mstp = (state) => {
  return {
    isOpenMenu: state.app.isOpenMenu,
  }
};
export const App = connect(mstp,{
  closeOpenMenu,
  changeIsOpenMenu,
})
(AppComponent);
