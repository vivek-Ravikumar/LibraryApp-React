import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import routes from "../Routes/routes";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useLoginProvider from "../store/hooks/useLoginProvider";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignIn() {
  const { isLoggedIn, loginFunction } = useLoginProvider();
  const classes = useStyles();
  const [action, setAction] = useState("log In");
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [cPwd, setCPwd] = useState("");
  const history = useHistory();

  const enterEmail = event => setEmail(event.target.value);
  const enterPwd = event => setPwd(event.target.value);
  const enterCPwd = event => setCPwd(event.target.value);

  const signup = () => {
    setAction("sign Up");
  };

  const onSubmit = event => {
    event.preventDefault();
    console.log(action);
    const userData = {
      email,
      password
    };
    if (action === "log In") {
      try {
        fetch("https://3ygjr.sse.codesandbox.io/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/JSON"
          },
          body: JSON.stringify(userData)
        })
          .then(response => response.json())
          .then(data => {
            if (data.status === "success") {
              alert("login success");
              loginFunction(true);
              history.push(routes.home);
            } else {
              alert(data.status);
            }
          });
      } catch (e) {
        console.error(e);
        alert("something went wrong");
      }
    } else if (action === "sign Up") {
      try {
        fetch("https://3ygjr.sse.codesandbox.io/login/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/JSON"
          },
          body: JSON.stringify(userData)
        })
          .then(response => response.json())
          .then(data => {
            if (data.status === "success") {
              alert("signup success");
              loginFunction(true);
              history.push(routes.home);
            }
          });
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {action.to}
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={enterEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={enterPwd}
          />

          {action === "sign Up" && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="confirmPassword"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              value={cPwd}
              onChange={enterCPwd}
            />
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            {action}
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link onClick={signup} variant="body2">
                {action === "log In" && "Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
