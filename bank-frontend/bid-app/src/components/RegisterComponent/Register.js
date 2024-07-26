import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Register.module.css';

const Register = () => {
    const [user, setUser] = useState({
        name: '',
        password: '',
        phoneNumber: '',
    });

    useEffect(() => {
        document.body.classList.add(styles.bodyBackground);

        return () => {
            document.body.classList.remove(styles.bodyBackground);
        };
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const registerUser = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/client/auth/register/', {
            name: user.name,
            password: user.password,
            phoneNumber: user.phoneNumber,
        })
            .then(response => {
                if (response.data.status === 'failed') {
                    alert(response.data.message);
                } else {
                    alert('Registration Successful');
                    window.location = "/";
                }
            })
            .catch(error => alert('Registration Failed'));
    };

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h2>Create account</h2>
                <p>Welcome to join us</p>
                <form onSubmit={registerUser}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" value={user.name} onChange={handleChange} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="phoneNumber">Phone</label>
                        <input type="number" id="phoneNumber" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={user.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" className={styles.confirmBtn}>Confirm</button>
                    <p className={styles.loginLink}>Already have an account? <a href="/login">Log in</a></p>
                </form>
            </div>
        </div>
    );
};

export default Register;
