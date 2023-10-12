import React from "react";
import "./user-profile.css";

interface UserProfileProps {
  profileType: "waiter" | "administrator" | "cook";
  waiterName: string;
  administratorName:string;
  cookName: string;
  

  onLogoutClick: () => void;
  
  onBackClick?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  profileType,
  waiterName,
  administratorName,
  cookName,
  onLogoutClick,
  onBackClick,
}) => {
  // This function changes the welcome " " depending on the credentials.
  const getWelcomeText = () => {
    switch (profileType) {
      case "administrator":
        return `Welcome administrator ${administratorName}`;
      case "cook":
        return `Welcome cook ${cookName}`;
      default:
        return `Welcome Waiter ${waiterName}`;
    }
  };

  return (
    <div className="user-profile">
      <div className="left">
      <img src="../img2/BURGER QUEEN.jpg" alt="Logo" />
      </div>
      <div className="center">
        <h2>{getWelcomeText()}</h2>
      </div>
      <div className="right">
        <button onClick={onBackClick}>Back</button>
        <button onClick={onLogoutClick}>Logout</button>
      </div>
    </div>
  );
};

export default UserProfile;
