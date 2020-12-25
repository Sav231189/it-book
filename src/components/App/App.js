import React from "react";
import './App.css';
import {Header} from "../header/Header";
import {Panel} from "../panel/Panel";
import {PanelMoreBtn} from "../panelMoreBtn/PanelMoreBtn";



function App() {
  return (
    <div className="app">
      <Header/>
      <Panel />
      <PanelMoreBtn />
    </div>
  );
}
export default App;
