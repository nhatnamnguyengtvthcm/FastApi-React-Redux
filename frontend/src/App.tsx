import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import carBrandApi from './api/carBrandApi';
import { carBrand } from './models';
import LoginPage from './features/auth/pages/LoginPage';
import { Routes , Route} from 'react-router-dom';
import Admin from './components/Layout/Admin';
import DashBoard from './components/Layout/DashBoard';
import CarBrandFeature from './features/carbrand';


function App() {
  // useEffect(()=>{
  //   carBrandApi.getAll().then((response) => console.log(response));
  // },[])
  return (
    <div className="App">
      <Routes>
        
        <Route path="/" element={<LoginPage />}/>
        <Route path="admin/*" element={<Admin/>}> 
          {/* <Route path="carbrands" element={<CarBrandFeature/>}/> */}
        </Route>

      </Routes>
      
    </div>
  );
}

export default App;
