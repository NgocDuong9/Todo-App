import { Alert } from "react-bootstrap";

const Notfound = () => {
  return (
    <>
      <Alert variant="success">
        <Alert.Heading>Page Not Found</Alert.Heading>

        <hr />
        <p className="mb-0">
          We could not find what you were looking for. Please contact the owner
          of the site that linked you to the original URL and let them know
          their link is broken.
        </p>
      </Alert>
    </>
  );
};

export default Notfound;
