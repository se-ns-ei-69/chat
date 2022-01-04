import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Collapse, Container } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import useStyles from './formSteles';

const schema = yup.object().shape({
    // nickName: yup.string().required('Nick is required').matches(/^[a-zA-Z0-9]+$/, {message: 'No special characters'}).min(3),
    // password: yup.string().required('Password is required'),
})

export default function Form({ history }) {
    const [userData, setUserData] = useState({
        nickName: '',
        password: '',
    })
    const [error, setError] = useState([])

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const token = localStorage.getItem("Acces Token")
    if (token) {
        history.push('/chat')
    }

    const classes = useStyles();

    const onSubmitHandler = () => {
        loginOrRegister()
        setUserData({
            nickName: '',
            password: ''
        });
        reset();
    };

    const onChangeInput = (event) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    const loginOrRegister = async () => {
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        }
        try {
            const fetchResponse = await fetch("http://localhost:5000/users/login ", settings);
            const data = await fetchResponse.json()
            if (!fetchResponse.ok) {
                throw new Error(data)
            }
            if (data.token) {
                localStorage.setItem("Acces Token", data.token)
                history.push('/chat')
            }
            return data
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <Container maxWidth="sm" >
            <div className={classes.root}>
                <Paper component='form' onSubmit={handleSubmit(onSubmitHandler)}>
                    <TextField
                        error={errors.nickName ?
                            true
                            :
                            false}
                        {...register("nickName")}
                        id="login"
                        label="nickName"
                        name="nickName"
                        value={userData.nickName}
                        variant="outlined"
                        className={classes.textField}
                        onChange={onChangeInput}
                        helperText={errors.nickName?.message}
                    />
                    <TextField
                        error={errors.password ?
                            true
                            :
                            false}
                        {...register("password")}
                        id="password"
                        label="password"
                        name="password"
                        value={userData.password}
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        className={classes.textField}
                        onChange={onChangeInput}
                        helperText={errors.password?.message}
                    />
                    <Button variant="contained" className={classes.authButton} type="submit" >
                        Sign in / Sign Up
                    </Button>
                    <Collapse in={!!error.length}>
                        <Alert variant="filled" severity="error" className={classes.formAlert}>
                            {error}
                        </Alert>
                    </Collapse>
                </Paper>
            </div>
        </Container>
    );
}