const express = require("express")
const User = require("../models/user")
const auth = require("../middleware/auth")

const router = new express.Router()

router.post("/user/signup", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (user) {
            return res.status(400).send({ message: "Email already exit" })
        }
        if (req.body.password != req.body.confirm) {
            return res.status(400).send({ message: "password did not match" })
        }
        const newUser = new User(req.body)
        await newUser.save()
        res.status(201).send({ message: "Singed up successsfully" })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post("/user/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ message: "Logged in successsfully", token, user })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

router.post("/user/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token != req.token
        })
        await req.user.save()
        res.send({ message: "Logout successfully" })
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router