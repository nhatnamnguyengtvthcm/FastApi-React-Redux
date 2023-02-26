import { TextField } from '@mui/material';
import React, { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    control: Control<any>;
    label?: string;
    
}

const InputField = ({name,control,label, ...inputProps}: InputFieldProps) => {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: {invalid, error}
    } = useController({
        name,
        control
    })
  return (
    <TextField 
    fullWidth
    label= {label} 
    margin="normal" 
    variant="outlined" 
    value={value}
    name={name}
    inputRef={ref}
    onBlur={onBlur}
    onChange={onChange}
    error={invalid}
    helperText={error?.message}
    inputProps={inputProps}
    />
 
  )
}

export default InputField