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

import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

export default function BookCard({ book = {} }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [cartPage, setCartPage] = useState(false);

  useEffect(() => {
    if (location.pathname === "/cart") {
      setCartPage(true);
    }
  }, [location]);

  const borrowFunction = event => {
    history.push(routes.cart, { book: book });
    console.log(event.target);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={bookImage} title="" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
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
            onClick={borrowFunction}
            variant="contained"
            color="primary"
          >
            Borrow
          </button>
          &nbsp; &nbsp;
          <button size="small" variant="contained" color="primary">
            Add to Cart
          </button>
        </CardActions>
      )}
    </Card>
  );
}
