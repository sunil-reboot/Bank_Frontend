import './App.css';
import Rules from './components/Rules';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DepositToWallet from './components/WalletDetails/BuyBtcCustomer';
import ViewProfile from './components/ProfileComponents/ViewProfile';
import BuyBtcApprovalReject from './components/Cashier/BuyBtcApprovalReject';
import BuyBtcCustomer from './components/WalletDetails/BuyBtcCustomer';
import WithdrawBtc from './components/WalletDetails/WithdrawBtc';
import ViewTransactions from './components/Customer/ViewTransactions';
import UploadBtcQrCode from './components/WalletDetails/UploadBtcQrCode';
import Profile from './components/PasswordComponents/Profile';
import ConfigureBtcRate from './components/Cashier/ConfigureBtcRate';
import Login from './components/LoginComponents/Login';
import Home from './components/LoginComponents/Home';
import ChangePassword from './components/PasswordComponents/ChangePassword';
import Register from './components/RegisterComponent/Register';
import CashierPayment from './components/Cashier/CashierPayment';
import DisplayAllUsers from './components/Cashier/DisplayAllUsers';
import NominatedUsers from './components/NominateUsers/NominatedUsers';
import NomineesSuggestions from './components/NominateUsers/NomineesSuggestions';
import NominateUser from './components/NominateUsers/NominateUser';



function App() {

  // useEffect(() => {
  //   const disableRightClickAndF12 = (event) => {
  //     if (event.type === 'contextmenu' || (event.type === 'keydown' && (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')))) {
  //       event.preventDefault();
  //     }
  //   };

  //   document.addEventListener('contextmenu', disableRightClickAndF12);
  //   document.addEventListener('keydown', disableRightClickAndF12);

  //   return () => {
  //     document.removeEventListener('contextmenu', disableRightClickAndF12);
  //     document.removeEventListener('keydown', disableRightClickAndF12);
  //   };
  // }, []);

  return (
    <>
    <BrowserRouter>   
      <Routes>
        <Route exact path = '/buy-btc' element = {<BuyBtcCustomer/>}></Route>
        <Route exact path = '/withdraw-btc' element = {<WithdrawBtc/>}></Route>
        <Route exact path = '/rules' element = {<Rules/>}></Route>
        <Route exact path = '/depositToWallet' element = {<DepositToWallet/>}></Route>
        <Route exact path = '/view-profile' element = {<ViewProfile/>}></Route>
        <Route exact path = '/buy-btc-approval-reject' element = {<BuyBtcApprovalReject/>}></Route>
        <Route exact path = '/view-transactions' element = {<ViewTransactions/>}></Route>
        <Route exact path = '/upload-btc-qr-code' element = {<UploadBtcQrCode/>}></Route>
        <Route exact path = '/profile' element = {<Profile/>}></Route>
        <Route exact path = '/configure-btc-rate' element = {<ConfigureBtcRate/>}></Route>
        <Route exact path = '/cashier-payment' element = {<CashierPayment/>}></Route>

        <Route exact path = '/nominate-user' element = {<NominateUser/>}></Route>
        <Route exact path = '/nominated-users' element = {<NominatedUsers/>}></Route>
        <Route exact path = '/nominees-suggestions' element = {<NomineesSuggestions/>}></Route>

        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/display-all-users" element={<DisplayAllUsers />} />
      </Routes> 
    </BrowserRouter>
    </>
  );
}

export default App;
