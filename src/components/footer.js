import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";

const Footer = () => {
  function Copyright() {
    return (
      <div className="footer">
        {/* <AppBar> */}
          <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://8vxxq.csb.app/">
              Lets Learn
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        {/* </AppBar> */}
      </div>
    );
  }

  return <Fragment>{Copyright()}</Fragment>;
};

export default Footer;
