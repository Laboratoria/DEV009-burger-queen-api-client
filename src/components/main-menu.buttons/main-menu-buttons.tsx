import { Link } from "react-router-dom";

const MainMenuButtons = () => {
  return (
    <div>
      <Link to="/menu">
        <button>Menu</button>
      </Link>
      <Link to="/order-ready">
        <button>Order Ready</button>
      </Link>
    </div>
  );
};

export default MainMenuButtons;
