import React from "react";
import "./index.css";
import App from "./App";
import Login from "./Login";
import SignUp from "./SignUp"
import UserEdit from "./UserEdit";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, Typography } from '@mui/material';


function Copyright() {
    return (
        <Typography variant="body2" color="testSecondary" align="center">
            {"Copyright ⓒ "} 
            WebKit640_Kim Seong Dong, {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

function AppRouter(props) {  
    return (
        <BrowserRouter>
            <div>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<App />} />
                <Route path="/useredit" element={<UserEdit />} />
            </Routes>
            </div>
            <div>
                <Box mt={5}>
                    <br/>
                    <Copyright />
                </Box>
            </div>
        </BrowserRouter>
    ); 
}
   export default AppRouter;
   