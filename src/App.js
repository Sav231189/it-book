import React from "react";
import './App.css';
import {Header} from "./components/header/Header";
import {Panel} from "./components/panel/Panel";
import {PanelMoreBtn} from "./components/panelMoreBtn/PanelMoreBtn";



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
