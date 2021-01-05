const router = require('express').Router();
const { user, post, comment } = require('../models');
const withAuth = require('../utils/auth');

// Homepage
router.get("/", async (req, res) => {
  try {
    // Find all entries
    const dbPostData = await post.findAll({
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
          model: user,
          attributes: { exclude: ['password'],},
            
          }
        }
      ]
    })

  }
});

module.exports = router;