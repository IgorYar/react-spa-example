import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostsRequest } from '../slices/postsSlice';
import { Row, Container, Pagination } from "react-bootstrap";
import { checkPostsLoading, getPostsError, getPosts } from "../selectors/posts";

import Loading from "../components/Loading";
import ErrorAlert from "../components/ErrorAlert";
import Header from "../components/Header"
import Post from "../components/Post";

function Posts() {
    const dispatch = useDispatch();

    const posts = useSelector(getPosts);
    const isLoading = useSelector(checkPostsLoading);
    const error = useSelector(getPostsError);

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    useEffect(() => {
        dispatch(fetchPostsRequest());
    }, [dispatch]);

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <ErrorAlert error={error} />
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <Header />
            <h1 className="m-1 fw-bold text-center">Posts List</h1>
            <Container className="posts p-0">
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
}

export default Posts;