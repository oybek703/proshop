const {Router} = require('express');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/asyncMiddleware');
const User = require('../models/user');
const protect = require('../middleware/authMiddleware');
const router = Router();

router.post('/login', asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))) {
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'});
        res.status(200).send({_id: user._id, email, name: user.name, isAdmin: user.isAdmin, token});
    } else {
        res.status(401);
        throw new Error('Invalid email or password.');
    }

}));

router.get('/profile', protect, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(!user) {
        res.status(404);
        throw new Error('User not found.');
    }
    res.send({name: user.name, email: user.email, isAdmin: user.isAdmin});
}));

module.exports = router;