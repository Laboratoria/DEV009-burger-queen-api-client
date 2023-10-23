import  "./main-menu-buttons.css"

import { Link } from "react-router-dom"; //link viene desde react

const MainMenuButtons = () => {
  return (
    <div className="main-menu-buttons-container">
      <Link to="/menu"> {/*link te ayuda a moverte a otro componente*/}
        <button className="menu-button">MENU</button>
      </Link>
      <Link to="/order-ready-view">
        <button className="order-ready-button">ORDER READY</button>
      </Link>
    </div>
  );
};

export default MainMenuButtons;
