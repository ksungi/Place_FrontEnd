import React from "react";

import { signout, userDelete, userEdit } from "./service/ApiService";
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
    const [deleteBtn, setDeleteBtn] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleDeleteBtn = () => {
        setDeleteBtn(!deleteBtn);
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
        
        if(deleteBtn) {//탈퇴버튼을 눌렀을 떄
            if(window.confirm("회원정보가 삭제됩니다. 계속 하시겠습니까?")) {
                userDelete( {email: email, userName: userName, password: password} )
                .then(handleDeleteBtn()).then(signout());
                alert("삭제되었습니다.");
            }else{ 
                alert("취소되었습니다.");
                handleDeleteBtn();
            }
        }
        else{//수정 버튼을 눌렀을 떄
            userEdit( {email: email, userName: userName, password: password, phone: phone,
                companyName: companyName, companyBossName: companyBossName, companyAddress: companyAddress} )
            .then(signout());
        }
        

    };

    return (
        <Container component="main" maxWidth="xs" style={ {marginTop: "8%" } }>
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5"
                        > 회원정보수정 </Typography>
                        <Typography fontSize="15px"
                        > 이메일 주소와 패스워드 확인이 필요합니다. </Typography>
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
                            name="email" id="email" label="기존 이메일 주소 입력"
                            variant="outlined"
                            required fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            name="password" id="password" label="기존 패스워드 입력"
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
                    <Grid item xs={6}>
                    <Button
                        onClick={handleDeleteBtn}
                        type="submit"
                        fullWidth
                        variant="contained" 
                        color="error"
                        > 회원탈퇴 </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            > 수정하기 </Button>
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