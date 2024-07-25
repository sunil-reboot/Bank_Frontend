import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import './ViewTransactions.css'; // Import the CSS file

export default function ViewTransactions() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        // Fetch data from Spring Boot backend
        fetch('https://exchange-btc.in:8080/getBtcTransactionDetails', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                setData(data);
                setFilteredData(data); // Initially set filteredData to all data
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = data.filter(item => {
            const utrNumber = item.utrNumber ? String(item.utrNumber).toLowerCase() : '';
            const buyAmount = item.buyAmount ? String(item.buyAmount).toLowerCase() : '';
            const withdrawAmount = item.withdrawAmount ? String(item.withdrawAmount).toLowerCase() : '';
            const type = item.type ? String(item.type).toLowerCase() : '';
            return utrNumber.includes(query) || buyAmount.includes(query) || withdrawAmount.includes(query) || type.includes(query);
        });
        setFilteredData(filtered);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const yyyy = date.getFullYear();
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        const sec = String(date.getSeconds()).padStart(2, '0');
      
        return `${dd}-${mm}-${yyyy} ${hh}:${min}:${sec}`;
      };

    const getStatusMessage = (isApproved, isRejected) => {
        if (isApproved === true || isApproved === 1) {
            return { color: 'green', message: 'Success' };
        } else if (isRejected === true || isRejected === 1) {
            return { color: 'red', message: 'Rejected' };
        } else {
            return { color: 'orange', message: 'Approval Waiting' };
        }
    };

    return (
        <>
            <Navbar />
            <div className='container rules-container'>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search"
                />
                <table className='table table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th>Transaction Number</th>
                            <th>Date</th>
                            <th>Narration</th>
                            <th>Amount</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(item => {
                            const { color, message } = getStatusMessage(item.isApproved, item.isRejected);
                            const textStyle = {
                                color: color
                            };
                            return (
                                <tr key={item.id}>
                                    <td>{formatDate(item.buyDate)}</td>
                                    <td>{item.utrNumber}</td>
                                    <td>{item.buyAmount !== 0 ? item.buyAmount : item.withdrawAmount}</td>
                                    <td style={textStyle}>
                                        {message}
                                    </td>
                                    <td>{item.type}</td>
                                </tr>

                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
