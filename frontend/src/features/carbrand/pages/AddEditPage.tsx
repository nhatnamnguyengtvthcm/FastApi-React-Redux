import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Form, useParams } from "react-router-dom";
import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import CarBrandForm from "../components/CarBrandForm";
import { carBrand } from "../../../models";
import { toast } from 'react-toastify';
import carBrandApi from "../../../api/carBrandApi";
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { carBrandLogoActions, selectLogoFile } from "./carBrand\bLogoSlice";
import { useAppSelector } from "../../../app/hooks";
import { carBrandActions, selectCarBrandFilter } from "../carBrandSlice";

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
  onClose: () => void;
  carbrand?: carBrand;
}
export default function AddEditPage({ open, onClose,carbrand}: Props) {
  // const [close, setClose] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setClose(true);
  // const [carbrand, setCarbrand] = React.useState<carBrand>();
  // const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(carbrand);
  const navigate = useNavigate();
  const [carbrandId, setCarBrandId] = useState(-1);
  const dispatch = useDispatch();
  const file = useAppSelector(selectLogoFile);
  const filter = useAppSelector(selectCarBrandFilter);
  const handleSetCarBrandId = (carbrandId:number)=>{
    setCarBrandId(carbrandId);
  }
  const handleClose = () => {
    onClose();
  };
      // IFFE
  // (async () => {
  //       try {
  //         const data: carbrand = await carBrandApi.getById(carBrandId);
  //         setCarbrand(data);
  //       } catch (error) {
  //         console.log('Failed to fetch student details', error);
  //       }
  //     })();
  //   }, [id]);
  
  const handleStudentFormSubmit = async (formValues: carBrand) => {
    // TODO: Handle submit here, call API  to add/update student
    if (isEdit) {
      await carBrandApi.updateCarbrand(formValues)
      .then((res)=>{
        console.log(res.id);
        if(file) dispatch(carBrandLogoActions.upLoadLogo({brandcarId:res.id, file:file}))
      }).then(()=>{
        dispatch(carBrandActions.fetchCarBrandList(filter));
      });
    } else {
      // await carBrandApi.add(formValues);
      await carBrandApi.createCarBrand(formValues)
      .then((res)=>{
        if(file) dispatch(carBrandLogoActions.upLoadLogo({brandcarId:res.id, file}))
      }).then(()=>{
        dispatch(carBrandActions.fetchCarBrandList(filter));
      });

    }
    // navigate("/admin/carbrands");
    // Redirect back to student list
    // history.push('/admin/carbrands');
  };
  const initialValue:carBrand = {
    id: -1,
    brand_name:"",
    descriptions: "",
    logo: "",
    ...carbrand,
  } as carBrand;
  

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CarBrandForm initialValue={initialValue} onSubmit={handleStudentFormSubmit} handleFormClose={handleClose} carbrandId={carbrandId}></CarBrandForm>
        </Box>
      </Modal>
    </div>
  );
}
