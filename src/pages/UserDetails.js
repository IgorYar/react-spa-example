import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRequest } from '../slices/userSlice';
import { fetchPostsSuccess } from '../slices/postsSlice.js';
import { Card, Row, Col, Button, Container, Pagination } from 'react-bootstrap';
import { checkUserLoading, getUser, getUserError } from '../selectors/user';
import { getPosts } from '../selectors/posts';
import { MAIN } from '../helpers/url';

import Loading from '../components/Loading';
import ErrorAlert from '../components/ErrorAlert';
import Header from '../components/Header';
import Post from '../components/Post';
import Avatar from '../assets/ava.png';

function UserDetails() {
    const { userId } = useParams();

    const dispatch = useDispatch();

    const user = useSelector(getUser);
    const loading = useSelector(checkUserLoading);
    const posts = useSelector(getPosts);
    const error = useSelector(getUserError);

    const userPosts = posts.filter(post => post.userId === parseInt(userId));

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = userPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

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

    const navigate = useNavigate();

    const backHandler = () => {
        navigate(MAIN);
    }

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
                <Card className="m-3">
                    <Row>
                        <Col md={1} >
                            <Card.Img src={Avatar} alt="avatar" />
                            <Row className="mt-2 mx-auto">
                                <Button className="fs-5 fw-bold" onClick={backHandler}>Back</Button>
                            </Row>
                        </Col>
                        <Col md={11}>
                            {user && (
                                <>
                                    <Card.Header className="fs-2 fw-bold text-center">User Details</Card.Header>
                                    <Card.Body>
                                        <Card.Title className="fs-2">{user.name}</Card.Title>
                                        <Card.Text className="fs-3">{user.email}</Card.Text>
                                    </Card.Body>
                                </>
                            )}
                        </Col>
                    </Row>
                </Card>
            </Container>
            <h2 className="fs-2 fw-bold text-center">User Posts List</h2>
            <Container className="posts">
                {currentPosts.map(post => (
                    <Row key={post.id} className="m-3">
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
