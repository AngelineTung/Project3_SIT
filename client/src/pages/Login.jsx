import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { Box, Typography, TextField, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';



function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const formik = useFormik({
        initialValues: {
            email: "",
            fullPassword: "",
        },
        validationSchema: yup.object({
            email: yup.string().trim().lowercase().email('Email must be a valid Email').max(100).required('Email is required'),
            fullPassword: yup.string().trim().min(8, 'Password must be atleast 8 characters').max(100, 'Password must be atmost 50 characters').required('Password is required').matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, "Password must contain at least 1 letter and 1 number"),

        }),
        onSubmit: (data) => {
            data.email = data.email.trim().toLowerCase();
            data.fullPassword = data.fullPassword.trim();
            http.post("/user/login", data)
                .then((res) => {
                    localStorage.setItem("accessToken", res.data.accessToken);
                    console.log(res.data);
                    setUser(res.data.user);
                    navigate("/profilePage");
                })
                .catch(function (err) {
                    toast.error(`${err.response.data.message}`);
                    console.log(err.response);
                });
        }
    });
    return (
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
        <h1 className="welcome-message">Welcome to DischargeEase</h1>
        <img src="Online-appointment-Software-1024x1024.jpg" alt="Logo" style={{ maxWidth: '400px', marginBottom: '10px' }} />
            <Box component="form" sx={{ maxWidth: '500px' }}
                onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth margin="dense" autoComplete="off"
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth margin="dense" autoComplete="off"
                    label="Password"
                    name="fullPassword" type="password"
                    value={formik.values.fullPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.fullPassword && Boolean(formik.errors.fullPassword)}
                    helperText={formik.touched.fullPassword && formik.errors.fullPassword}
                />
                <Button fullWidth variant="contained" sx={{ mt: 2 }}
                    type="submit">
                    Login
                </Button>
            </Box>
            <ToastContainer />
        </Box>
    );
  }
  


export default Login;