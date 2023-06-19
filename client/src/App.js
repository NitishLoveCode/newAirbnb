import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './component/pages/Header';
import Login from './component/pages/Login';
import Register from './component/pages/Register';
import { createContext, useState } from 'react';
import Account from './component/pages/Account';

const User_Data=createContext()
function App() {
  const[userinfo,setuserinfo]=useState()
  // console.log(userinfo)
  return (
    
    <BrowserRouter>
      <User_Data.Provider value={{userinfo,setuserinfo}}>
      <Header/>
      <Routes>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/register'} element={<Register/>}/>
        <Route path='/account' element={<Account/>}/>
      </Routes>
      </User_Data.Provider>
    </BrowserRouter>
  );
}

export default App;
export{User_Data}
