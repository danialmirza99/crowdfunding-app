const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try{
        const projectData = await Project.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                }
            ]
        });
        const projects = projectData.map((elements) => elements.get({plain: true}));
        res.render('homepage', {
            projects, 
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status().json(err)
    }
});

router.get('/profile', withAuth, async (req, res) => {
    try{
        const profileData = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Project,
                    attributes: ['id'],
                }
            ]
        });
        const profile = profileData.map((elements) => elements.get({plain: true}));
        res.render('profile', {
            profile, 
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status().json(err)
    }
});

// router.get('/projects/:id', withAuth, async (req, res) => {
//     try{
//         const userProjectData = await Project.findByPk(req.params.id, {
//             attributes: ['id']
//         });
//         const userProject = userProjectData.map((elements) => elements.get({plain: true}));
//         res.render('projects', {
//             userProject, 
//             logged_in: req.session.logged_in,
//         });
//     } catch (err) {
//         res.status().json(err)
//     }
// });


router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;