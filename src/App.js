import React, { useEffect } from "react";
import "./styles.css";
import Home from "../src/pages/home";
import Cart from "../src/pages/cart";
import LoginPage from "./pages/login";
import Profile from "./pages/profile";
import Header from "../src/components/header";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import routes from "../src/Routes/routes";
import Footer from "./components/footer";

export default function App() {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      history.push(routes.home);
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path={routes.home}>
          <Home />
        </Route>
        <Route path={routes.cart}>
          <Cart />
        </Route>
        <Route path={routes.login}>
          <LoginPage />
        </Route>
        <Route path={routes.profile}>
          <Profile />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}
