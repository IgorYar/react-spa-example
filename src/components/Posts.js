import React, { useEffect } from "react";
import { Row, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import Post from "./Post";
import { fetchPostsRequest } from '../slices/postsSlice';
import Header from "./Header"

function Posts() {
    const dispatch = useDispatch();

    const posts = useSelector((state) => state.posts.posts);
    const isLoading = useSelector((state) => state.posts.loading);

    useEffect(() => {
        dispatch(fetchPostsRequest());
      }, [dispatch]);

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Header />
            <h1 style={{margin: "10px", textAlign: "center", fontWeight: "bold"}}>Posts List</h1>
            <Container className="posts">
                {posts.map(post => (
                    <Row key={post.id}>
                        <Post post={post} />
                    </Row>
                ))}
            </Container>
        </>
    );
}

export default Posts;