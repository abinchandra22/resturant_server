const users = require('../Models/userModel')
const jwt = require('jsonwebtoken')


// register request
exports.register = async (req, res) => {
    // console to find this req working or not
    console.log("INSIDE REGISTER API");
    const { username, email, password } = req.body
    console.log(username, email, password);
    try {
        const existingUser = await users.findOne({ email })
        console.log(existingUser);
        if (existingUser) {
            res.status(406).json("Account already exists...please login!!")
        }
        else {
            //add user to collection from  user modules creating object
            const newUser = new users({
                username, email, password, profile: "", uname: "", insta: ""

            })
            // call to server
            await newUser.save()
            console.log(newUser);
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(401).json(err)
    }

}

// login

exports.login = async (req, res) => {
    console.log("inside login API");
    const { email, password } = req.body
    console.log(email, password);
    try {
        const existingUser = await users.findOne({ email, password })
        console.log(existingUser);
        if (existingUser) {
            // exist user allow login
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET_KEY)
            res.status(200).json({ existingUser, token })
        }
        else {
            res.status(404).json("Invalid email/password!!!")
        }
    } catch (err) {
        res.status(401).json(err)
    }
}


