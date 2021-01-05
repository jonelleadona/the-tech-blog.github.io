const router = require('express').Router();
const { route } = require('.');
const { user, post, comment } = require('../models');
const withAuth = require('../utils/auth');

// Homepage
router.get("/", async (req, res) => {
  try {
    // Find all entries
    const dbPostData = await p
    ost.findAll({
      include: [
        {
          model: user,
          attributes: ['username'],
        },
      ],
    });
    
    const posts = dbPostData.map((post) =>
      gallery.get({plain:true})
    );

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });

  } catch (err){
    console.log(err);
    res.status(500).json(err);
  }
});

// Comments
router.get("/comment/:id", async (req,res) => {
  try {
    // Finds only one entry
    const dbPostData = await post.findByPk(req.params.id, {
      include: [
        {
          model: comment,
          attributes: { exclude: [
            'password',
            'post_user_id'
          ]},
        },
      ],
    });

    const postData = dbPostData.get({plain : true});

    res.render('comments', {
      postData,
      loggedIn: req.session.loggedIn,
    });

    

  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

// Update Post
route.get("/update/:id", async (req, res) => {
  try {
    const dbPostData = await post.findByPk(req.params,id, {
      attributes: { exclude: [
        'post_user_id'
      ]},
    });

    const postData = dbPostData.get({plain : true});

    res.render('update_post', {
      postData,
      loggedIn: req.session.loggedIn,
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Homepage 
route.get("/dashboard", async (req, res) => {
  try {
    const dbUserData = await user.findByPk(req.session.user_id, {
      attributes: {exclude: ["user_password"] },
      include: [{model: post}],
    });

    const userData = dbPostData.get({plain : true});

    res.render("dashboard", {
      userData,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//  Create post

module.exports = router;