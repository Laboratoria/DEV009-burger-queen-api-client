import { useNavigate } from "react-router-dom";
import "./main-menu-buttons.css";

const MainMenuButtons = () => {
  const navigate = useNavigate(); // Obtenemos la función de navegación

  const handleMenuButtonClick = () => {
    navigate("/menu"); // Navegamos a la ruta /menu cuando se hace clic en el botón
  };

  const handleOrderReadyButtonClick = () => {
    navigate("/order-ready-view"); // Navegamos a la ruta /order-ready-view cuando se hace clic en el botón
  };

  return (
    <div className="main-menu-buttons-container">
      <button className="menu-button" onClick={handleMenuButtonClick}>
        MENU
      </button>
      <button className="order-ready-button" onClick={handleOrderReadyButtonClick}>
        ORDER READY
      </button>
    </div>
  );
};

export default MainMenuButtons;

