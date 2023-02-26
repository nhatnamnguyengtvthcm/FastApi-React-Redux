import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import { Navigate, NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/styles';
import {Theme} from "@mui/material";
// import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme)=>({
    root: {
    
    },
    navbar: {
        color: 'inherit',
        textDecoration: 'none',
        '&.active > div':{
           
            // backgroundColor:'red',
        },
        

    },
    activeNav: {
        backgroundColor:"rgba(0,0,0,0.8) !important",
        border: "1px solid black"
    }
  }));
  
export default function SideBar() {
    const classes = useStyles();
    // const hanldeCarBrandNav = ()=>{
    //     <Navigate to="/carbrand" replace={true} />
    // }
    // const [activeClass, setActiveClass] = React.useState('');
    // const handleClick = ()=>{
    //     console.log("her");
    //     setActiveClass("activeNav");

    // }
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',textDecoration:'none' }}>
      <nav aria-label="main mailbox folders">
        <List>

            <NavLink to="/admin/carbrands" className={`${classes.navbar}`}>
                <ListItem disablePadding >
                    <ListItemButton>
                        <ListItemIcon>
                            <DirectionsCarIcon />
                        </ListItemIcon>
                        <ListItemText primary="CarBrand" />
                    </ListItemButton>
                </ListItem>
                
            </NavLink>
            {/* <NavLink to="/admin/carbrands/add" className={`${classes.navbar}`}>
                <ListItem disablePadding >
                    <ListItemButton>
                        <ListItemIcon>
                            <DirectionsCarIcon />
                        </ListItemIcon>
                        <ListItemText primary="CarBrand" />
                    </ListItemButton>
                </ListItem>
                
            </NavLink> */}
         
        </List>
      </nav>
      <Divider />

    </Box>
  );
}