import React from "react";
import { signin } from "./service/ApiService";
//MUI
import { IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl, 
    TextField, Button, Container, Grid, Link, Typography } from "@mui/material";
import { Visibility, VisibilityOff,  } from "@mui/icons-material";


function Login(props) { 

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleSubmit = (event)=>{
        event.preventDefault();
        
        const data = new FormData(event.target);
        const email = data.get("email");
        const password = data.get("password");

        //ApiService의 signin 메소드를 사용해 로그인
        signin( {email: email, password: password} );        
    }

    return (

        <Container component="main" maxWidth="xs" style={ {marginTop: "8%"} }>
            <Typography component="h1" variant="h5">
                로그인
            </Typography>
            <form noValidate onSubmit={handleSubmit} FormControlFullWidth >
                { /*submit버튼을 누르면 handleSubmit이 실행됨*/}
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">    
                    <TextField
                        id="email" name="email"
                        label="Email"
                        multiline
                        autoFocus
                        maxRows={4}
                    />
                </FormControl>
                <br/>
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        id="password" name="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                            </InputAdornment>
                        }
                    label="Password"/>
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                    <Button type="submit"    
                            fullWidth
                            variant="contained"
                            color="primary"> 로그인 
                    </Button>
                    <Link href="/signup" variant="body2" align="right">
                        <Grid item>
                            계정이 없습니까? 여기서 가입하세요. 
                        </Grid>
                    </Link>
                </FormControl>
            </form>
        </Container>
    );

}

export default Login;