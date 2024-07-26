import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Login.module.css';

const Login = () => {
    const [credentials, setCredentials] = useState({
        phoneNumber: '',
        password: ''
    });
    const [username, setUsername] = useState('');

    useEffect(() => {
        document.body.classList.add(styles.bodyBackground);

        return () => {
            document.body.classList.remove(styles.bodyBackground);
        };
    }, []);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const loginUser = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/client/auth/login/', credentials)
            .then(response => {
                if (response.data.status === 'failed') {
                    alert(response.data.message);
                } else {
                    localStorage.setItem('isAuthenticated', 'true');
                    localStorage.setItem('authToken', response.data.jwt);
                    localStorage.setItem('roles', JSON.stringify(response.data.roles));
                    localStorage.setItem('mobile', JSON.stringify(response.data.mobilesNo));
                    localStorage.setItem('usersName', JSON.stringify(response.data.usersName));
                    setUsername(response.data.usersName); // Set username state
                    window.location.href = "/Rules";
                }
            })
            .catch(error => {
                alert('Login failed. Please try again.');
            });
    };

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h2>Login</h2>
                <form onSubmit={loginUser}>
                    <div className={styles.formGroup}>
                        <label htmlFor="phoneNumber">User Id</label>
                        <input 
                            type="text" 
                            id="phoneNumber" 
                            name="phoneNumber" 
                            value={credentials.phoneNumber} 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={credentials.password} 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <button type="submit" className={styles.confirmBtn}>Login</button>
                </form>
                <p className={styles.registerLink}><a href="/">Forgot Password?</a></p>
                {/* Display username and mobile */}
                {username && <p>Welcome, {username}. Your mobile number is {localStorage.getItem('mobile')}.</p>}
            </div>
        </div>
    );
};

export default Login;
