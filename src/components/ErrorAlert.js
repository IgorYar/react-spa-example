import { Alert, Container } from 'react-bootstrap';

function ErrorAlert({error}) {
    <Container className="mt-5">
        <Alert variant="danger">Error: {error}</Alert>
    </Container>
};

export default ErrorAlert;