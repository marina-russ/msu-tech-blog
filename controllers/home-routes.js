const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  const postData = await Post.findAll({
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  });
  const posts = postData.map((post) => post.get({ plain: true }))

  res.render('homepage', {
    posts,
    loggedIn: req.session.loggedIn
  })
});

router.get('/posts', withAuth, async (req, res) => {
  res.render('posts', {
    loggedIn: req.session.loggedIn
  })
});

router.get('/post/:id', async (req, res) => {
  // try {
  const postData = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['id'],
      },
      {
        model: Comment,
        attributes: ['id', 'body']
      },
    ],

  });

  const post = postData.get({ plain: true });
  console.log(post)
  res.render('edit_post', {
    post,
    loggedIn: req.session.loggedIn
  });
});

router.get('homepage', withAuth, async (req, res) => {
  const userData = await User.findByPk(req.session.userId, {
    attributes: { exclude: ['password'] },
    include: [{ model: Post }],
  });

  const user = userData.get({ plain: true });

  res.render('homepage', {
    ...user,
    loggedIn: true
  })
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;