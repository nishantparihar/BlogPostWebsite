const express = require('express');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');
const { default: axios } = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await fetchPosts(req.query);

  const postsWithImages = await posts.reduce(async (acc, post) => {
    // TODO use this route to fetch photos for each post
    const { data: images } = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
    const resolvedAcc = await acc;
    return [
      ...resolvedAcc,
      {
        ...post,
        images
      },
    ];
  }, []);

  res.json(postsWithImages);
});

module.exports = router;
