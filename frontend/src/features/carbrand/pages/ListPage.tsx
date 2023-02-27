import { Box, Button, LinearProgress, Pagination, Theme, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { carBrandActions, selectCarBrandFilter, selectCarBrandList, selectCarBrandPagination } from "../carBrandSlice";
import CarBrandTable from "../components/CarBrandTableComponent";
import { makeStyles } from 'tss-react/mui';
import AddEditPage from "./AddEditPage";
import CarBrandForm from "../components/CarBrandForm";
import { carBrand } from "../../../models";
import carBrandApi from "../../../api/carBrandApi";
import RemovePopup from "./CarBrandRemovePopUp";
import CarBrandFilter from "../components/\bCarBrandFilter";
import { ListParams } from "../../../models/common";
// import carbrand from "..";
// const useStyles = makeStyles((theme: Theme) => ({
//   root: {
//     position: "relative",
//     paddingTop: theme.spacing(1),
//   },

//   titleContainer: {
//     display: "flex",
//     flexFlow: "row nowrap",
//     justifyContent: "space-between",
//     alignItems: "center",

//     marginBottom: theme.spacing(4),
//   },

//   loading: {
//     position: "absolute",
//     top: theme.spacing(-1),
//     width: "100%",
//   },
// }));

const useStyles = makeStyles()((theme) => ({
  AddBtn: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
  
  },
  Pagination:{
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "50px"
  }
}));
const ListPage = () => {
  const { classes, cx } = useStyles();
  const dispatch = useAppDispatch();
  const carBrandList = useAppSelector(selectCarBrandList);
  const pagination = useAppSelector(selectCarBrandPagination);
  const filter = useAppSelector(selectCarBrandFilter);
  const [carbrand, setCarbrand] = useState<carBrand>();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    // setCarbrand({
    //   id: -1,
    //   brand_name:"",
    //   descriptions: "",
    //   logo: "",
    // })
    setCarbrand(null!);
  };
  const handleClickOpenEdit = (carBrand:carBrand) => {
    setCarbrand(carBrand);
    setOpen(true);
  };

  const initialValue:carBrand = {
    id: undefined,
    brand_name:"",
    descriptions: "",
    logo: "",
    ...carbrand,
  } as carBrand;

  const handleFormSubmit = ()=>{
    // call API to submit/edit carbrand
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    
    dispatch(carBrandActions.fetchCarBrandList(filter));
  },[dispatch, filter]);
  const handlePageChange = (e:any, page:number)=>{
    dispatch(carBrandActions.setFilter({
        ...filter, 
        page
        }));
    };
  
  const handleSearchChange = (filter:ListParams)=>{
      console.log("search change");
      dispatch(carBrandActions.setFilterWithDebouce(filter));
  }
  // const classes  = useStyles();
  return (
    <Box>
      <Box className={classes.AddBtn}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>Add Car Brand</Button>
        <AddEditPage open={open} onClose={handleClose} carbrand={carbrand} ></AddEditPage>
      </Box>
      <Box><CarBrandFilter onSearchChange={handleSearchChange}/></Box>
      <CarBrandTable carBrandList={carBrandList} onEdit={handleClickOpenEdit}></CarBrandTable>
      <Box className={classes.Pagination}>
        <Pagination count={Math.ceil(pagination.total/pagination.limit)} page={pagination?.page} onChange={handlePageChange}/>
        {/* <CarBrandForm initialValue={initialValue} onSubmit={handleFormSubmit}></CarBrandForm> */}
      
      </Box>
      
      {/* <Pagination count={10} page={} onChange={} /> */}
    </Box>
    
    
  );
};

export default ListPage;
