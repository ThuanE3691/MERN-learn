const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const User = require('../models/User.js')

const verifyToken = require('../middleware/auth')

// Check User has logined in

router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if (!user){
            return res
            .status(400)
            .json({
                success: false,
                message: 'User not found'
            })
        }

        res
        .json({
            success: true,
            message: 'User has logged in',
            user: user
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: 'Internal Server',
            error: error.message
        })
    }   
})



// SIGN IN

router.post('/register',async (req, res) => {
    const {username, password} = req.body

    // Simple Validation
    if (!username || !password) {
        return res
        .status(400)
        .json({
            success: false, 
            message: 'Missing username or password'
        })
    }
    try {
        const user = await User.findOne({ username: username });
        if (user){
            return res
            .status(400)
            .json({
                success: false, 
                message: 'Username already in use'
            })
        }
        
        // All good

        const hashedPassword = await argon2.hash(password)
        const newUser = new User({username, password: hashedPassword})
        await newUser.save()

        // Return token
        const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)
        res.json({
            success: true,
            message: 'User registered successfully',
            accessToken: accessToken
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: 'Internal Server',
            error: error.message
        })
    } 
})


// LOGIN IN
router.post('/login',async (req, res) => {
    const {username, password} = req.body
    if (!username || !password) {
        return res
        .status(400)
        .json({
            success: false, 
            message: 'Missing username or password'
        })
    }

    try {
        const user  = await User.findOne({username})
        if (!user){
            return res
            .status(400)
            .json({
                success: false,
                message: "Your username or password is incorrect"
            })
        }

        // Username found
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid){
            return res
            .status(400)
            .json({
                success: false,
                message: "Your username or password is incorrect"
            })
        }

        const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)
        res.json({
            success: true,
            message: 'User logged in successfully',
            accessToken: accessToken
        })


    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: 'Internal Server',
            error: error.message
        })
    }
    
})

module.exports = router
