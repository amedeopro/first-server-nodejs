const { validationResult } = require('express-validator');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Post =  require('../models/post');
const User = require('../models/user');

exports.getPosts = (req,res,next) => {
    console.log('UTENTE' + req.user)
    Post.findAll()
    .then((posts) => {
        res.json({posts: posts})
    })
    .catch(
        error => console.log(error)
        );
};

exports.getPost = (req,res,next) => {
    const postId = req.params.id
    Post.findByPk(postId)
    .then((post) => {
        res.json({post: post})
    })
    .catch(err => {
        err => console.log(error)
    })
};


exports.searchPost = (req,res,next) => {
    const title = '%' + req.query.title + '%'
    Post.findAll({where:{ title: {[Op.like] : title}}})
    .then((post) =>{
        res.json({posts: post})
    })
};


exports.createPosts = (req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            message : 'Error input Parametri',
            error : errors.array()
        });
    }

    const title = req.body.title;
    const description = req.body.description;

    req.user.createPost({
        title : title,
        description : description,
    }).then((post) => {
        res.status(201).json({ 
            messages : 'Success Operation',
            post : post
        });
    }).catch( err => {
        return res.status(422).json({
            message : 'Error nel Salvataggio'
        });
    }); 
};


    exports.editPost = (req,res,next) => {
        const postId = req.params.id;
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(422).json({
                message: 'Errore input',
                error: errors.array()
            });
        }
    
        const title = req.body.title;
        const description = req.body.description;

        Post.findByPk(postId).then(post => {
            if(!post){
                res.status(404).json({
                    messages: 'Post insesistente'
                }) 
            }
            post.title = title;
            post.description = description;
            return post.save();
        })
        .then((post) => {
            console.log(post)
            res.json({post : post})
        })
        .catch(err => console.log(err))
    };


    exports.deletePost = (req,res,next) => {
        const postId = req.params.id

        Post.findByPk(postId).then(post => {
            if(!post){
                res.status(404).json({
                    messages: 'Post insesistente'
                }) 
            }
            return post.destroy();
        })
        .then((post) => {
            res.status(201).json({
                messages: 'Post eliminato con successo'
            })
        })
        .catch(err => console.log(err))
    };
