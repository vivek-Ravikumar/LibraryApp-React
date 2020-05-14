import React, { useEffect, useState } from "react";
import Card from "../components/card";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import useLogggedInUserDataProvider from "../store/hooks/useLogggedInUserData";
import routes from "../Routes/routes";
import { useLocation, useHistory } from "react-router-dom";

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
  const history = useHistory();
  const [cartBooks, setCartBooks] = useState([]);
  const [cartEmpty, setCartEmpty] = useState("Fetching Cart...");
  const {
    loggedInUserId,
    loggedInUserIdFunction
  } = useLogggedInUserDataProvider();

  useEffect(() => {
    if (loggedInUserId) {
      fetch(`https://jh783.sse.codesandbox.io/user/${loggedInUserId}`)
        .then(result => result.json())
        .then(data => {
          setCartBooks(data.cart);
          if (cartBooks[0]) {
            setCartEmpty("");
          } else {
            setCartEmpty("Your Cart is empty! ");
          }
        })
        .catch(e => console.error(e));
    } else {
      history.push(routes.login);
    }
  }, [cartBooks]);

  const myBook = location.state
    ? location.state.book
    : {
        title: "Nothing in Cart",
        description: "",
        Author: "",
        borrowers: []
      };
  const classes = useStyles();

  const borrowFunction = event => {
    const bookId = event.target.id;
    //console.log(loggedInUserId);
    fetch(
      `https://jh783.sse.codesandbox.io/books/borrow/${loggedInUserId}/${bookId}`
    )
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          alert("happy Learning");
        } else {
          alert(data.status);
        }
      });
  };

  return (
    <div>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container xs={12} spacing={2}>
            <Grid item>
              <h2 className="title"> {cartEmpty}</h2>
              {cartBooks.map(book => {
                return (
                  <div>
                    {" "}
                    <Card book={book} />
                    <br />
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <button id={book._id} onClick={borrowFunction}>
                            {" "}
                            Borrow
                          </button>{" "}
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                );
              })}
            </Grid>

            {/* <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <button onClick={borrowFunction}> Borrow</button>{" "}
                </Grid>
              </Grid>
            </Grid> */}
          </Grid>
        </Paper>
      </div>
    </div>
  );
};

export default Cart;
