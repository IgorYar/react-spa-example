import React from 'react';

import { Button, Card, Col, Row } from 'react-bootstrap';

import Avatar from '../assets/ava2.png';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUserRequest } from '../slices/userSlice';
import { fetchCommentsRequest } from '../slices/commentsSlice';
import PostComments from './PostComments';

function Post({post}) {
    const dispatch = useDispatch();

    const userDetailsHandler = () => {
        dispatch(fetchUserRequest(post.userId));
    };

    const postCommentsHandler = () => {
        dispatch(fetchCommentsRequest(post.id));
    }

    return (
        <Card>
            <Row>
                <Col md={1}>
                    <Link to={`/user/${post.userId}`} onClick={userDetailsHandler}>
                        <Card.Img src={Avatar} alt="avatar" />
                    </Link>
                </Col>
                <Col md={10}>
                    <Card.Header>
                        <h3>{post.title}</h3>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {post.body}
                        </Card.Text>
                        <Button className="fs-5 fw-bold" variant="primary" onClick={postCommentsHandler}>Comments</Button>
                        <Row>
                            <PostComments />
                        </Row>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
};

export default Post;