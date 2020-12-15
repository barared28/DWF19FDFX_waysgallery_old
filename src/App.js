// import Module
import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import Pages
import LandingPage from "./Pages/LandingPage";
import NotFound from "./Pages/NotFoundPage";
import Home from "./Pages/Home";
import DetailPost from "./Pages/DetailPost";
import Profile from "./Pages/Profile";
import UploadPost from "./Pages/UploadPost";
import EditProfilePage from "./Pages/EditProfilePage";
import UserProfile from "./Pages/UserProfile";
import Order from "./Pages/Order";
import Hire from "./Pages/Hire";
import SumbitProject from "./Pages/SumbitProject";
import Project from "./Pages/Project";

// import dll
import Navbar from "./Components/Navbar/Navbar";
import Loader from "./Components/Loader";
import PrivateRoute from "./Components/PrivateRoot";
import { GlobalContext } from "./Context/GlobalContext";
import { loadedService } from "./services/httpServices";
import "./Style.scss";

function App() {
  const [state, dispatch] = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      await loadedService(dispatch);
      setLoading(false);
    })();
  }, []);
  return (
    <Router>
      {loading ? (
        <div className="w-100 h-100 item-center align-center">
          <Loader />
        </div>
      ) : (
        <>
          {state.isLogin && <Navbar />}
          <div className="container">
            <Switch>
              {state.isLogin ? (
                <Route exact path="/" component={Home} />
              ) : (
                <Route exact path="/" component={LandingPage} />
              )}
              <PrivateRoute exact path="/post/:id" component={DetailPost} />
              <PrivateRoute exact path="/my-profile" component={Profile} />
              <PrivateRoute exact path="/profile/:id" component={UserProfile} />
              <PrivateRoute exact path="/upload" component={UploadPost} />
              <PrivateRoute exact path="/hire/:id" component={Hire} />
              <PrivateRoute exact path="/my-transaction" component={Order} />
              <PrivateRoute exact path="/add-project/:id" component={SumbitProject} />
              <PrivateRoute exact path="/project/:id" component={Project} />
              <PrivateRoute
                exact
                path="/edit/my-profile"
                component={EditProfilePage}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </>
      )}
    </Router>
  );
}

export default App;
