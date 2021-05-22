const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/post/:id/comments', withAuth, (req, res) => {
  res.render('comments', {
    loggedIn: req.session.loggedIn
  })
});

router.get('/post/comments/:id', async (req, res) => {
  const commentData = await Comment.findByPk(req.params.id, {
    include: [
      {
        model: Post,
        attributes: ['id'],
      },
    ],
  });
  const comment = commentData.get({ plain: true });
  // console.log(comment)
  res.render('comments', {
    comment,
    loggedIn: req.session.loggedIn
  })
});

router.post('/:id/comment', (req, res) => {
  Comment.create({
    body: req.body.body,
    postId: req.params.id,
    userId: req.session.userId,
  }).then((newComment) => {
    res.status(200).json(newComment)
  }).then(() => {
    res.redirect('/')
  })
});

router.post('/', (req, res) => {
  Post.create({
    body: req.body.body,
    title: req.body.title,
    userId: req.session.userId
  }).then((newPost) => {
    res.status(200).json(newPost);
  })
});

router.put('/:id', (req, res) => {
  Post.update(req.body, {
    where: {
      id: req.params.id,
    }
  }).then(newPost => {
    res.status(200).json(newPost)
  })
})

router.put('/', async (req, res) => {
  // alert('hi')
  res.redirect('/posts');
  return;
})

router.delete('/:id', (req, res) => {
  // console.log('try to delete post')
  Post.destroy({
    where: {
      id: req.params.id,
    },
  }).then(newPost => {
    res.status(200).json(newPost)
    res.render('homepage')
  })
});

module.exports = router;