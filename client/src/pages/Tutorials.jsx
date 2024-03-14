import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button } from '@mui/material';
import { AccessTime, Search, Clear, Edit } from '@mui/icons-material';
import http from '../http';
import dayjs from 'dayjs';
import global from '../global';
import '../App.css';

function Tutorials() {
  
    return (
        <Box>
            <div className="login-page">
                <div className="login-left">
                    <h1 className="welcome-message">Welcome to DischargeEase</h1>
                    <h3 className="welcome-message2">The system to coordinate and schedule the pre-discharge services for patients</h3>
                    <h5 className="welcome-message3">Please log in to access your account</h5>
                    <div className="login-form">
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                        <div className="button-container">
                            <button className="button">Login</button>
                            <button className="button">Reset Password</button>
                        </div>
                        
                    
                    </div>
                </div>
                <div className="login-right">
                    <img src="Online-appointment-Software-1024x1024.jpg" alt="Login" />
                </div>

                
            </div>
  

                  
           
        </Box>

        
    );  
}

export default Tutorials;