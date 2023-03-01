import SearchIcon from '@mui/icons-material/Search';
import { FormControl, Grid, InputLabel, OutlinedInput } from '@mui/material';
import { Box } from '@mui/system';
import { ChangeEvent } from 'react';
import { ListParams } from '../../../models/common';
export interface Props {
    filter?: ListParams;
    onChange?: (newFilter:ListParams)=>void;
    onSearchChange?: (newFilter:ListParams)=> void;

}


const CarBrandFilter = ({filter, onSearchChange}: Props) => {

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>)=>{
        if(onSearchChange){
            const newFilter = {
                ...filter,
                brand_name: e.target.value
            }
            onSearchChange(newFilter);
        }
       

    }
  return (
    <Box mb={4} >
        <Grid container spacing={3} xs={16}>
            <Grid item xs={16} md={6}>
                <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel htmlFor="search by name" >Search By Brand Name</InputLabel>
                    <OutlinedInput
                        label="search by name"
                        id="search"
                        endAdornment={<SearchIcon></SearchIcon>}
                        onChange={handleSearchChange}
                    />
            
                </FormControl>
            </Grid>
        </Grid>
    </Box>
  )
}

export default CarBrandFilter;