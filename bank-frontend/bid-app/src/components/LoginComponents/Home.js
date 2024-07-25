import React, {useState, useEffect} from 'react';
import axios from "axios";

const Home = () => {
    const [testData, setTestData] = useState({
        note: '',
    });

    useEffect(() => {
        const requestHomeDetails = () => {
            axios.get(`https://exchange-btc.in:8080/api/test/hello`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            }).then(response => {
                setTestData({note: response.data});
            }).catch(error => alert('Login or sign-up to view home page'));
        };

        requestHomeDetails();
    }, []);

    return (
        <div className="container">
            <h1>{testData.note}</h1>
        </div>
    );
};

export default Home;