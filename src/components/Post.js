import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRequest } from '../slices/userSlice';
import { fetchCommentsRequest } from '../slices/commentsSlice';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Collapse, Container, Row } from 'react-bootstrap';
import { getComments } from '../selectors/comments';
import { MAIN } from '../helpers/url';

import Avatar from '../assets/ava.png';
import Comment from './Comment';

import 'bootstrap/dist/js/bootstrap.bundle';

function Post({post}) {
    const dispatch = useDispatch();

    const comments = useSelector(getComments);

    const [openComments, setOpenComments] = useState({});

    const userDetailsHandler = () => {
        dispatch(fetchUserRequest(post.userId));
    };

    const postCommentsHandler = (id) => {
        dispatch(fetchCommentsRequest(id));
        setOpenComments(prevState => ({...prevState, [id]: !prevState[id]}));
    }

    return (
        <Card>
            <Row>
                <Col md={1}>
                    <Link to={MAIN + `user/${post.userId}`} onClick={userDetailsHandler}>
                        <Card.Img src={Avatar} alt="avatar" />
                    </Link>
                </Col>
                <Col md={11} className="p-0">
                    <Card.Header>
                        <h3>{post.title}</h3>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text className="fs-4">
                            {post.body}
                        </Card.Text>
                        <Button className="fs-5 fw-bold btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={() => postCommentsHandler(post.id)}>Comments</Button>
                        <Collapse in={openComments[post.id]}>
                            <Container className="comments">
                                <h2 className="m-1 fw-bold text-center">Post Comments List</h2>
                                {comments.map(comment => (
                                    <Row key={comment.id}>
                                        <Comment comment={comment} />
                                    </Row>
                                ))}
                            </Container>
                        </Collapse>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
};

export default Post;