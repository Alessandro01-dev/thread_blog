import { useState } from 'react'
import './ProfileCard.css'
import useScrollDown from '../../../../hooks/useScrollDown'
import { Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Edit, LogOut, Settings, Bookmark } from 'lucide-react';
import { useAuth } from '../../../../contexts/AuthContext';

const ProfileCard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { authData, logout } = useAuth()
  const shrinkedNavbar = useScrollDown()
  const navigate = useNavigate();

  if (!authData) return null;

  const menuItems = [
    {
      label: "Post Article",
      icon: <Edit size={16} />,
      to: "/newArticlePage",
      type: "link"
    },
    /* {
      label: "Favourites",
      icon: <Bookmark size={16} />,
      to: "/favourites",
      type: "link"
    },
    {
      label: "Settings",
      icon: <Settings size={16} />,
      to: "/settings",
      type: "link"
    }, */
    {
      type: "divider"
    },
    {
      label: "Log out",
      icon: <LogOut size={16} />,
      onClick: () => {
        logout();
        navigate("/login");
      },
      type: "button"
    }
  ];

  const toggleProfileCard = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleLogout = () => {
    setIsDropdownOpen(false)
    logout()
    navigate("/login")
  }

  return (
    <div
      className="profile-card-container"
      onClick={toggleProfileCard}
    >
      <p
        className={`${shrinkedNavbar ? "profile-shrinked-fullname" : "profile-fullname"} m-0 px-2 py-1`}
      >
        {authData.fullName}
      </p>
      <div
        className={shrinkedNavbar ? "profile-avatar-shrinked-container" : "profile-avatar-container"}
      >
        <img
          className="w-100 object-fit-cover"
          src={authData.avatar}
          alt="logged user profile picture"
        />
      </div>
      <Dropdown
        align="end"
        show={isDropdownOpen}
        onToggle={toggleProfileCard}
      >
        <Dropdown.Toggle
          variant="link"
          id="profile-dropdown"
          className="remove-dropdown-toggle"
        />
        <Dropdown.Menu>
          {menuItems.map((item, index) => {
            if (item.type === "divider") {
              return <Dropdown.Divider key={`divider-${index}`} />;
            }
            if (item.type === "link") {
              return (
                <Dropdown.Item
                  key={index}
                  as={Link}
                  to={item.to}
                  className="d-flex align-items-center gap-2"
                >
                  {item.icon}
                  {item.label}
                </Dropdown.Item>
              );
            }
            return (
              <Dropdown.Item
                key={index}
                className="d-flex align-items-center gap-2"
                onClick={item.onClick}
              >
                {item.icon}
                {item.label}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default ProfileCard