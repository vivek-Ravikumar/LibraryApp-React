import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import useLoginProvider from "../store/hooks/useLoginProvider";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import routes from "../Routes/routes";
import HomeIcon from "@material-ui/icons/Home";

import { useHistory, useLocation } from "react-router-dom";

const StyledBadge = withStyles(theme => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px"
  }
}))(Badge);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { isLoggedIn, loginFunction } = useLoginProvider();

  const [headerName, setHeaderName] = useState("Login");

  useEffect(() => {
    if (isLoggedIn && location.pathname !== "login") {
      setHeaderName("LogOff");
    } else {
      setHeaderName("");
    }
  }, [isLoggedIn, location]);

  const loginNow = () => {
    if (isLoggedIn) {
      //clear token
      history.push(routes.login);
      setHeaderName("");
    } else {
    }
  };

  const homeButton = () => {
    history.push(routes.home);
  };

  const myAccount = () => {
    history.push(routes.profile);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={homeButton}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <div>
              Lets Learn &nbsp; <MenuBookIcon />
            </div>
          </Typography>
          <IconButton style={{ fill: "green" }} aria-label="cart">
            <StyledBadge badgeContent={0} color="secondary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
          <AccountCircleIcon onClick={myAccount} />
          <Button color="inherit" onClick={loginNow}>
            {headerName}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
