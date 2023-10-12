import  "./main-menu-buttons.css"

import { Link } from "react-router-dom";

const MainMenuButtons = () => {
  return (
    <div className="main-menu-buttons-container">
      <Link to="/menu">
        <button className="menu-button">Menu</button>
      </Link>
      <Link to="/order-ready-view">
        <button className="order-ready-button">Order Ready</button>
      </Link>
    </div>
  );
};

export default MainMenuButtons;
