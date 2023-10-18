import React, { useEffect, useState } from 'react';
import './App.css';
//참조파일
import Space from './Space';
import AddSpace from './AddSpace';
//참조기능
import { call, signout, userInfoSet_route } from './service/ApiService';
import {Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography, Unstable_TrapFocus, styled} from "@material-ui/core";


function App() { 
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
            <Typography align="right" > [ {accessUsername} ] </Typography>
          </Grid>

          <Grid item xs={2}>
            <Button color="inherit" onClick={userInfoSet_route}> 회원정보수정 </Button>
            <Button color="inherit" onClick={signout}> 로그아웃 </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
  
    //loading 중이 아닐 때
    var spaceListPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md">
          <AddSpace add = {add} />
          <div className='SpaceList'> {spaceItems} </div>
        </Container>
      </div>
    );

  //loading 중일 때
  var loadingPage = <h1>로딩중...</h1>
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
 