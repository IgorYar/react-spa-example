import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Container } from 'react-bootstrap';

import Loading from './Loading';

import ErrorAlert from './ErrorAlert';
import Comment from './Comment';

function PostComments() {
    const dispatch = useDispatch();

    const loading = useSelector(state => state.user.loading);
    const comments = useSelector(state => state.comments.comments);
    const error = useSelector((state) => state.user.error);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorAlert error={error} />;
    }

    return (
        <>
            <h2 style={{margin: "10px", textAlign: "center", fontWeight: "bold"}}>Comments</h2>
            <Container className="comments">
                {comments.map(comment => (
                    <Row key={comment.id}>
                        <Comment comment={comment} />
                    </Row>
                ))}
            </Container>
        </>
  );
};

export default PostComments;