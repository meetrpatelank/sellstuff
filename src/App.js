import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Conformation } from './compnents/Conformation';
import { Register } from './compnents/Register';
import { Login } from './compnents/Login';
import { ProductListing } from './compnents/ProductListing';
import { AddNewProduct } from './compnents/AddNewProduct';
import { ProductDetails } from './compnents/ProductDetails';
import {GetAllRequests} from "./compnents/GetAllRequests";
import {Navbar} from "./compnents/Navbar";
function App() {
  return (
    <div className='app'>
        <Navbar />
    <Router>
      <Routes>
      <Route path='/' element={<Register/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/conformation' element={<Conformation />}></Route>
        <Route path='/login' element={<Login />}></Route>
       <Route path='/products' element = {<ProductListing />}></Route>
       <Route path = '/add-product' element = {<AddNewProduct />}></Route>
      <Route path = '/get-all-requests' element = {<GetAllRequests />}></Route>
          <Route path = '/products/:uuid' element = {<ProductDetails />}></Route>

      </Routes>
    </Router> 
    
    
    
   
    </div>
  );
}

export default App;
