import React, { useState } from "react";
import { TextField, Paper, Button, Grid, useScrollTrigger } from "@material-ui/core";

function AddSpace(props) { 
    const [item, setItem] = useState( {title:""} );

const onInputChange = (e)=>{ 
    const thisItem = item; 
    thisItem.title = e.target.value; 
    setItem(thisItem); 
}
const onButtonClick = ()=>{ 
    props.add(item);
    setItem( {title:""} ); // text 값을 추가하고 입력 필드는 초기화시킨다. 
}
const enterKeyEventHandler = (e)=>{ 
    if(e.key == 'Enter') 
        onButtonClick(); 
} 

    return (
        <Paper style={{margine:16, padding:16}}>
            <Grid container>
                <Grid xs={11} md={11} item style={{paddingRight:16}}>
                    <TextField  placeholder="Add Todo here"
                                fullWidth
                                onChange={onInputChange}
                                value={item.title}
                                onKeyDown={enterKeyEventHandler}/>
                </Grid>
                <Grid xs={1} md={1} item>
                    <Button fullWidth
                    color="secondary" variant="outlined"
                    onClick={this.onButtonClick}
                    > + </Button>
                </Grid>
            </Grid>
        </Paper>
    ); 
}
export default AddSpace;
