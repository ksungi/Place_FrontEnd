import { Box, Button, Modal, Paper, Table, TableBody, TableCell, 
        TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";


const style = {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400, bgcolor: 'background.paper',
    border: '2px solid #000', boxShadow: 24, p: 4,
};

function createData(spaceName, area, equip, limitPersonNum, price) {
    return { spaceName, area, equip, limitPersonNum, price };
}

//테스트용 임시 아이템
//   const items = [
//     createData('TB125', '100평', '강당 기본시설', 55, "10,000원/시간"),
//     createData('DB125', '100평', '강당 기본시설', 55, "10,000원/시간"),
//     createData('GB125', '100평', '강당 기본시설', 55, "10,000원/시간"),
//     createData('학생회관105', '100평', '강당 기본시설', 55, "10,000원/시간"),
//     createData('야외공연장', '100평', '강당 기본시설', 55, "10,000원/시간"),
//     createData('본관125', '100평', '강당 기본시설', 55, "10,000원/시간"),
//   ];

function Space(props) {

    const [item, setItem] = useState(props.item);
    const [readOnly, setReadonly] = useState(true);
    const [itemColor, setItemColor] = useState("");
    const [itemTextDeco, setItemTextDeco] = useState("");

    //modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    var modal =(
        <div>
        <Button onClick={handleOpen}>예약하기</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              장소안내
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              장소이름: {item.spaceName}
            </Typography>
          </Box>
        </Modal>
      </div>
      );
    // end of modal

    const deleteEventHandler = ()=>{
        props.delete(item); 
    }
    
    const offReadOnlyMode = ()=>{
        setReadonly(false);
        console.log("ReadOnly? ", readOnly);
    }

    const enterKeyEventHandler = (e)=>{
        if(e.key === "Enter"){
            setReadonly(true);
            console.log("ReadOnly? ", readOnly);
            props.update(item);
        }
    }

    const editEventHandler = (e)=>{
        const thisItem = {...item};
        thisItem.title = e.target.value;
        setItem(thisItem);
    }

    function checkboxEventHandler() {
        const thisItem = {...item}
        thisItem.done = thisItem.done ? false : true; // bool값 반전
        setItem(thisItem);
        setReadonly(true);

        props.update(thisItem);
        
        setItemColor(thisItem.done ? "#f4f4f4" : "");
        setItemTextDeco(thisItem.done ? "line-through" : ""); 
    }

    useEffect( ()=>{
        const thisItem = {...item}
        setItemColor(thisItem.done ? "#f4f4f4" : "");
        setItemTextDeco(thisItem.done ? "line-through" : ""); 
    },[setItemColor, setItemTextDeco]);


    return (
    <TableRow key={item.spaceName}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell component="th" scope="item"
                    align="center">{item.spaceName}</TableCell>
        <TableCell align="center">{item.area}</TableCell>
        <TableCell align="center">{item.limitPersonNum}</TableCell>
        <TableCell align="center">{item.equip}</TableCell>
        <TableCell align="center">{item.price}</TableCell>
        <TableCell align="center">{modal}</TableCell>
    </TableRow>
    );
}

export default Space;