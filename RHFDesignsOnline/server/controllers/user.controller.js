const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY
// Secret Key keeps this from being hacked

module.exports = {

    //Where User Registers

    registerUser: async (req, res) => {
        try{
            // ! Check if the user already exists - prevents duplicate entries 
            const potentialUser = await User.findOne({email:req.body.email})
            if (potentialUser){
                res.status(400).json({message:'This email already exists please log in'})
            }
            else{
                const newUser = await User.create(req.body)
                // token authorizes a user to do specific things
                const userToken = jwt.sign({_id: newUser._id, email:newUser.email}, SECRET, {expiresIn:'2h'})
                //Token expires in whatever time specified – then automatic logout
                console.log(userToken);
                res.status(200).cookie('userToken', userToken, {httpOnly:true, maxAge: 2 * 60 * 60 * 1000}).json(newUser)
                //maxAge sets the time, cookie uses userTokens - the userToken, userToken on line 21 is our safety blanket just in case the cookies/cashe gets deleted it keeps the user from getting logged out and losing everything.
            }
        }
        catch(err){
            console.log(err);
            res.status(400).json({error: err})
        }
    },

    //Where User Logs in

    loginUser: async (req, res) => {
        try{
            //search findOne email - if not they need to register
            //await is meant for grabbing 
            const user = await User.findOne({email:req.body.email})
            if(user){
                //bcrypt.compare makes sure passwords match
                const passwordsMatch = await bcrypt.compare(req.body.password, user.password)
                if (passwordsMatch){
                    const userToken = jwt.sign({_id: user._id, email:user.email}, SECRET, {expiresIn:'2h'})
                    //Safety Net
                    res.status(200).cookie('userToken', userToken, {httpOnly:true, maxAge: 2 * 60 * 60 * 1000}).json(user)
                }
                //If password or email is wrong we do not specify what was in error as a protection against hackers
                else{
                    res.status(400).json({message:'Invalid Email/Password'})
                }
            }
            else{
                res.status(400).json({message:'Invalid Email/Password'})
            }
        }
        catch(err){
            res.status(400).json({error: err})
        }
    },

    //clear out the cookie we created - like session.clear - to protect against hackers

    logoutUser: (req, res) => {
        res.clearCookie('userToken')
        res.status(200).json({message:'Logged Out Successfully'})
    }
}
