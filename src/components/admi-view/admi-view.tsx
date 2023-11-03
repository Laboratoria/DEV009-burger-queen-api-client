import { useState } from "react";
import UserProfile from "../user-profile/userprofile";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faUsers } from '@fortawesome/free-solid-svg-icons';
import "./admi-view.css";

const AdmiView = () => {
  const navigate = useNavigate();
  const [, setAuthenticated] = useState(false);

  const handleLogoutClick = () => {
    setAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="admin-view">
      <UserProfile
        profileType="administrator"
        waiterName=""
        onBackClick={() => { }}
        showBackButton={false}
        onLogoutClick={handleLogoutClick}
        administratorName={""}
        cookName={""}
      />
      <div className="admin-button">
        <Link to="/Staff">
          <button className="button-staff">
            <FontAwesomeIcon icon={faUsers} />
          </button>
        </Link>
        <Link to="/admi-products">
          <button className="button-edit-menu">
            <FontAwesomeIcon icon={faUtensils} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdmiView;



