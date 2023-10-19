import React from "react";

import { signout, userEdit } from "./service/ApiService";
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

function UserEdit() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        //새로운 데이터 저장
        const data = new FormData(event.target);

        const userName = data.get("userName");
        const email = data.get("email");
        const password = data.get("password");
        const phone = data.get("phone");

        const companyName = data.get("companyName");
        const companyBossName = data.get("companyBossName");
        const companyAddress = data.get("companyAddress");

        userEdit( {email: email, userName: userName, password: password, phone: phone,
            companyName: companyName, companyBossName: companyBossName, companyAddress: companyAddress} )
            .then(signout()); //다시 로그인 하도록 유도
    };

    return (
        <Container component="main" maxWidth="xs" style={ {marginTop: "8%" } }>
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5"
                        > 회원정보수정 </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField 
                        name="userName" id="userName" label="변경할 사용자 이름"
                        variant="outlined"
                        required fullWidth
                        autoFocus/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            name="email" id="email" label="기존 이메일 주소"
                            variant="outlined"
                            required fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            name="password" id="password" label="기존 패스워드"
                            variant="outlined"
                            required fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            name="phone" id="phone" label="변경할 전화번호"
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
                                    name="companyName" id="companyName" label="변경할 회사명"
                                    variant="outlined"
                                    required fullWidth
                                    autoFocus/>
                            </Grid><br/>
                            <Grid>
                                <TextField 
                                    name="companyBossName" id="companyBossName" label="변경할 대표자이름"
                                    variant="outlined"
                                    required fullWidth/>
                            </Grid><br/>
                            <Grid>
                                <TextField 
                                    name="companyAddress" id="companyAddress" label="변경할 회사주소"
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
                            color="primary"> 수정하기 </Button>
                    </Grid>
                </Grid>
                <Grid container justifyContent="flex-end">
                    <Grid item >
                        <Link href="/myroom" variant="body2">
                            마이룸으로 돌아가기
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );

};

export default UserEdit;