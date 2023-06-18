import React, { useEffect, useState } from "react";
import { Row, Container, Pagination } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import Post from "./Post";
import { fetchPostsRequest } from '../slices/postsSlice';
import Header from "./Header"
import ErrorAlert from "./ErrorAlert";

function Posts() {
    const dispatch = useDispatch();

    const posts = useSelector((state) => state.posts.posts);
    const isLoading = useSelector((state) => state.posts.loading);
    const error = useSelector((state) => state.posts.error);

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
            <h1 style={{margin: "10px", textAlign: "center", fontWeight: "bold"}}>Posts List</h1>
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
}

export default Posts;