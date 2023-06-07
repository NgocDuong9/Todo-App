import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "../context/Context";
import { Alert } from "react-bootstrap";

function PrivateRoutes(props) {
  const { user } = useContext(UserContext);

  if (user && !user.auth) {
    return (
      <>
        <Alert variant="danger" className="mt-3">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>You can login </p>
        </Alert>
      </>
    );
  }

  return <>{props.children}</>;
}

export default PrivateRoutes;
