import React, { useEffect, useState } from 'react';
import './App.css';
import Space from './Space';
import AddSpace from './AddSpace';

import { call, signout, userEditRoute } from './service/ApiService';
//MUI
import PropTypes from 'prop-types';
import { CircularProgress, Paper, Box, Typography, Tab, Tabs, List, 
        AppBar, Toolbar, Grid, Button, Container, TableCell, TableContainer, Table, TableHead, TableRow, TableBody } from '@mui/material';

function TabPanel(props) {
  
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function App() { 
  const [value, setValue] = React.useState(0);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const add = (item)=>{
    call("/space", "POST", item).then( (response)=>
      setItems(response.data)
      );
  }

  const deleteitem = (item)=>{
    call("/space", "DELETE", item).then( (response)=>
      setItems(response.data)
      );
  }

  const update = (item)=>{
    call("/space", "PUT", item).then( (response)=>
      setItems(response.data)
      );
  }

  //페이지(DOM) 마운트가 일어나고 렌더링 되기 전에 실행됨
  useEffect( ()=>{
    call("/space", "GET", null).then( (response)=>{
      setItems(response.data);
      setLoading(false);
    });
  }, []);


  //조건문 (참이라면 && 이후 실행)
  var spaceItems = items.length > 0 &&(
      <TableBody>
        {items.map( (item, idx) => (
          <Space item={item} key={item.id} delete={deleteitem} update={update}/> 
        ))}
      </TableBody>
  );
  

  const accessUsername = localStorage.getItem("ACCESS_USERNAME");
  //navigationBar
  var navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justify-content="space-between" alignItems="center" container>         
          <Grid item xs={8}>
            <Typography variant="h6"  align="left"> 오늘의 공간 </Typography>
          </Grid>

          <Grid item xs={2} alignContent="center" >
            <Typography align="right" >  {accessUsername} 님 </Typography>
          </Grid>

          <Grid item xs={2}>
            <Button color="inherit" onClick={userEditRoute}> 마이룸 </Button>
            <Button color="inherit" onClick={signout}> 로그아웃 </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
  
    //로그인 후 나오는 Home (Loading 아닐 때)
    var spaceListPage = (<div>
        
        {/* Main UI */}
        {navigationBar}
        
        <Container maxWidth="md">
          <AddSpace add = {add} />
        </Container>    
        
        <br/><br/><br/>

        <Container maxWidth="md">   
          {/* 공간 보여주는 부분 */}
          <Grid item xs={12}>
              <Typography component="h1" variant="h5"> 지금 필요한 공간은 어떤 곳인가요? </Typography>
          </Grid><br/>
          <TableContainer component={Paper} 
                          sx={{ width: '100%', overflow: 'scroll', maxHeight: 350}} >
            <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow >
                  <TableCell align="center"> 공간이름 </TableCell>
                  <TableCell align="center"> 평수 </TableCell>
                  <TableCell align="center"> 인원 </TableCell>
                  <TableCell align="center"> 구비된 시설 </TableCell>
                  <TableCell align="center"> 가격 </TableCell>
                  <TableCell align="center"> 예약 </TableCell>
                </TableRow>
              </TableHead>
                {spaceItems}
            </Table>
          </TableContainer>
        </Container>
      
      </div>);


  // 로딩 확인
  var loadingPage = <CircularProgress />
  var content = loadingPage;
  if(!loading) 
    content = spaceListPage;
  else
    content = loadingPage;

  return (
    <div className="App">
      {content}  
    </div>
  );
 }

 export default App;
 