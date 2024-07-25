import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChangePassword = () => {
    const [passwordData, setPasswordData] = useState({
        phoneNumber: '',
        newPassword: '',
        otp: '',
    });

    useEffect(() => {
        document.body.style.backgroundColor = '#ffffcc';
        document.body.style.color = 'black';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.height = '100vh';
        
        return () => {
            document.body.style.backgroundColor = null; // Reset to original color on component unmount
            document.body.style.color = null;
        };
    }, []);

    const handleChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const requestOTP = () => {
        axios.get(`https://exchange-btc.in:8080/api/client/auth/requestOtp/${passwordData.phoneNumber}`)
            .then(response => {
                alert('OTP sent to your phone.');
            })
            .catch(error => alert('Error sending OTP.'));
    };

    const changePassword = (e) => {
        e.preventDefault();
        axios.post('https://exchange-btc.in:8080/api/client/auth/changePassword/', {
            phoneNumber: passwordData.phoneNumber,
            newPassword: passwordData.newPassword,
            otp: passwordData.otp
        })
            .then(response => {
                if (response.data.status === 'failed') {
                    alert(response.data.message);
                } else {
                    alert('Password changed successfully');
                    window.location.href = "/";
                }
            })
            .catch(error => alert('Password change failed'));
    };

    return (
        <div className="container" style={{ maxWidth: '1900px', height: '100%' }}>
            <h2>Change Password</h2>
            <form onSubmit={changePassword}>
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" value={passwordData.phoneNumber} onChange={handleChange}/>
                    <button type="button" className="btn btn-secondary" onClick={requestOTP}>Request OTP</button>
                </div>
                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <input type="password" className="form-control" id="newPassword" name="newPassword" value={passwordData.newPassword} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="otp" className="form-label">Enter OTP</label>
                    <input type="text" className="form-control" id="otp" name="otp" value={passwordData.otp} onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Change Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;
