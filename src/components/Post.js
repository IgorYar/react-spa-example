import React from 'react';

import { Button, Card, Col, Row } from 'react-bootstrap';

import Avatar from '../assets/ava2.png';

function Post({post}) {
    return (
        <Card>
            <Row>
                <Col md={1}>
                    <Card.Img src={Avatar} alt="avatar" />
                </Col>
                <Col md={10}>
                    <Card.Header>
                        <h3>{post.title}</h3>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {post.body}
                        </Card.Text>
                        <Button variant="primary">Комментарии</Button>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
};

export default Post;