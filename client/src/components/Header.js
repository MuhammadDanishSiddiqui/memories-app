import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import logo from "../assets/logo.png"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import * as userServices from "../services/userServices"
import * as postAction from "../redux/actions/PostActions"
import {
    useNavigate
} from "react-router-dom";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    header_wrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        marginTop: "20px",
        [theme.breakpoints.only("xs")]: {
            flexDirection: "column",
        }
    },
    action_btn: {
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.only("xs")]: {
            marginTop: "10px"
        }
    }
}));

function Header() {
    const classes = useStyles()
    const navigate = useNavigate();
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()


    async function logout() {
        try {
            const response = await userServices.logoutUser()
            dispatch({ type: "LOGOUT" })
            localStorage.clear()
            axios.defaults.headers.common['Authorization'] = null
            dispatch(postAction.getPosts())
            alert(response.message)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Paper className={classes.header_wrapper}>
            <Link to="/">
                <img src={logo} alt="" width="150px" />
            </Link>

            {!user ?.isAuth ? <div className={classes.action_btn}>
                <Button component={Link} to="/signup" variant="contained" color="primary" style={{ marginRight: "10px" }}>Sign Up</Button>
                <Button component={Link} to="/login" variant="contained" color="primary">Login</Button>
            </div> : <div className={classes.action_btn}>
                    <Typography variant="h5" style={{ marginRight: "10px" }}>{user ?.user ?.name}</Typography>
                    <Button onClick={logout} variant="contained" color="secondary">Logout</Button>
                </div>}



        </Paper>
    )
}

export default Header
