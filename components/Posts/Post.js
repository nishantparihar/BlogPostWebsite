import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  'pointer-events': 'none',
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  position: 'relative',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
}));

const PrevButton = styled(Button)`
  left: 10px;
  top: 140px
`;

const NextButton = styled(Button)`
  right: 10px;
  top: 140px
`;

const userInformation = styled.div(() => ({
  display: 'flex',
  justifyContent: 'space-between'
}));

const Post = ({ post }) => {
  const carouselRef = useRef(null);
  const [userInfo, setUserInfo] = useState({});

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const userNameFirstLetters = (name) =>{
      name = name ? name.replace('Mrs. ', '') : "";
      const nameList = name.split(" ");
      const userNameInitiales = nameList.reduce((acc, name) => acc + name[0], "")
      return userNameInitiales
  }

  const userId = post.userId;
  useEffect(()=>{
    axios.get(`/api/v1/users/${userId}`)
    .then((res)=>{
      setUserInfo(res.data)
    })
  }, [])

  return (
    <PostContainer>
        <div style={{display: 'flex', margin: '5px'}}>
          <div style={{backgroundColor: '#808080', borderRadius: '100%', padding: '12px', color: 'white', fontWeight: 'bold'}}>
            {userNameFirstLetters(userInfo.name)}</div>
          <div style={{lineHeight: '15px', marginTop: '10px', marginLeft: '5px'}}>
            <div style={{fontWeight: 'bold'}}>{userInfo.name}</div>
            <div style={{fontSize: '12px', fontWeight: '500'}}>{userInfo.email}</div>
          </div>
        </div>

      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.any,
    images: PropTypes.shape({
      map: PropTypes.func,
    }),
    title: PropTypes.any,
  }),
};

export default Post;
