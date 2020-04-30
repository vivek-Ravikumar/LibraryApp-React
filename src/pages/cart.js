import React from "react";
import Card from "../components/card";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

import { useLocation } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
}));

const Cart = () => {
  const location = useLocation();
  const myBook = location.state.book;
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container xs={12} spacing={2}>
            <Grid item>
              <Card book={myBook} />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <h2>Borrowers </h2>
                {myBook.borrowers.map(b => {
                  return (
                    <Grid item xs>
                      <button> Borrow from {b} </button>{" "}
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
};

export default Cart;
