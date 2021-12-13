const express = require("express")
const path = require('path')
const dotenv = require("dotenv")
dotenv.config({ path: path.resolve(__dirname, '../.env') })
require("../src/db/conn")
const postRouter = require("./routes/posts")
const userRouter = require("./routes/user")
const cors = require("cors")


const app = express()
const port = process.env.PORT || 5000


app.use(express.json())
app.use(cors())
app.use(postRouter)
app.use(userRouter)
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
})

if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"))
    const path = require("path")
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

app.listen(port, () => {
    console.log("server is running on port " + port)
})
