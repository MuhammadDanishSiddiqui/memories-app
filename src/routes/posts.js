const express = require("express")
const Post = require("../models/posts")
const multer = require("multer")
const auth = require("../middleware/auth")
const upload = multer({
    limits: {
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.endsWith(".jpg") && !file.originalname.endsWith(".jpeg") && !file.originalname.endsWith(".png")) {
            cb(new Error("Please select a jpg or png file"))
        }
        cb(undefined, true)
    }
})

const router = new express.Router()

router.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find()
        res.send(posts)

    } catch (error) {
        res.status(500).send(error)
    }
})

router.post("/posts", auth, upload.single("image"), async (req, res) => {
    console.log(req.body)
    try {
        const newPost = new Post({ ...req.body, image: req.file ?.buffer, owner: req.user._id, name: req.user.name })
        await newPost.save()
        res.status(201).send({ message: "Post added successfully", post: newPost })
    } catch (error) {
        res.status(400).send(error)
    }
}, (error, req, res, next) => {
    res.status(400).send({ message: error.message })
})


router.patch("/posts/:id", auth, upload.single("image"), async (req, res) => {

    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { ...req.body, image: req.file ?.buffer}, { new: true })
        await updatedPost.save()
        res.send({ message: "Post updated successfully", post: updatedPost })
    } catch (error) {
        res.status(500).send(error)
    }
}, (error, req, res, next) => {
    res.status(400).send({ message: error.message })
})

router.patch("/posts/:id/likePost", auth, async (req, res) => {

    try {
        const post = await Post.findOne({ _id: req.params.id })
        if (!post.likes.includes(req.user._id.toString())) {
            post.likes.push(req.user._id.toString())
        }
        else {
            post.likes = post.likes.filter(id => {
                return id != req.user._id.toString()
            })
        }
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, { new: true })
        res.send({ message: "Post updated", post: updatedPost })
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete("/posts/:id", auth, async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        res.send({ message: "Post deleted successfully.", post })
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router