import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import * as userAction from "../redux/actions/UserAction"
import axios from "axios"
import { useDispatch } from "react-redux"

function Login() {
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const [user, setUser] = useState({ email: "", password: "" })
    const [isLoading, setIsLoading] = useState(false)
    async function LoginUser(e) {
        e.preventDefault()
        try {
            setIsLoading(true)
            const response = await userAction.loginUser(user)
            setIsLoading(false)
            localStorage.setItem("token", response.token)
            localStorage.setItem("user", JSON.stringify(response.user))
            axios.defaults.headers.common['Authorization'] = "Bearer " + response.token;
            dispatch({ type: "LOGIN", payload: response.user })
            alert(response.message)
            navigate("/")
        } catch (err) {
            setIsLoading(false)
            if (err ?.errors ?.email ?.message) {
                return alert(err ?.errors ?.email ?.message)

            }
            if (err ?.errors ?.password ?.message) {
                return alert(err ?.errors ?.password ?.message)

            }
            if (err.message) {
                return alert(err.message)
            }

        }

    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "30px" }}>
            <Paper align="center" style={{ padding: "30px", width: "300px" }}>
                <Typography variant="h4">Login</Typography>
                <Divider />
                <form autoComplete="off" onSubmit={LoginUser}>
                    <TextField
                        label="email"
                        name="email"
                        type="email"
                        fullWidth
                        value={user.email}
                        onChange={e => setUser({ ...user, email: e.target.value })}
                        required
                    />
                    <TextField
                        label="password"
                        name="password"
                        type="password"
                        fullWidth
                        value={user.password}
                        onChange={e => setUser({ ...user, password: e.target.value })}
                        required
                    />
                    <Button disabled={isLoading} type="submit" variant={isLoading ? "outlined" : "contained"} style={{ margin: "10px 0" }} color="primary" fullWidth>{isLoading ? <CircularProgress /> : "Login"}</Button>
                    <Typography variant="body1">Don't have an account ? <Link style={{ textDecoration: "none" }} to="/signup">Sign Up</Link></Typography>

                </form>


            </Paper>
        </div>
    )
}

export default Login
