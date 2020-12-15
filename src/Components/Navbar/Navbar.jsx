import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalContext";
import { logoutService } from "../../services/httpServices";
import user from "../../Images/user.png";
import logout from "../../Images/logout.png";
import userIcon from "../../Images/userIcon.png";

function NavbarComponent() {
  const [state, dispatch] = useContext(GlobalContext);
  return (
    <div className="p-100 mb-40 space-between navbar">
      <div className="align-center">
        <Link to="/">WaysGalery</Link>
      </div>
      <div className="align-center">
        <IsLogin dispatch={dispatch} state={state} />
      </div>
    </div>
  );
}

const IsLogin = ({ dispatch, state }) => {
  const onLogout = (e) => {
    e.preventDefault();
    logoutService(dispatch);
  };
  return (
    <>
      <Link to="/upload">
        <button className="btn mr-15">Upload</button>
      </Link>
      <div className="dropdown">
        <img src={user} alt="user" className="user-icon dropbtn"></img>
        <div className="dropdown-content">
          <span>
            <Link to="/my-profile">
              <div className="row align-center">
                <img
                  src={userIcon}
                  alt="add-product-icon"
                  className="dropdown-img-icon"
                />
                <p className="ml-19 dropdown-text">Profile</p>
              </div>
            </Link>
          </span>
          <span>
            <Link to="/my-transaction">
              <div className="row align-center">
                <img
                  src={userIcon}
                  alt="add-product-icon"
                  className="dropdown-img-icon"
                />
                <p className="ml-19 dropdown-text">My Order</p>
              </div>
            </Link>
          </span>
          <span onClick={onLogout}>
            <div className="row align-center">
              <img
                src={logout}
                alt="logut-icon"
                className="dropdown-img-icon"
              />
              <p className="ml-19 dropdown-text">Logut</p>
            </div>
          </span>
        </div>
      </div>
    </>
  );
};

export default NavbarComponent;
