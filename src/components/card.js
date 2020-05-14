import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import routes from "../Routes/routes";
import bookImage from "../static/bookImage.jpg";
import useLogggedInUserDataProvider from "../store/hooks/useLogggedInUserData";

import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

export default function BookCard({ book = {}, profile = false }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [cartPage, setCartPage] = useState(false);
  const { loggedInUserId } = useLogggedInUserDataProvider();

  useEffect(() => {
    if (location.pathname === "/cart") {
      setCartPage(true);
    }
  }, [location]);

  const borrowFunction = event => {
    if (!profile) {
      history.push(routes.cart, { book });
    } else {
      const bookId = event.target.id;
      fetch(
        `https://jh783.sse.codesandbox.io/books/return/${loggedInUserId}/${bookId}`
      )
        .then(response => response.json())
        .then(data => alert(data.status));
    }
  };

  const cartFunction = event => {
    const bookId = event.target.id;
    const buttonName = event.target.name;
    if (!profile) {
      fetch(
        `https://jh783.sse.codesandbox.io/books/addToCart/${loggedInUserId}/${bookId}`
      )
        .then(response => response.json())
        .then(data => {
          if (data.status === "success") {
            if (buttonName === "borrow") {
              history.push(routes.cart);
            } else {
              alert("added to cart");
            }
          } else {
            alert(data.status);
          }
        });
    } else {
      fetch(
        `https://jh783.sse.codesandbox.io/books/return/${loggedInUserId}/${bookId}`
      )
        .then(response => response.json())
        .then(data => {
          if (data.status === "success") {
            alert("Successfully Returned! please continue your Learning Quest");
          } else {
            alert(data.status);
          }
        });
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={bookImage} title="" />
        <CardContent>
          <Typography
            className="title"
            gutterBottom
            variant="h5"
            component="h2"
          >
            {book.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {book.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      {!cartPage && (
        <CardActions>
          <button
            id={book._id}
            size="small"
            onClick={cartFunction}
            variant="contained"
            color="primary"
            name="borrow"
          >
            {profile ? "Return" : "Borrow"}
          </button>
          &nbsp; &nbsp;
          {!profile && (
            <button
              id={book._id}
              size="small"
              name="addToCart"
              variant="contained"
              onClick={cartFunction}
              color="primary"
            >
              Add to Cart
            </button>
          )}
        </CardActions>
      )}
    </Card>
  );
}
