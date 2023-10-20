import React, { useState } from "react";
import { Button, TextField, Container, Grid, Link, 
        Typography, Paper,  } from "@mui/material";

function AddSpace( {add} ) {

    const [item, setItem] = useState( {
        spaceName: "", limitPersonNum: "", area: "",
        area: "", address: "", equip: "", price: "",
        category: "",
    } );

    const onButtonClick = ()=>{
        add(item); //텍스트 삽입
        setItem({
            spaceName: "", limitPersonNum: "", area: "",
            address: "", equip: "", price: "", category: "",
        }); //입력 필드 초기화
    }

    const onInputChange = (e)=>{
        setItem({
            ...item,
            [e.target.id]: e.target.value,
        });
    }

    return (
        <Container component={Paper} maxWidth="xs" style={ {marginTop: "8%" } }>
        {/* <form noValidate onSubmit={handleSubmit}> */}
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h4" 
                    > 공간추가하기 </Typography>
                </Grid>

                <Grid item xs={12}>
                    <TextField 
                    name="spaceName" id="spaceName" label="공간 이름"
                    variant="outlined" onChange={onInputChange}
                    required fullWidth value={item.spaceName}
                    autoFocus/>
                </Grid>
                <Grid item xs={6}>
                    <TextField 
                        name="limitPersonNum" id="limitPersonNum" label="인원"
                        variant="outlined" onChange={onInputChange}
                        required fullWidth value={item.limitPersonNum}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField 
                        name="area" id="area" label="평수"
                        variant="outlined" onChange={onInputChange}
                        required fullWidth value={item.area}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        name="address" id="address" label="주소"
                        variant="outlined" onChange={onInputChange}
                        required fullWidth value={item.address}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        name="equip" id="equip" label="시설"
                        variant="outlined" onChange={onInputChange}
                        required fullWidth value={item.equip}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField 
                        name="price" id="price" label="가격"
                        variant="outlined" onChange={onInputChange}
                        required fullWidth value={item.price}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField 
                        name="category" id="category" label="카테고리"
                        variant="outlined" onChange={onInputChange}
                        required fullWidth value={item.category}/>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained" fullWidth
                        color="primary" onClick={onButtonClick}
                        > 공간생성 </Button>
                </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
                <Grid item >
                    <Link href="/" variant="body2">
                        돌아가기
                    </Link>
                </Grid>
            </Grid>
        {/* </form> */}
        </Container>
    );
}

export default AddSpace;