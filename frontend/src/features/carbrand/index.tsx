import { Box } from "@mui/material";
import React from "react";
import { matchRoutes, Route, Routes } from "react-router-dom";
import AddEditPage from "./pages/AddEditPage";
import ListPage from "./pages/ListPage";

const CarBrandFeature = () => {
  // const match = matchRoutes();
  return (
    // <div> CarBrandFeature</div>

    <Box>
      <Routes>
        <Route path="/" element={<ListPage/>} />
        {/* <Route path="add" element={<AddEditPage />} />
        <Route path="{id}" element={<AddEditPage />} /> */}
      </Routes>
    </Box>
  );
};

export default CarBrandFeature;
