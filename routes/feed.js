const express = require('express');
const router = express.Router();

//installare npm install --save express-validator
const { body, query } = require('express-validator');

const feedController = require('../controllers/feed');

//tutte le routes

//GET ALL /feed/posts
router.get('/posts', feedController.getPosts);
router.get('/posts/user/me', feedController.getPostsByMe);
router.get('/posts/search', feedController.searchPost);
router.get('/posts/:id', feedController.getPost);
router.put('/posts/:id', feedController.editPost);

//GET /feed/post/:id
//PUT /feed/post/:id
//DELETE /feed/post/:id
router.delete('/posts/:id', feedController.deletePost);
//POST /feed/post/:id/like    mettiamo tra i preferiti un post

//POST /feed/post
router.post('/post', 
    [
        body('title').trim()
        .isLength({min: 3}).withMessage('Il titolo deve avere minimo 3 caratteri')
        // .isLowercase().withMessage('Devi scrivere tutto minuscolo')
        .exists().withMessage('Campo obbligatorio'),
        // body('titleConfirmed').custom((value,{ req }) => value === req.body.title).withMessage('Titolo non confermato'),
        body('description').trim().isLength({min: 5}).withMessage('La descrizione deve avere minimo 5 caratteri'),
        // query('max').custom((value,{ req }) => value >= 100).withMessage('Il valore deve essere maggiore o uguale a 100'),
    ],
feedController.createPosts);

//POST /user/login
//POST /user/register
//GET /user/me    mi ritorna i dati dell'utente
//PUT /user/:id   verifica i permessi

module.exports = router;