import React, { useState, Fragment, useEffect } from "react";
import BookCard from "../components/card";
import useLoginProvider from "../store/hooks/useLoginProvider";
//import BookList from "../models/booklist";
import { useHistory } from "react-router-dom";
import routes from "../Routes/routes";

import Grid from "@material-ui/core/Grid";

const Home = () => {
  const [bookList, setBookList] = useState([]);
  const { isLoggedIn, loginFunction } = useLoginProvider();
  const history = useHistory();
  // console.log(isLoggedIn);
  useEffect(() => {
    loginFunction();
    if (isLoggedIn) {
      const bookdata = fetch("https://jh783.sse.codesandbox.io/books", {
        mode: "cors"
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          //console.log(data);
          setBookList(data.books);
        })
        .catch(console.error);
    } else {
      history.push(routes.login);
    }
  }, [isLoggedIn, history, loginFunction]);

  return (
    <Fragment>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center">
            {bookList.map((book, index) => {
              return <BookCard key={index} book={book} />;
            })}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Home;
