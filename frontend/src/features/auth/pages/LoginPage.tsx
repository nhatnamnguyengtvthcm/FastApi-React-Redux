
import React, { useState } from 'react'
import { Paper , Typography, Box, Button } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { authActions } from '../authSlice';
import { RootState } from '../../../app/store';
import { useNavigate } from 'react-router-dom';
type loginProps = {
  className?: string;
  
}

const LoginPage = (props: loginProps) => {
  const { className } = props;
  const [color, setColor]= useState<"red"|"blue">("blue");

  const { classes, cx } = useStyles();
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  if(isLoggedIn){
    navigate("/admin");

  }
  const handleLoginClick = () =>{
    dispatch(authActions.login({
      username: "",
      password: ""
    }))
  }

  return (
    <div className={cx(classes.root, className)}>
        <Paper elevation={3} className={cx(classes.box, className)}>
          <Typography variant="h5" component="h1"> UCar
            <Box mt={4}>
              <Button fullWidth variant="contained" onClick={handleLoginClick}> Fake Login</Button>
            </Box>
          </Typography>
        </Paper>
    </div>
  )
}
const useStyles = makeStyles()((theme) => ({
  root: {
    display:"flex",
    // flexGrow:"row",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor:"#ffcdd2"
    // '&:hover': {
    //   backgroundColor: theme.palette.primary.dark,
    // },
    
  },
  box:{
    padding: theme.spacing(6),
  }
}));

export default LoginPage