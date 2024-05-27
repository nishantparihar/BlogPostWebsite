import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import useWindowWidth from '../hooks/useWindowWidth';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadingButton, setShowLoadingButton] = useState(true);

  const { isSmallerDevice } = useWindowWidth();

  const fetchPost = async (start) => {
    setIsLoading(true);
    const { data: posts } = await axios.get('/api/v1/posts', {
      params: { start: start, limit: isSmallerDevice ? 5 : 10 },
    });
    setPosts((prev) => [...prev, ...posts]);
    setIsLoading(false);
  };


  useEffect(() => {
    fetchPost(posts.length);
  }, [isSmallerDevice]);

  const handleClick = () => {
    fetchPost(posts.length)
    if(posts.length == 100)
      setShowLoadingButton(false);
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map((post, ind) => (
          <Post post={post} key={ind} />
        ))}
      </PostListContainer>

      { showLoadingButton && <div style={{ display: 'flex', justifyContent: 'center' }}>
        <LoadMoreButton onClick={handleClick} disabled={isLoading}>
          {!isLoading ? 'Load More' : 'Loading...'}
        </LoadMoreButton>
      </div>}
    </Container>
  );
}
