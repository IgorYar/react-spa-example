import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Col, Button, Container, Pagination } from 'react-bootstrap';

import Loading from './Loading';
import Post from './Post';

import { fetchUserRequest } from '../slices/userSlice';
import { fetchPostsSuccess } from '../slices/postsSlice.js';

import Avatar from '../assets/ava2.png';
import Header from './Header';
import ErrorAlert from './ErrorAlert';

function UserDetails() {
    const { userId } = useParams();

    const dispatch = useDispatch();

    const user = useSelector(state => state.user.user);
    const loading = useSelector(state => state.user.loading);
    const posts = useSelector(state => state.posts.posts);
    const error = useSelector(state => state.user.error);

    const userPosts = posts.filter(post => post.userId === parseInt(userId));

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = userPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    // const userPostsTitle = `${user.name}'s Posts List`;

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

    if (error) {
        return <ErrorAlert error={error} />;
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <Header />
            <Container className="m-4 mx-auto">
                <Card>
                    <Row>
                    <Col md={1} >
                        <Card.Img src={Avatar} alt="avatar" />
                        <Row className="mt-2 mx-auto">
                            <Button className="fs-5 fw-bold" onClick={backHandler}>Back</Button>
                        </Row>
                    </Col>
                    <Col md={10}>
                        {user && (
                            <>
                                <Card.Header className="fs-3 fw-bold text-center">User Details</Card.Header>
                                <Card.Body>
                                    <Card.Title className="fs-3">{user.name}</Card.Title>
                                    <Card.Text className="fs-4">{user.email}</Card.Text>
                                </Card.Body>
                            </>
                        )}
                    </Col>
                    </Row>
                </Card>
            </Container>
            <h2 style={{margin: "10px", textAlign: "center", fontWeight: "bold"}}>User Posts</h2>
            <Container className="posts">
                {currentPosts.map(post => (
                    <Row key={post.id}>
                        <Post post={post} />
                    </Row>
                ))}
            </Container>
            <div className="d-flex justify-content-center mt-4">
                <Pagination>
                    {Array.from({length: totalPages}, (_, index) => (
                        <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>
        </>
  );
};

export default UserDetails;
