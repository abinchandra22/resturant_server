const express = require('express')
const userController =require('../controller/usercontroller')
const storeController =require('../controller/storeController')
const jwtMiddleware = require("../Middlewarw/jwtMiddleware")
const multerConfig = require('../Middlewarw/multerMiddleware')
const  CommentController = require('../controller/commentController')


// creating an object
const router = new express.Router()



// register api
router.post('/register',userController.register)

// login
router.post('/login',userController.login)

// add store
router.post('/add-store',jwtMiddleware,multerConfig.single('storeImage1'),storeController.addstore)
// get homeproject cards on home page
router.get('/get-home-store',storeController.getHomeStore)

// get all projects , view all project
router.get('/get-all-store',jwtMiddleware,storeController.getAllStore)

// user projects ,view single project
router.get('/get-user-store',jwtMiddleware,storeController.getUserStore)

// updatestore
router.put('/store/edit/:pid',jwtMiddleware,multerConfig.single('storeImage1'),storeController.editStore)

// delete store
router.delete('/remove-store/:pid',jwtMiddleware,storeController.removeStore)

// add comment
router.post('/comment-cmd',jwtMiddleware,CommentController.addComment)


module.exports = router