import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import * as userServices from "../services/userServices"

function Signup() {
    let navigate = useNavigate();
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "", confirm: "" })
    const [isLoading, setIsLoading] = useState(false)
    async function signup(e) {
        e.preventDefault()
        try {
            setIsLoading(true)
            const response = await userServices.signupUser(newUser)
            setIsLoading(false)
            alert(response.message)
            navigate("/login")
        } catch (err) {
            setIsLoading(false)
            if (err ?.errors ?.name ?.message) {
                return alert(err ?.errors ?.name ?.message)

            }
            if (err ?.errors ?.email ?.message) {
                return alert(err ?.errors ?.email ?.message)
            }
            if (err ?.errors ?.password ?.message) {
                return alert(err ?.errors ?.password ?.message)

            }
            if (err ?.errors ?.confirm ?.message) {
                return alert(err ?.errors ?.confirm ?.message)

            }
            if (err.message) {
                return alert(err.message)
            }

        }

    }
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "30px" }}>
            <Paper align="center" style={{ padding: "30px", width: "300px" }}>
                <Typography variant="h4">Sign Up</Typography>
                <Divider />
                <form autoComplete="off" onSubmit={signup}>
                    <TextField
                        label="name"
                        name="name"
                        fullWidth
                        value={newUser.name}
                        onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                    />
                    <TextField
                        label="email"
                        name="email"
                        type="email"
                        fullWidth
                        value={newUser.email}
                        onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                    />
                    <TextField
                        label="password"
                        name="password"
                        type="password"
                        fullWidth
                        value={newUser.password}
                        onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                    />
                    <TextField
                        label="confirm"
                        name="confirm"
                        type="password"
                        fullWidth
                        value={newUser.confirm}
                        onChange={e => setNewUser({ ...newUser, confirm: e.target.value })}
                    />
                    <Button disabled={isLoading} type="submit" variant={isLoading ? "outlined" : "contained"} style={{ margin: "10px 0" }} color="primary" fullWidth>{isLoading ? <CircularProgress /> : "Sign Up"}</Button>
                    <Typography variant="body1">Already have an account ? <Link style={{ textDecoration: "none" }} to="/login">Login</Link></Typography>

                </form>


            </Paper>
        </div>
    )
}

export default Signup
