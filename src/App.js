import React, { useEffect, useState } from 'react';
import './App.css';
import Space from './Space';

import { call, myroom_route, signout, userEditRoute, userInfoSet_route } from './service/ApiService';
//MUI
import PropTypes from 'prop-types';
import { CircularProgress, Paper, Box, Typography, Tab, Tabs, List, 
        AppBar, Toolbar, Grid, Button, Container } from '@mui/material';

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
//
function App() { 
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const add = (item)=>{
    call("/spcae", "POST", item).then( (response)=>
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
    <Paper style= {{margin:16}}>
      <List>
      {items.map( (item, idx) => (
            <Space item={item} key={item.id} delete={deleteitem} update={update}/> 
      ))}
      </List>
    </Paper>
  );
  

  const accessUsername = localStorage.getItem("ACCESS_USERNAME");
  //navigationBar
  var navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justify-content="space-between" alignItems="center" container>         
          <Grid item xs={8}>
            <Typography variant="h6"  align="left" > 오늘의 할 일 </Typography>
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
    var spaceListPage = (

      <div>
        {navigationBar}
        <Container maxWidth="md">
          {/* <AddSpace add = {add} />
          <div className='SpaceList'> {spaceItems} </div> */}
          <br/><br/>
          <Grid item xs={12}>
              <Typography component="h1" variant="h5"> 지금 필요한 공간은 어떤 곳인가요? </Typography>
          </Grid>

          <Box sx={{ flexGrow: 1, bgcolor: 'whitesmoke',
          // 'background.paper', 
                display: 'flex', height: 300 }}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1 , borderColor: 'divider', bgcolor: "#CADBFF"}}
            >
              <Tab label="강의실" {...a11yProps(0)} />
              <Tab label="실습실" {...a11yProps(1)} />
              <Tab label="실험실" {...a11yProps(2)} />
              <Tab label="강당" {...a11yProps(3)} />
              <Tab label="세미나 룸" {...a11yProps(4)} />
              <Tab label="회의실" {...a11yProps(5)} />
              <Tab label="카페테리아" {...a11yProps(6)} />
              <Tab label="체육시설" {...a11yProps(7)} />
            </Tabs>

            <TabPanel value={value} index={0}>
              Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
              Item Four
            </TabPanel>
            <TabPanel value={value} index={4}>
              Item Five
            </TabPanel>
            <TabPanel value={value} index={5}>
              Item Six
            </TabPanel>
            <TabPanel value={value} index={6}>
              Item Seven
            </TabPanel>
            <TabPanel value={value} index={7}>
              Item Eight
            </TabPanel>
            <TabPanel value={value} index={8}>
              Item Nine
            </TabPanel>
          </Box>

        </Container>
      </div>

    );

  //loading 중일 때
  var loadingPage = <CircularProgress />
  var content = loadingPage;
  // 아닐 때
  if(!loading) {
    content = spaceListPage;
  }

  //생성된 컴포넌트 JPX를 리턴
  return (
    <div className="App">
      {content}  
    </div>
  );
 }
 export default App;
 