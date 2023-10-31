import { useState } from "react";
import UserProfile from "../user-profile/userprofile";
import { Link, useNavigate } from 'react-router-dom';

const AdmiView = () => {
    
  const navigate = useNavigate();
  const [, setAuthenticated] = useState(false);

  const handleLogoutClick = () => {
    setAuthenticated(false);
    navigate("/");
  };

  return (
    <>
      <div className="admin-view">
        <UserProfile
          profileType="administrator"
          waiterName=""
          onBackClick={() => { }}
          showBackButton={false}
          onLogoutClick={handleLogoutClick} administratorName={""} cookName={""} />
        <div className="admin-button">
        <Link to="/Staff"> 
        <button className="button-staff">STAFF</button>
      </Link>
      <Link to="/">
        <button className="button-edit-menu">MENU</button>
      </Link>
        </div>
      </div>
    </>
  );
};
export default AdmiView;


