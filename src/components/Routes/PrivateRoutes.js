import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

function PrivateRoutes(props) {
  const user = useSelector((state) => state.user.account);

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
