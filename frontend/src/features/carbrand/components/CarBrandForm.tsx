import { SpaceBarRounded } from "@mui/icons-material";
import { Button, CircularProgress, InputLabel, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Navigate, useNavigate } from "react-router-dom";
import FileField from "../../../components/FormFields/FileField";
import InputField from "../../../components/FormFields/InputField";
import { carBrand } from "../../../models";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import { carBrandLogoActions } from "../pages/carBrand\bLogoSlice";
import { carBrandActions, selectCarBrandFilter } from "../carBrandSlice";
import { useAppSelector } from "../../../app/hooks";
import { toast, ToastContainer } from "react-toastify";

export interface CarBrandFormProps {
  initialValue: carBrand;
  onSubmit: (formValue: carBrand) => void;
  handleFormClose: ()=>void;
  carbrandId: number;
}
const schema = yup.object().shape({
    brand_name: yup
    .string()
    .required('Please enter name.'),
    descriptions: yup
    .string()
    .required('Please enter name.')
})

const CarBrandForm = ({ initialValue, onSubmit, handleFormClose, carbrandId}: CarBrandFormProps) => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<carBrand>({
    defaultValues: initialValue,
    resolver:  yupResolver(schema),
  });
  const { logo } = initialValue;
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const filter = useAppSelector(selectCarBrandFilter);
  const notify = (mes:string) => toast(mes);
  const handleFormSubmit = async (formValues: carBrand) => {
    try {
      // Clear pcorevious submission error
      // setError('');
      console.log("process");
      await onSubmit(formValues)
      console.log("process1");
      await new Promise((resolve)=>{
          setTimeout(resolve,1000);
      })
      navigate("/admin/carbrands/");  

      dispatch(carBrandActions.fetchCarBrandList(filter));
      notify("Create/Update Done!");
      handleFormClose();
      // handleFormClose();
      // await new Promise((resolve)=>{
      //     setTimeout(resolve,3000);
      // })

      
    } catch (error) {
      console.log("Create/Update Fail!");
      notify("Create/Update Fail!");
      handleFormClose();
      dispatch(carBrandActions.fetchCarBrandList(filter));
      // handleFormClose();
      // window.location.reload();
    }
   
    
  };
  const handleFile = (file:File) =>{
    dispatch(carBrandLogoActions.putFile({file:file}));
  }
  return (
    <Box>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Form field*/}
        <InputField
          control={control}
          name="brand_name"
          label="Brand Name"
        ></InputField>
        <InputField
          control={control}
          name="descriptions"
          label="Descriptions"
        ></InputField>
        {/* <InputField control={control} name="logo" label="logo" type="image">
      
        </InputField> */}
        <Typography mt={2}>Logo</Typography>
        <FileField logo_url={`http://127.0.0.1:8000/${logo}`}  onSendFile={handleFile}></FileField>
        <Box mt={3} display="flex" justifyContent="space-around">
          <Button type="button" variant="contained" color="secondary" onClick={handleFormClose}>
            Close
          </Button>
        
          <Button type="submit" variant="contained" color="error" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            &nbsp;Submit
            {/* Submit */}
          </Button>
          
        </Box>
      </form>
      <ToastContainer autoClose={3000}/>
    </Box>
  );
};

export default CarBrandForm;
