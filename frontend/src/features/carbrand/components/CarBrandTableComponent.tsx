import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { env } from 'process';
import { useAppSelector } from '../../../app/hooks';
import { carBrandActions, selectCarBrandFilter, selectCarBrandList } from '../carBrandSlice';
import { carBrand } from '../../../models';
import { Button } from '@mui/material';
import RemovePopup from '../pages/CarBrandRemovePopUp';
import carBrandApi from '../../../api/carBrandApi';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];
export interface Props{
    carBrandList: carBrand[],
    onEdit: (carBrand:carBrand)=> void,
    // onEdit: ()=> void,
    // onRemove: (carbrandId:number)=> void
    
}


export default function carBrandTable({carBrandList, onEdit}:Props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
//   const carBrandList = useAppSelector(selectCarBrandList);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [openRemove, setOpenRemove] = useState(false);
  const notify = (mes:string) => toast(mes);
 
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const filter = useAppSelector(selectCarBrandFilter);
  const handleEdit = (carBrand:carBrand)=>{
    onEdit(carBrand);
  }
  const handleOpenPopUp = ()=>{
    setOpenRemove(true);
  }
  const handleClosePopUp = ()=>{
    setOpenRemove(false);
  }
  const handleRemove = async (carbrandId:number)=>{
    try {
      await carBrandApi.removeCarbrand(carbrandId);
      notify("Remove Done!");
      handleClosePopUp();
      dispatch(carBrandActions.fetchCarBrandList(filter));
    } catch (error) {
      notify("Remove fail!");
  }
  }
  

  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">id</TableCell>
            <TableCell align="right">Brand Name</TableCell>
            <TableCell align="right">Descriptions</TableCell>
            <TableCell align="right">Logo</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {carBrandList.map((carBrand, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="right">
                {carBrand.id}
              </TableCell>
              <TableCell align="right">{carBrand.brand_name}</TableCell>
              <TableCell align="right">{carBrand.descriptions}</TableCell>
              <TableCell align="right">
                <img
                    src={`http://127.0.0.1:8000/${carBrand.logo}?w=100&h=100&fit=crop&auto=format`}
                    srcSet={`http://127.0.0.1:8000/${carBrand.logo}?w=100&h=100&fit=crop&auto=format&dpr=2 2x`}
                    alt={`${carBrand.descriptions}`}
                    loading="lazy"
                />
              </TableCell>
              <TableCell align="right">
                {/* <Button  size="small" color="primary" sx={{marginRight:"10px"}} onClick={()=>onEdit?.(carBrand)}>Edit</Button> */}
                <Button  size="small" color="primary" sx={{marginRight:"10px"}} onClick={()=>handleEdit(carBrand)}>Edit</Button>
                <Button  size="small" color="secondary" onClick={handleOpenPopUp} >Remove</Button>        
                <RemovePopup onRemove={handleRemove} open={openRemove} onClose={handleClosePopUp} carbrandId={carBrand.id}></RemovePopup>                  
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ToastContainer autoClose={3000}/>
    </TableContainer>
  );
}

function notify(arg0: string) {
  throw new Error('Function not implemented.');
}
