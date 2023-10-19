import React, { useState } from "react";
import { signup } from "./service/ApiService";
//MUI
import { styled, CardContent, CardActions, Collapse, IconButton, Button, 
    TextField, Container, Grid, Link, Typography,  } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

function SignUp(props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    ///
    const handleSubmit = (event)=>{
        event.preventDefault();

        const data = new FormData(event.target);
        const userName = data.get("userName");
        const email = data.get("email");
        const password = data.get("password");
        const phone = data.get("phone");

        const companyName = data.get("companyName");
        const companyBossName = data.get("companyBossName");
        const companyAddress = data.get("companyAddress");


        signup( {email: email, userName: userName, password: password, phone: phone,
                    companyName: companyName, companyBossName: companyBossName, companyAddress: companyAddress} )
            .then( (response)=> {
                window.location.href = "/login";
            });
    }
    return (
        <Container component="main" maxWidth="xs" style={ {marginTop: "8%" } }>
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5"> 계정생성 </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField 
                        name="userName" id="userName" label="사용자 이름"
                        variant="outlined"
                        required fullWidth
                        autoFocus/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            name="email" id="email" label="이메일 주소"
                            variant="outlined"
                            required fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            name="password" id="password" label="패스워드"
                            variant="outlined"
                            required fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            name="phone" id="phone" label="전화번호"
                            variant="outlined"
                            required fullWidth/>
                    </Grid>
                    {/* 접기메뉴 버튼 */}
                    <Grid item xs={12} >
                        <CardActions>
                            <Typography> 사업자 추가 입력란</Typography>
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                                >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                    </Grid>
                    {/* 접기메뉴 시작 */}
                    <Collapse in={expanded} timeout="auto" unmountOnExit item xs={12}>
                        <CardContent >
                            <Grid item xs={12}>
                                <TextField  item xs={12}
                                    name="companyName" id="companyName" label="회사명"
                                    variant="outlined"
                                    required fullWidth
                                    autoFocus/>
                            </Grid><br/>
                            <Grid>
                                <TextField 
                                    name="companyBossName" id="companyBossName" label="대표자이름"
                                    variant="outlined"
                                    required fullWidth/>
                            </Grid><br/>
                            <Grid>
                                <TextField 
                                    name="companyAddress" id="companyAddress" label="회사주소"
                                    variant="outlined"
                                    required fullWidth/>
                            </Grid>
                        </CardContent>
                    </Collapse>
                    {/*  접기메뉴 끝 */}
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"> 계정생성 </Button>
                    </Grid>
                </Grid>
                <Grid container justifyContent="flex-end">
                    <Grid item >
                        <Link href="/login" variant="body2">
                            이미 계정이 있습니까? 로그인으로 이동
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default SignUp;