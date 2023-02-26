import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Form, useParams } from "react-router-dom";
import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import CarBrandForm from "../components/CarBrandForm";
import { carBrand } from "../../../models";
import carBrandApi from "../../../api/carBrandApi";
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { carBrandLogoActions, selectLogoFile } from "./carBrand\bLogoSlice";
import { useAppSelector } from "../../../app/hooks";
import { selectCarBrandFilter } from "../carBrandSlice";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export interface Props {
  open: boolean;
  onRemove: (carbrandId:number) => void;
  carbrandId: number;
  onClose: () => void;
}
export default function RemovePopup({ open, onRemove, onClose, carbrandId}: Props) {
  // const [close, setClose] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setClose(true);
  // const [carbrand, setCarbrand] = React.useState<carBrand>();
  // const { id } = useParams<{ id: string }>();
  
  const handleClose = () => {
    onClose();
  };
  const notify = (mes:string) => toast(mes);
  const handleConfirm = async (carbrandId:number)=>{
        await onRemove(carbrandId);
       
  }
 

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography textAlign="center">Are you sure Remove Item?</Typography>
            <Box display="flex" justifyContent="space-around" m={2}>
            <Box>
            <Button type="submit" variant="contained" color="error" onClick={handleClose}>
                Cancel
            </Button>
            </Box>
            <Box>
            <Button type="submit" variant="contained" color="error" onClick={()=>handleConfirm(carbrandId)}>
                Confirm
            </Button>
            </Box>
            
           
            </Box>
          
        </Box>
       
      </Modal>
      <ToastContainer />
    </div>
  );
}
