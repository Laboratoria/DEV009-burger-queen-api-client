import  "./main-menu-buttons.css"

import { Link } from "react-router-dom";

const MainMenuButtons = () => {
  return (
    <div className="main-menu-buttons-container">
      <Link to="/menu">
        <button className="menu-button">MENU</button>
      </Link>
      <Link to="/order-ready-view">
        <button className="order-ready-button">ORDER READY</button>
      </Link>
    </div>
  );
};

export default MainMenuButtons;
