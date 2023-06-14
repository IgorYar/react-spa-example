import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Col, Button, Container } from 'react-bootstrap';

import Loading from './Loading';
import Post from './Post';

import { fetchUserRequest } from '../slices/userSlice';
import { fetchPostsSuccess } from '../slices/postsSlice.js';

import Avatar from '../assets/ava2.png';
import Header from './Header';

function UserDetails() {
    const { userId } = useParams();

    const dispatch = useDispatch();

    const user = useSelector(state => state.user.user);
    const loading = useSelector(state => state.user.loading);
    const posts = useSelector(state => state.posts.posts);

    const navigate = useNavigate();

    const backHandler = () => {
        navigate('/');
    }

    useEffect(() => {
        dispatch(fetchUserRequest(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem(`user_${userId}_posts`));
        if (storedPosts && storedPosts.length > 0) {
            dispatch(fetchPostsSuccess(storedPosts));
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (posts.length > 0) {
            const userPosts = posts.filter(post => post.userId === parseInt(userId));
            localStorage.setItem(`user_${userId}_posts`, JSON.stringify(userPosts));
        }
    }, [posts, userId]);

    if (loading) {
        return <Loading />;
    }

    const userPosts = posts.filter(post => post.userId === parseInt(userId));
    const userPostsTitle = `${user.name}'s Posts List`;

    return (
        <>
            <Header />
            <Container className="m-4 mx-auto">
                <Card>
                    <Col md={1} >
                        <Card.Img src={Avatar} alt="avatar" />
                        <Row className="mt-2 mx-auto">
                            <Button className="fs-5 fw-bold" onClick={backHandler}>Back</Button>
                        </Row>
                    </Col>
                    <Col md={10}>
                        {user && (
                            <div>
                                <Card.Body>
                                    <Card.Title>{user.name}</Card.Title>
                                    <Card.Text>{user.email}</Card.Text>
                                </Card.Body>
                            </div>
                        )}
                    </Col>
                </Card>
            </Container>
            <h2 style={{margin: "10px", textAlign: "center", fontWeight: "bold"}}>{userPostsTitle}</h2>
            <Container className="posts">
                {userPosts.map(post => (
                    <Row key={post.id}>
                        <Post post={post} />
                    </Row>
                ))}
            </Container>
        </>
  );
};

export default UserDetails;
