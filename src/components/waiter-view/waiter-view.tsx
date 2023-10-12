import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import UserProfile from "../user-profile/userprofile";
import MainMenuButtons from "../main-menu.buttons/main-menu-buttons";

const WaiterView = () => {

  const navigate = useNavigate();
  const [, setAuthenticated] = useState(false);

  const handleLogoutClick = () => {
    setAuthenticated(false);
    navigate("/");
  };

  return (
    <>
      <div className="waiter-view">
        <UserProfile
          profileType="waiter"
          waiterName=""
          onBackClick={() => { }}
          onLogoutClick={handleLogoutClick} administratorName={""} cookName={""} />
        <div>
          <MainMenuButtons />
        </div>
      </div>
    </>
  );
};

export default WaiterView;