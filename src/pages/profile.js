import React, { useEffect, Fragment, useState } from "react";
import useLogggedInUserDataProvider from "../store/hooks/useLogggedInUserData";
import { useHistory, useLocation } from "react-router-dom";
import BookCard from "../components/card";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import routes from "../Routes/routes";
const Profile = () => {
  const { loggedInUserId } = useLogggedInUserDataProvider();
  const location = useLocation();
  const history = useHistory();
  const [userProfile, setUserProfile] = useState({
    borrowedBooks: [],
    email: "",
    name: ""
  });
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    console.log("useeffect");
    console.log(loggedInUserId);
    if (loggedInUserId) {
      fetch(`https://jh783.sse.codesandbox.io/user/${loggedInUserId}`)
        .then(result => result.json())
        .then(data => {
          console.log("from fetch", data);
          setUserProfile(data);
          setBorrowedBooks(data.borrowedBooks);
        })
        .catch(e => console.error(e));
    } else {
      history.push(routes.login);
    }
  }, [borrowedBooks]);

  return (
    <Fragment>
      {" "}
      <h2 className="title"> Welcome {userProfile.name.toUpperCase()} </h2>
      {borrowedBooks[0] ? (
        <h2 className="title"> Books you borrowed! </h2>
      ) : (
        <h2 className="title"> Books you borrow appear here! </h2>
      )}
      <Fragment>
        <Container maxWidth="sm">
          {borrowedBooks.map(b => (
            <Fragment>
              <BookCard book={b} profile={true} />
              <br />
            </Fragment>
          ))}
        </Container>
      </Fragment>
    </Fragment>
  );
};

export default Profile;
