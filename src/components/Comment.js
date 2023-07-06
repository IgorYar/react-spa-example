import { Card, Col } from 'react-bootstrap';

function Comment({comment}) {
    return (
        <Card className="comment my-1 p-0">
            <Col md={12}>
                <Card.Header>
                    <h3>{comment.email}</h3>
                </Card.Header>
                <Card.Body>
                    <Card.Text className="fs-5">
                        {comment.body}
                    </Card.Text>
                </Card.Body>
            </Col>
        </Card>
    );
};

export default Comment;