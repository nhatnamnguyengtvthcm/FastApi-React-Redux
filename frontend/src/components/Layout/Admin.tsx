import React, { useEffect } from 'react'
import { Paper , Typography, Box, Button} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { width } from '@mui/system';
import { WidthFull } from '@mui/icons-material';
import Header from '../common/Header';
import { authActions } from '../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { BrowserRouter, Route, Router, Routes, useNavigate } from 'react-router-dom';
import SideBar from '../common/SideBar';
import CarBrandFeature from '../../features/carbrand';


type adminProps = {
  className?: string;
  
}

const useStyles = makeStyles()((theme) => ({
  root: {
    border:"1px solid red",
    display:"grid",
    gridTemplateRows: "auto 1fr",
    gridTemplateColumns: "3fr 13fr",
    gridTemplateAreas: `"header header"
                         "sidebar main"`,
    gap:"20px",
    // flexGrow:"row",
    minHeight: '100vh',
    // backgroundColor:"#ffcdd2"
    // '&:hover': {
    //   backgroundColor: theme.palette.primary.dark,
    // },
  
    
  },
  header:{  
    gridArea : "header",
    borderBottom:`1px solid ${theme.palette.divider}`,

  },
  sidebar:{
    borderRight:`1px solid ${theme.palette.divider}`,
    // width: "50px",
    // height: "50px",
    gridArea : "sidebar",
  },
  main:{
    border:"1px solid yellown",
    gridArea : "main",
    // width: "50px",
    // height: "50px",
  }
}));
const Admin = (props:adminProps) => {
  const { className } = props;
  const { classes, cx } = useStyles();
  const { isLoggedIn } = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  useEffect(()=>{
    if(!isLoggedIn){
      navigate("/");
    }
  },[isLoggedIn]
  )
  return (
    <Box className={cx(classes.root, className)}>
        <Box  className={cx(classes.header, className)}>
            <Header></Header>
        </Box>
        <Box  className={cx(classes.sidebar, className)}>
            <SideBar></SideBar>
        </Box >
        <Box  className={cx(classes.main, className)}>
            <Routes>
                <Route path="/carbrands/*" element={<CarBrandFeature/>}/>
            </Routes>
        </Box>
    </Box>
  )
}

export default Admin