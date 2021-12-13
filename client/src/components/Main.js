import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { useSelector, useDispatch } from "react-redux"
import CustomCard from "../components/CustomCard"
import * as postServices from "../services/postServices"
import CircularProgress from '@material-ui/core/CircularProgress';
import * as postsAction from "../redux/actions/PostActions"


const useStyles = makeStyles((theme) => ({

    mainGrid: {
        marginTop: "20px",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column-reverse",
        }
    }
}));

function Main() {
    const classes = useStyles()
    const [currentId, setCurrentId] = useState(null)
    const user = useSelector(state => state.user)
    const posts = useSelector(state => state.posts)
    const post = currentId ? (posts ?.posts ?.find(post => post._id == currentId)) : null
    const dispatch = useDispatch()
    const [newPost, setNewPost] = useState({ title: "", message: "", tags: "", image: "" })
    const [error, setError] = useState({ title: "", message: "", tags: "", image: "" })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        dispatch(postsAction.getPosts())
    }, [])

    useEffect(() => {
        if (currentId) {
            setNewPost(post)
        }
    }, [currentId])

    async function createPost(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append("title", newPost.title)
        formData.append("message", newPost.message)
        formData.append("tags", newPost.tags)
        formData.append("image", newPost.image)
        if (!currentId) {
            try {
                setIsLoading(true)
                const response = await postServices.createPost(formData)
                setNewPost({ title: "", message: "", tags: "", image: "" })
                setError({ title: "", message: "", tags: "", image: "" })
                setIsLoading(false)
                alert(response.message)
                dispatch({ type: "CREATE_POST", payload: response.post })
            } catch (error) {
                setIsLoading(false)
                if (error ?.errors ?.title ?.message) {
                    return alert(error ?.errors ?.title ?.message)
                }
                if (error ?.errors ?.message ?.message) {
                    return alert(error ?.errors ?.message ?.message)
                }
                if (error ?.message) {
                    return alert(error ?.message)
                }
                console.log(error)
            }
        }
        else {
            try {
                setIsLoading(true)
                const response = await postServices.updatePost(currentId, formData)
                setNewPost({ title: "", message: "", tags: "", image: "" })
                setError({ title: "", message: "", tags: "", image: "" })
                setCurrentId(null)
                setIsLoading(false)
                alert(response.message)
                dispatch({ type: "UPDATE_POST", payload: response.post })
            } catch (error) {
                setIsLoading(false)
                if (error ?.errors ?.title ?.message) {
                    return alert(error ?.errors ?.title ?.message)
                }
                if (error ?.errors ?.message ?.message) {
                    return alert(error ?.errors ?.message ?.message)
                }
                if (error ?.message) {
                    return alert(error ?.message)
                }
                console.log(error)
            }

        }

    }

    function clearPost() {
        setNewPost({ title: "", message: "", tags: "", image: "" })
        setError({ title: "", message: "", tags: "", image: "" })
        setCurrentId(null)
    }

    async function deletePost(id) {
        try {
            const response = await postServices.deletePost(id)
            alert(response.message)
            dispatch({ type: "DELETE_POST", payload: id })
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <Grid className={classes.mainGrid} container spacing={5}>
            <Grid container item md={8} spacing={5}>
                {
                    posts ?.posts ?.map((post) => {
                        // { owner, name, message, tags, likes, createdAt, image } = post
                        return <CustomCard
                            key={post._id}
                            id={post._id}
                            currentId={currentId}
                            setCurrentId={setCurrentId}
                            owner={post.owner}
                            name={post.name}
                            message={post.message}
                            tags={post.tags}
                            title={post.title}
                            likes={post.likes}
                            createdAt={post.createdAt}
                            isAuth={user.isAuth}
                            onClick={deletePost}
                            image={Buffer.from(post ?.image ?.data).toString('base64')} />
                    })
            }
            </Grid>
            <Grid item md={4}>
                <Paper align="center" style={{ padding: "30px" }}>
                    {user.isAuth ? <>
                        <Typography variant="h5"> {!currentId ? "Creating" : "Editing"} a memory</Typography>
                        <Divider />
                        <form onSubmit={createPost}>
                            <TextField
                                label="title"
                                name="title"
                                error={!error.name ? undefined : true}
                                helperText={!error.name ? undefined : error.name}
                                fullWidth
                                value={newPost.title}
                                onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                            />
                            <TextField
                                label="message"
                                name="message"
                                error={!error.message ? undefined : true}
                                helperText={!error.message ? undefined : error.message}
                                fullWidth
                                value={newPost.message}
                                onChange={e => setNewPost({ ...newPost, message: e.target.value })}
                            />
                            <TextField
                                label="tags (comma separated)"
                                fullWidth
                                name="tags"
                                error={!error.tags ? undefined : true}
                                helperText={!error.tags ? undefined : error.tags}
                                value={newPost.tags}
                                onChange={e => setNewPost({ ...newPost, tags: e.target.value })}
                            />
                            <TextField
                                label=" "
                                fullWidth
                                type={isLoading ? "text" : "file"}
                                value={null}
                                name="image"
                                error={!error.image ? undefined : true}
                                helperText={!error.image ? undefined : error.image}
                                onChange={e => setNewPost({ ...newPost, image: e.target.files[0] })}
                            />
                            <Button disabled={isLoading} type="submit" variant={isLoading ? "outlined" : "contained"} style={{ margin: "10px 0" }} color="primary" fullWidth>{isLoading ? <CircularProgress /> : "Submit"}</Button>
                            <Button disabled={isLoading} variant="contained" color="secondary" onClick={clearPost} fullWidth>Clear</Button>
                        </form>
                    </> : <Typography variant="body2" component="p">Please login to create your memories and like other's people memories.</Typography>}
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Main
