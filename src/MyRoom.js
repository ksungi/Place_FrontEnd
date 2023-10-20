// import React, { useEffect, useState } from 'react';
// import './App.css';
// import Space from './Space';
// import AddSpace from './AddSpace';

// import { call, signout, userEditRoute } from './service/ApiService';
// //MUI
// import PropTypes from 'prop-types';
// import { CircularProgress, Paper, Box, Typography, Tab, Tabs, List, 
//         AppBar, Toolbar, Grid, Button, Container } from '@mui/material';

// function MyRoom(props) { 
//     const [items, setItems] = useState([]);
    
//     const add = (item)=>{
//         call("/space", "POST", item).then( (response)=>
//           setItems(response.data)
//           );
//       }
    
//       const deleteitem = (item)=>{
//         call("/space", "DELETE", item).then( (response)=>
//           setItems(response.data)
//           );
//       }
    
//       const update = (item)=>{
//         call("/space", "PUT", item).then( (response)=>
//           setItems(response.data)
//           );
//       }
//     //로그인 후 나오는 Home (Loading 아닐 때)
//     var spaceListPage = (
//       <div>
//         <Container maxWidth="md">
//           <AddSpace add = {add} />
//         </Container>
//       </div>

//     );
  

//   //생성된 컴포넌트 JPX를 리턴
//   return (
//     <div className="App">
//       {spaceListPage}  
//     </div>
//   );
//  }
//  export default MyRoom;
 