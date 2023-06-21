import { Card, Col, Row } from 'react-bootstrap';

function Comment({comment}) {
    return (
        <Card className="comment my-1">
            <Row>
                <Col md={10}>
                    <Card.Header>
                        <h3>{comment.email}</h3>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {comment.body}
                        </Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
};

export default Comment;