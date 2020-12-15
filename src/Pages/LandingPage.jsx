import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import LoginModal from "../Components/Navbar/LoginModal";
import RegisterModal from "../Components/Navbar/RegisterModal";
import image from "../Images/landing-page-img-1.png";

function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [state, dispatch] = useContext(GlobalContext);

  const onLogin = () => {
    setShowLogin(true);
  };
  const onRegister = () => {
    setShowRegister(true);
  };

  return (
    <div className="w-100 h-100 space-between align-center">
      <div>
        <div>
          <h1>WaysGalery</h1>
        </div>
        <div>
          <h4>show your work to inspire everyone</h4>
          <p>
            Ways Exhibition is a website design creators gather to share their
            work with other creators
          </p>
        </div>
        <div>
          <button className="mr-15 btn btn-primary" onClick={onRegister}>
            Register
          </button>
          <RegisterModal
            show={showRegister}
            setShow={setShowRegister}
            switchModal={setShowLogin}
            dispatch={dispatch}
          />
          <button className="btn" onClick={onLogin}>
            Login
          </button>
          <LoginModal
            show={showLogin}
            setShow={setShowLogin}
            switchModal={setShowRegister}
            dispatch={dispatch}
            state={state}
          />
        </div>
      </div>
      <div>
        <img src={image} alt="dashboard" className="img-landing-page" />
      </div>
    </div>
  );
}

export default LandingPage;
