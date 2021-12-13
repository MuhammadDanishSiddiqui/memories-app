import React from 'react'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import moment from "moment"
import * as postServices from "../services/postServices"
import { useDispatch, useSelector } from "react-redux"

import Divider from '@material-ui/core/Divider';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';

function CustomCard({ onClick, id, owner, name, title, message, tags, image, likes, createdAt, isAuth, currentId, setCurrentId }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const Likes = ({ likes, onClick }) => {
        if (likes.length == 0) {
            return <Button onClick={onClick} disabled={!isAuth} color="primary" startIcon={<ThumbUpAltOutlinedIcon />} >Like</Button>
        }

        if (likes.length == 1 && isAuth && likes.includes(user ?.user ?._id.toString())) {
            return <Button onClick={onClick} disabled={!isAuth} color="primary" startIcon={<ThumbUpAltIcon />} >You Like</Button>
        }
        else if (likes.length == 1) {
            return <Button onClick={onClick} disabled={!isAuth} color="primary" startIcon={<ThumbUpAltOutlinedIcon />} >1 Like</Button>
        }

        if (likes.length > 1 && isAuth && likes.includes(user ?.user ?._id.toString())) {
            return <Button onClick={onClick} disabled={!isAuth} color="primary" startIcon={<ThumbUpAltIcon />} >You and {likes.length - 1} other {likes.length > 2 ? "s" : null} Like</Button>
        }
        else {
            return <Button onClick={onClick} disabled={!isAuth} color="primary" startIcon={<ThumbUpAltOutlinedIcon />} >{likes.length} Likes</Button>
        }


    }

    async function likePost(id) {

        try {
            const response = await postServices.likePost(id)
            dispatch({ type: "UPDATE_POST", payload: response.post })
        } catch (error) {
            console.log(error)
        }
    }

    return (

        < Grid item sm={6} xs={12} >
            <Card>
                <CardHeader
                    action={owner == (user ?.user ?._id) ?
                        <IconButton onClick={() => setCurrentId(id)}>
                            <MoreVertIcon />
                        </IconButton>
                        : null
                    }
                    title={name}
                    subheader={moment(createdAt).format('LL')}
                />
                <CardMedia
                    image={`data:image;base64,${image}`}
                    title="memories"
                    style={{
                        paddingTop: '50.25%',
                    }}
                />
                <CardContent style={{ height: "120px", overflow: "auto" }}>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {tags ?.split(",").map(tag => {
                            return "#" + tag + " "
                        })}
                    </Typography>
                    <Typography variant="h5">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {message}
                    </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                    <Likes onClick={() => likePost(id)} likes={likes} />
                    {
                        owner == (user ?.user._id) ? <IconButton onClick={() => onClick(id)} style={{ marginLeft: "auto" }}>
                            <DeleteIcon color="secondary" />
                        </IconButton> : null
                    }
                </CardActions>
            </Card>
        </Grid >
    )
}




export default CustomCard
